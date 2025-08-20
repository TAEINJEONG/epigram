export type EmotionCode = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface EmotionLog {
  createdAt: string;
  emotion: EmotionCode;
  userId: number;
  id: number;
}
