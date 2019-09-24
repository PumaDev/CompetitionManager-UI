import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMailTemplate} from '../../mail-templates.model';
import {ActionState} from '../../../../shared/general/general.models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserRole} from '../../../../shared/permissions/models/permission.models';
import {UpdateMailTemplateModalSmartComponent} from '../update-mail-template-modal/update-mail-template-modal.smart.component';
import {DeleteEntityDialog} from '../../../dialogs/delete-dialog/delete-dialog.component';
import {CreateMailTemplateModalSmartComponent} from '../create-mail-template-modal/create-mail-template-modal.smart.component';

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

  @Output() deleteMailTemplate: EventEmitter<IMailTemplate> = new EventEmitter<IMailTemplate>();

  constructor(private matDialog: MatDialog) {
  }

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

  openDeleteModal(mailTemplate: IMailTemplate): void {
    const deleteDialogConf = new MatDialogConfig();
    deleteDialogConf.autoFocus = true;
    deleteDialogConf.data = {
      entityType: 'Шаблона',
      entityName: mailTemplate.keyName
    };

    const deleteDialogRef = this.matDialog.open(DeleteEntityDialog, deleteDialogConf);

    deleteDialogRef.afterClosed().subscribe((userConfirmedDeleting: boolean) => {
      console.log('The delete dialog was closed: ' + userConfirmedDeleting);
      if (userConfirmedDeleting) {
        this.deleteMailTemplate.emit(mailTemplate);
      }
    });
  }

  openCreateModal(): void {
    const createDialogConf = new MatDialogConfig();
    createDialogConf.autoFocus = true;

    this.matDialog.open(CreateMailTemplateModalSmartComponent, createDialogConf);
  }
}
