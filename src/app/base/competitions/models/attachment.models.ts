export interface Attachment {
  attachmentId: number;
  competitionId: number;
  fileName: string;
  name: string;
}

export interface CreateAttachment {
  name: string;
  competitionId: number;
  file: File;
}
