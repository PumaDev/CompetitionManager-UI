import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateAttachment, IAttachment} from '../models/attachment.models';
import {competitionsConfig} from './competitions.config';

@Injectable()
export class AttachmentsService {

  constructor(private http: HttpClient) {
  }

  getAttachmentsForCompetition(competitionId: number): Observable<IAttachment[]> {
    const getAttachmentsForCompetitionEndpoint: string = competitionsConfig.attachmentsForCompetitionEndpoint
      .replace('{competitionId}', competitionId.toString());

    return this.http.get<IAttachment[]>(getAttachmentsForCompetitionEndpoint);
  }

  createAttachment(createAttachmentView: CreateAttachment): Observable<IAttachment> {
    const createAttachmentEndpoint: string = competitionsConfig.createAttachmentEndpoint
      .replace('{competitionId}', createAttachmentView.competitionId.toString());

    const formData: FormData = new FormData();
    formData.append('file', createAttachmentView.file, createAttachmentView.file.name);
    formData.append('name', createAttachmentView.name);

    return this.http.post<IAttachment>(createAttachmentEndpoint, formData);
  }

  deleteAttachmentById(competitionId: number, attachmentId: number): Observable<string> {
    const deleteAttachmentByIdEndpoint: string = competitionsConfig.deleteAttachmentEndpoint
      .replace('{competitionId}', competitionId.toString())
      .replace('{attachmentId}', attachmentId.toString());

    return this.http.delete<string>(deleteAttachmentByIdEndpoint);
  }
}
