import { QUERY_KEYS } from '@/lib/QUERY_KEYS';
import { getTodayEpigrams } from '@/services/epigrams';
import { useQuery } from '@tanstack/react-query';

export const useTodayEpigram = () => {
  return useQuery({
    queryKey: QUERY_KEYS.todayEpigram,
    queryFn: getTodayEpigrams,
    staleTime: 1000 * 60,
  });
};
