export type ISODateString = `${number}-${number}-${number}T${string}Z`;

export interface Me {
  id: number;
  nickname: string;
  teamId: string;
  image: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
