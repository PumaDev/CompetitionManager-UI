import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAttachment} from '../../../models/attachment.models';
import {ActionState} from '../../../../../shared/general/general.models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateAttachmentModalSmartComponent} from '../create-attachment-modal/create-attachment-modal.smart.component';

@Component({
  selector: 'app-attachments-section',
  templateUrl: './attachments-section.component.html',
  styleUrls: ['./attachments-section.component.css']
})
export class AttachmentsSectionComponent implements OnInit {

  @Input() competitionId: number;
  @Input() attachments: IAttachment[] = [];
  @Input() loadAttachmentsActionState: ActionState;

  @Output() deleteAttachment: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openCreateAttachmentModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {competitionId: this.competitionId};

    this.dialog.open(CreateAttachmentModalSmartComponent, dialogConfig);
  }
}
