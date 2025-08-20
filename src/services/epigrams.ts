import axiosInstance from '@/api/axiosInstance';
import { Epigram } from '@/type/feed';
import { EpigramListResponse } from '@/type/EpigramList';

export const getTodayEpigrams = async () => {
  const { data } = await axiosInstance.get<Epigram>('/epigrams/today');
  return data;
};

export const listEpigrams = async (params: { cursor?: number; limit: number }) => {
  const search = new URLSearchParams();
  search.set('limit', String(params.limit));
  if (params.cursor != null) search.set('cursor', String(params.cursor));
  const { data } = await axiosInstance.get<EpigramListResponse>(`/epigrams?${search.toString()}`);
  return data;
};
