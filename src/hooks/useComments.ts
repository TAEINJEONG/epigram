import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS, PAGE_SIZE } from '@/lib/QUERY_KEYS';
import { listComments } from '@/services/comments';

export const useInfiniteComments = (limit = PAGE_SIZE) => {
  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.comments(limit),
    queryFn: ({ pageParam }) => listComments({ cursor: pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });

  const list = query.data?.pages.flatMap((p) => p.list) ?? [];
  const reachedEnd = query.data
    ? query.data.pages[query.data.pages.length - 1]?.nextCursor == null
    : false;

  return { ...query, list, reachedEnd };
};
