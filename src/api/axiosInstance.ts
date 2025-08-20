import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Refresh 로직 (동시요청 보호: Promise 공유) ===
let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  const refreshToken = Cookies.get('refreshToken');

  // IIFE + try/finally 로 동시성 보호 + 정리
  refreshPromise = (async () => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        refreshToken,
      }); // 기본 axios 사용 (인터셉터 비적용)

      const newAccess = data?.accessToken as string | undefined;
      if (!newAccess) throw new Error('No accessToken in refresh response');

      Cookies.set('accessToken', newAccess, { sameSite: 'lax' });
      return newAccess;
    } finally {
      // 성공/실패 상관없이 공유 프라미스 해제
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ===== Response: 401 처리 & 재시도 =====
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // 액세스 토큰 만료로 판단되는 경우 (보통 401)
    const isExpired = error.response?.status === 401;

    if (isExpired && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccess = await refreshAccessToken();

        // 재시도 전에 헤더에 새 토큰 적용(요청 사본에 직접 주입)
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // 쿠키도 이미 갱신되어 있으니 이후 요청은 자동으로 새 토큰 사용
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        // 리프레시 실패 → 로그아웃 처리
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        if (typeof window !== 'undefined') {
          // 필요 시 알림/토스트 후 로그인으로 보내기
          window.location.href = '/login';
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
