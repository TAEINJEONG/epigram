import axiosInstance from '@/api/axiosInstance';
import { Me } from '@/type/me';

export const getMe = async () => {
  const { data } = await axiosInstance.get<Me>('/users/me');
  return data;
};
