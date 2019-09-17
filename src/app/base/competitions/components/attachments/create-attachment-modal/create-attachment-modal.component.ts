import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateAttachment} from '../../../models/attachment.models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-attachment-modal',
  templateUrl: './create-attachment-modal.component.html',
  styleUrls: ['./create-attachment-modal.component.css']
})
export class CreateAttachmentModalComponent implements OnInit {

  @Input() competitionId;

  @Output() createAttachment: EventEmitter<CreateAttachment> = new EventEmitter<CreateAttachment>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  createAttachmentFormGroup: FormGroup;

  file: File;

  constructor() {
  }

  ngOnInit() {
    this.createAttachmentFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  close() {
    this.closeModal.emit();
  }

  onFileChoose() {
    const fileUploadInput: HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;
    fileUploadInput.onchange = () => {
      if (fileUploadInput.files.length > 0) {
        this.file = fileUploadInput.files[0];
      }
    };

    fileUploadInput.click();
  }

  save() {
    const newAttachment: CreateAttachment = {
      name: this.createAttachmentFormGroup.value.name,
      competitionId: this.competitionId,
      file: this.file
    };
    this.createAttachment.emit(newAttachment);
    this.close();
  }

  shouldDisableSaveButton() {
    return this.file === null || this.file === undefined || !this.createAttachmentFormGroup.valid;
  }
}
