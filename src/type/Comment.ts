export interface Writer {
  id: number;
  nickname: string;
  image: string;
}

export interface Comment {
  id: number;
  epigramId: number;
  writer: Writer;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  totalCount: number;
  nextCursor: number;
  list: Comment[];
}
