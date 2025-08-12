export interface Tag {
  id: number;
  name: string;
}

export interface EpigramListItem {
  likeCount: number;
  id: number;
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  tags: Tag[];
}

export interface EpigramListResponse {
  list: EpigramListItem[];
  nextCursor: number | null;
  totalCount: number;
}
