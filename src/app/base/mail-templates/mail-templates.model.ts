export interface IMailTemplate {
  id: number;
  keyName: string;
  template: string;
  mailTemplateReplacements: IMailTemplateReplacement[];
}

export interface IMailTemplateReplacement {
  id: number;
  key: string;
  fieldName: string;
}
