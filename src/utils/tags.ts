export type TagLike = string | { id?: number | string; name?: string };

export const toTagNames = (input?: TagLike[] | null): string[] =>
  Array.isArray(input)
    ? input.map((t) => (typeof t === 'string' ? t : (t?.name ?? ''))).filter(Boolean)
    : [];
