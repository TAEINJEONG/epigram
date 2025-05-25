import axiosInstance from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

const loginApi = async (params: LoginParams) => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/signIn', params, {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 1) accessToken을 쿠키에 저장 (기본 옵션: path=/, expires 1일)
      Cookies.set('accessToken', data.accessToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // 2) 로그인 후 리다이렉트
      router.push('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // 에러 처리 (간단히 alert)
      alert(error.response?.data?.message || '로그인에 실패했습니다.');
    },
  });
}
