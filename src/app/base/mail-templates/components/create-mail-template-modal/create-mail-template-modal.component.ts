import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMailTemplate, IMailTemplateReplacement} from '../../mail-templates.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-mail-template-modal',
  templateUrl: './create-mail-template-modal.component.html',
  styleUrls: ['./create-mail-template-modal.component.css']
})
export class CreateMailTemplateModalComponent implements OnInit {

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveMailTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();

  private _replacements: IMailTemplateReplacement[] = [];

  createMailTemplateFormGroup: FormGroup = new FormGroup({
    keyName: new FormControl(null, Validators.required),
    template: new FormControl(null, Validators.required)
  });

  constructor() {
  }

  ngOnInit() {
  }

  onChangeMailReplacements(newReplacements: IMailTemplateReplacement[]) {
    this._replacements = newReplacements;
  }

  getCurrentTemplate() {
    return this.createMailTemplateFormGroup.value.template;
  }

  onClose() {
    this.close.emit();
  }


  save() {
    this.saveMailTemplate.emit(<IMailTemplate> {
      keyName: this.createMailTemplateFormGroup.value.keyName,
      template: this.createMailTemplateFormGroup.value.template,
      mailTemplateReplacements: this._replacements
    });
    this.onClose();
  }
}
