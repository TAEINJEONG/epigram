export const PAGE_SIZE = 5;

export const QUERY_KEYS = {
  todayEpigram: ['epigrams', 'today'] as const,
  todayEmotion: ['emotion', 'today'] as const,
  me: ['users', 'me'] as const,

  epigrams: (limit = PAGE_SIZE) => ['epigrams', { limit }] as const,
  comments: (limit = PAGE_SIZE) => ['comments', { limit }] as const,
};
