import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/QUERY_KEYS';
import { getMe } from '@/services/users';

export const useMe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: getMe,
    staleTime: 1000 * 60,
  });
};
