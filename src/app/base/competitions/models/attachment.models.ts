export interface IAttachment {
  id: number;
  competitionId: number;
  fileName: string;
  name: string;
}

export interface CreateAttachment {
  name: string;
  competitionId: number;
  file: File;
}
