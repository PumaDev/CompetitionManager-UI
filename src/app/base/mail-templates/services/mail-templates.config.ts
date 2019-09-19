import {appConfig} from '../../../app.config';

export const mailTemplatesConfig = {
  endpoints: {
    getMailTemplatesEndpoint: appConfig.host + 'v1/mail-templates',
    createMailTemplateEndpoint: appConfig.host + 'v1/mail-templates',
    updateMailTemplateEndpoint: appConfig.host + 'v1/mail-templates/{mailTemplateId}',
    updateTemplateInMailTemplateEndpoint: appConfig.host + 'v1/mail-templates/{mailTemplateId}/template',
    deleteMailTemplateEndpoint: appConfig.host + 'v1/mail-templates/{mailTemplateId}'
  }
};
