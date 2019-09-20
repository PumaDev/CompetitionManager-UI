import {Component, Input, OnInit} from '@angular/core';
import {IMailTemplate} from '../../mail-templates.model';
import {ActionState} from '../../../../shared/general/general.models';

@Component({
  selector: 'app-mail-templates-page',
  templateUrl: './mail-templates-page.component.html',
  styleUrls: ['./mail-templates-page.component.css']
})
export class MailTemplatesPageComponent implements OnInit {

  @Input() mailTemplates: IMailTemplate[] = [];
  @Input() loadMailTemplatesActionState: ActionState = ActionState.INITIAL;

  constructor() { }

  ngOnInit() {
  }

  isLoadMailTemplatesInProgress(): boolean {
    return this.loadMailTemplatesActionState === ActionState.IN_PROGRESS;
  }

  isLoadMailTemplatesFailed(): boolean {
    return this.loadMailTemplatesActionState === ActionState.FAILED;
  }

  isLoadMailTemplatesSucceeded(): boolean {
    return this.loadMailTemplatesActionState === ActionState.SUCCEEDED;
  }

}
