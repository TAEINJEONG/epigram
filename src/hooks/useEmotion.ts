import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodayEmotion, postTodayEmotion } from '@/services/emotionLogs';
import { EmotionCode } from '@/type/emotion';

const QUERY_KEY = ['emotion', 'today'] as const;

export function useTodayEmotion(userId?: number) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: [...QUERY_KEY, userId],
    queryFn: () => getTodayEmotion(userId!),
    enabled: typeof userId === 'number' && userId > 0,
    staleTime: 60_000,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (emotion: EmotionCode) => postTodayEmotion(emotion),
    // 낙관적 업데이트로 즉시 컴포넌트 숨김
    onMutate: async (emotion) => {
      await qc.cancelQueries({ queryKey: QUERY_KEY });
      const prev = qc.getQueryData(QUERY_KEY);
      qc.setQueryData(QUERY_KEY, {
        emotion,
        selectedAt: new Date().toISOString(),
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(QUERY_KEY, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    ...query,
    pickEmotion: mutation.mutate,
    isPicking: mutation.isPending,
    hasPicked: !!query.data,
  };
}
