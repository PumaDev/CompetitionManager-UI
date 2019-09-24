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

  changedMailReplacements: IMailTemplateReplacement[];

  constructor() {
  }

  ngOnInit() {
    this.editMailTemplateFormGroup = new FormGroup({
      template: new FormControl(this.mailTemplate.template, Validators.required)
    });
    this.changedMailReplacements = this.mailTemplate.mailTemplateReplacements;
  }

  onEdit() {
    const mailTemplateWithUpdates: IMailTemplate = deepCloneMerge(this.mailTemplate, {
      mailTemplateReplacements: this.changedMailReplacements,
      template: this.getCurrentTemplate()
    });

    this.updateMailTemplate.emit(mailTemplateWithUpdates);
  }

  getCurrentTemplate(): string {
    return this.editMailTemplateFormGroup.value.template;
  }

  updateMailReplacements(changedReplacements: IMailTemplateReplacement[]) {
    this.changedMailReplacements = changedReplacements;
    this.onEdit();
  }
}
