import axiosInstance from '@/api/axiosInstance';
import { EmotionLog } from '@/type/emotion';
import { EmotionCode } from '@/type/emotion';

export const getTodayEmotion = async (userId: number) => {
  const { data } = await axiosInstance.get<EmotionLog>('/emotionLogs/today', {
    params: { userId },
  });
  return data ?? null;
};

export const postTodayEmotion = async (emotion: EmotionCode) => {
  const { data } = await axiosInstance.post('/emotionLogs/today', { emotion });
  return data;
};
