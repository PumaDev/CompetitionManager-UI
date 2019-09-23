import {Component, Input, OnInit} from '@angular/core';
import {IMailTemplate} from '../../mail-templates.model';
import {ActionState} from '../../../../shared/general/general.models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateAttachmentModalSmartComponent} from '../../../competitions/components/attachments/create-attachment-modal/create-attachment-modal.smart.component';
import {UserRole} from '../../../../shared/permissions/models/permission.models';
import {UpdateMailTemplateModalSmartComponent} from '../update-mail-template-modal/update-mail-template-modal.smart.component';

@Component({
  selector: 'app-mail-templates-page',
  templateUrl: './mail-templates-page.component.html',
  styleUrls: ['./mail-templates-page.component.css']
})
export class MailTemplatesPageComponent implements OnInit {

  @Input() mailTemplates: IMailTemplate[] = [];
  @Input() loadMailTemplatesActionState: ActionState = ActionState.INITIAL;
  @Input() canCreateAndDeleteMailTemplate: boolean;
  @Input() userRole: UserRole;

  constructor(private matDialog: MatDialog) { }

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

  openEditModal(mailTemplate: IMailTemplate): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {mailTemplate: mailTemplate, userRole: this.userRole};

    this.matDialog.open(UpdateMailTemplateModalSmartComponent, dialogConfig);
  }
}
