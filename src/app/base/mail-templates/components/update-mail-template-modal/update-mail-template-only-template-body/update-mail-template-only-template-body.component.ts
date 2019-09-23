import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMailTemplate} from '../../../mail-templates.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-mail-template-only-template-body',
  templateUrl: './update-mail-template-only-template-body.component.html',
  styleUrls: ['./update-mail-template-only-template-body.component.css']
})
export class UpdateMailTemplateOnlyTemplateBodyComponent implements OnInit {

  @Input() mailTemplate: IMailTemplate;

  @Output() editTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();

  editTemplateFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.editTemplateFormGroup = new FormGroup({
      template: new FormControl(this.mailTemplate.template, Validators.required)
    });
  }


  getCurrentTemplate(): string {
    return this.editTemplateFormGroup.value.template;
  }

  onEdit(): void {
    this.editTemplate.emit(<IMailTemplate>{
      id: this.mailTemplate.id,
      template: this.getCurrentTemplate()
    });
  }
}
