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
  isLiked: boolean;
  tags: Tag[];
  referenceUrl: string;
  referenceTitle: string;
}
