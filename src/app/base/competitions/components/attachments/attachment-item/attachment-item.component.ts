import {Component, Input, OnInit} from '@angular/core';
import {IAttachment} from '../../../models/attachment.models';
import {competitionsConfig} from '../../../service/competitions.config';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.css']
})
export class AttachmentItemComponent implements OnInit {

  @Input() attachment: IAttachment;

  constructor() { }

  ngOnInit() {
  }

  buildAttachmentContentLink(): string {
    return competitionsConfig.getAttachmentContentEndpoint
      .replace('{competitionId}', this.attachment.competitionId.toString())
      .replace('{attachmentId}', this.attachment.id.toString());
  }
}
