import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IMailTemplate, IMailTemplateReplacement} from '../../../mail-templates.model';
import {deepCloneMerge} from '../../../../../shared/utils/redux.utils';

@Component({
  selector: 'app-update-full-mail-template-body',
  templateUrl: './update-full-mail-template-body.component.html',
  styleUrls: ['./update-full-mail-template-body.component.css']
})
export class UpdateFullMailTemplateBodyComponent implements OnInit {

  @Input() mailTemplate: IMailTemplate;

  @Output() updateMailTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();

  editMailTemplateFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.editMailTemplateFormGroup = new FormGroup({
      replacements: new FormControl(this.buildViewOfReplacements(this.mailTemplate.mailTemplateReplacements)),
      template: new FormControl(this.mailTemplate.template, Validators.required)
    });
  }

  onEdit() {
    const mailTemplateWithUpdates: IMailTemplate = deepCloneMerge(this.mailTemplate, {
      mailTemplateReplacements: this.getCurrentReplacements(),
      template: this.getCurrentTemplate()
    });

    this.updateMailTemplate.emit(mailTemplateWithUpdates);
  }

  getCurrentTemplate(): string {
    return this.editMailTemplateFormGroup.value.template;
  }

  getCurrentReplacements(): IMailTemplateReplacement[] {
    return  this.buildReplacementsFromString(this.editMailTemplateFormGroup.value.replacements);
  }

  buildViewOfReplacements(replacements: IMailTemplateReplacement[]): string {
    return replacements.map((replacement) => `${replacement.key}->${replacement.fieldName}\n`).reduce((a, b) => a + b);
  }

  buildReplacementsFromString(textReplacements: string): IMailTemplateReplacement[] {
    return textReplacements
      .split('\n')
      .map((splitLine) => splitLine.split('->'))
      .filter((chunk) => chunk.length === 2)
      .map((chunk) => <IMailTemplateReplacement> {key: chunk[0], fieldName: chunk[1]});
  }
}
