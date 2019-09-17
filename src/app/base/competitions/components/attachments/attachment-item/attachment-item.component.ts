import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAttachment} from '../../../models/attachment.models';
import {competitionsConfig} from '../../../service/competitions.config';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteEntityDialog} from '../../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.css']
})
export class AttachmentItemComponent implements OnInit {

  @Input() attachment: IAttachment;
  @Input() canDeleteAttachment: boolean;

  @Output() deleteAttachment: EventEmitter<number> = new EventEmitter<number>();

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  buildAttachmentContentLink(): string {
    return competitionsConfig.getAttachmentContentEndpoint
      .replace('{competitionId}', this.attachment.competitionId.toString())
      .replace('{attachmentId}', this.attachment.id.toString());
  }

  onDeleteAttachment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      entityType: 'Вложения',
      entityName: this.attachment.name
    };

    const dialogRef = this.matDialog.open(DeleteEntityDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((userConfirmedDeleting: boolean) => {
      console.log('The delete dialog was closed: ' + userConfirmedDeleting);
      if (userConfirmedDeleting) {
        this.deleteAttachment.emit(this.attachment.id);
      }
    });
  }
}
