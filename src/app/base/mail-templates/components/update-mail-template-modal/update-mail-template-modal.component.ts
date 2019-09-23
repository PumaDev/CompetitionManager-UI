import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMailTemplate} from '../../mail-templates.model';
import {UserRole} from '../../../../shared/permissions/models/permission.models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-mail-template-modal',
  templateUrl: './update-mail-template-modal.component.html',
  styleUrls: ['./update-mail-template-modal.component.css']
})
export class UpdateMailTemplateModalComponent implements OnInit {

  @Input() mailTemplate: IMailTemplate;
  @Input() userRole: UserRole;

  @Output() updateMailTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();
  @Output() updateTemplateInMailTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  editTemplateFormGroup: FormGroup;

  changedMailTemplate: IMailTemplate;

  constructor() {
  }

  ngOnInit(): void {
    this.editTemplateFormGroup = new FormGroup({
      template: new FormControl(this.mailTemplate.template, Validators.required)
    });

    this.changedMailTemplate = this.mailTemplate;
  }

  closeModal(): void {
    this.close.emit();
  }

  canEditAllMailTemplate(): boolean {
    return this.userRole === UserRole.DEVELOPER;
  }

  onSave() {
    if (this.userRole === UserRole.ADMIN) {
      this.updateTemplateInMailTemplate.emit(this.changedMailTemplate);
    } else if (this.userRole === UserRole.DEVELOPER) {
      this.updateMailTemplate.emit(this.changedMailTemplate);
    }
  }

  onEditTemplate(mailTemplatesWithUpdates: IMailTemplate) {
    this.changedMailTemplate = mailTemplatesWithUpdates;
  }
}
