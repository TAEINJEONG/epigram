import { QUERY_KEYS, PAGE_SIZE } from '@/lib/QUERY_KEYS';
import { listEpigrams } from '@/services/epigrams';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteEpigrams = (limit = PAGE_SIZE) => {
  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.epigrams(limit),

    // "pageParam"은 이번에 불러올 커서 값,
    // 첫 호출때는 query 블럭 제일 밑 "pageParam"이 "initialPageParam"값이고
    // 다음 호출 부턴 "getNextPageParam"이 돌려준 값이 적용됨
    queryFn: ({ pageParam }) => listEpigrams({ cursor: pageParam, limit }),

    // "getNextPageParam"은 다음 페이지의 커서를 뭐로 할지 정하는 규칙,
    // "(lastPage)"는 방금 받은 응답 list, nextCursor
    // 아래 식대로 lastPage객체에 nextCursor 값이 있으면 그걸 사용하고 없으면 "undefined"
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    // 첫 페이지 호출 시 쓸 커서 값.
    // 보통은 첫 요청에 cursor값이 없으니 undefined로
    initialPageParam: undefined as number | undefined,
  });

  /*
    useInfiniteQuery의 데이터의 형태는
    {
      pages: [ page1, page2, page3, ... ],
      pageParams: [ param1, param2, ... ]
    }

    이런식으로 넘어옴 query.data.pages에 형태는 
    [
      { list: [item1, item2, item3], nextCursor: 123 },
      { list: [item4, item5, item6], nextCursor: 456 },
      { list: [item7, item8], nextCursor: null }
    ]
    이런 식으로 되어 있기때문에 flatMap으로 item을 한 배열에 담음
  */
  const list = query.data?.pages.flatMap((p) => p.list) ?? [];

  // 데이터 제일 마지막의 nextCursor가 없으면 true 있으면 false로 끝에 도달했다는 것을 계산함
  const reachedEnd = query.data
    ? query.data.pages[query.data.pages.length - 1]?.nextCursor == null
    : false;

  return { ...query, list, reachedEnd };
};
