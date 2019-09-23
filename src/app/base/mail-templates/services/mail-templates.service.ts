import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMailTemplate} from '../mail-templates.model';
import {mailTemplatesConfig} from './mail-templates.config';

@Injectable()
export class MailTemplatesService {

  constructor(private http: HttpClient) {
  }

  getMailTemplates(): Observable<IMailTemplate[]> {
    return this.http.get<IMailTemplate[]>(mailTemplatesConfig.endpoints.getMailTemplatesEndpoint);
  }

  createMailTemplate(newMailTemplate: IMailTemplate): Observable<IMailTemplate> {
    return this.http.post<IMailTemplate>(mailTemplatesConfig.endpoints.createMailTemplateEndpoint, newMailTemplate);
  }

  updateMailTemplate(mailTemplateWithUpdates: IMailTemplate): Observable<IMailTemplate> {
    const updateMailTemplateEndpoint: string = mailTemplatesConfig.endpoints.updateMailTemplateEndpoint
      .replace('{mailTemplateId}', mailTemplateWithUpdates.id.toString());

    return this.http.put<IMailTemplate>(updateMailTemplateEndpoint, mailTemplateWithUpdates);
  }

  updateTemplateInMailTemplate(mailTemplateId: number, newTemplate: string): Observable<IMailTemplate> {
    const updateTemplateInMailTemplateEndpoint: string = mailTemplatesConfig.endpoints.updateTemplateInMailTemplateEndpoint
      .replace('{mailTemplateId}', mailTemplateId.toString());

    return this.http.put<IMailTemplate>(updateTemplateInMailTemplateEndpoint, {newTemplate: newTemplate});
  }

  deleteMailTemplate(mailTemplateId: number): Observable<IMailTemplate> {
    const deleteMailTemplateEndpoint: string = mailTemplatesConfig.endpoints.updateTemplateInMailTemplateEndpoint
      .replace('{mailTemplateId}', mailTemplateId.toString());

    return this.http.delete<IMailTemplate>(deleteMailTemplateEndpoint);
  }
}
