export interface FeedType {
  feedText: string;
  author: string;
  tag: string[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Epigram {
  id: number;
  content: string;
  author: string;
  writerId: number;
  likeCount: number;
  isLiked?: boolean;
  tags: Tag[];
  referenceUrl: string;
  referenceTitle: string;
}

export interface EpigramForm {
  tags?: string;
  referenceUrl?: string;
  referenceTitle?: string;
  authorMode: '직접 입력' | '알 수 없음' | '본인';
  author: string;
  content: string;
}

export type EpigramRequestApi = {
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags?: string[];
};
