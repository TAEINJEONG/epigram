import axiosInstance from '@/api/axiosInstance';
import { CommentResponse } from '@/type/Comment';

export const listComments = async (params: { cursor?: number; limit: number }) => {
  const search = new URLSearchParams();
  search.set('limit', String(params.limit));
  if (params.cursor != null) {
    search.set('cursor', String(params.cursor));
  }

  const { data } = await axiosInstance.get<CommentResponse>(`/comments?${search.toString()}`);
  return data;
};
