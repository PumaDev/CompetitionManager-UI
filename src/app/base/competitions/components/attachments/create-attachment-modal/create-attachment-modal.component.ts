import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreateAttachment} from '../../../models/attachment.models';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-attachment-modal',
  templateUrl: './create-attachment-modal.component.html',
  styleUrls: ['./create-attachment-modal.component.css']
})
export class CreateAttachmentModalComponent implements OnInit {

  @Output() createAttachment: EventEmitter<CreateAttachment> = new EventEmitter<CreateAttachment>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  createAttachmentFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.createAttachmentFormGroup = new FormGroup({
      name: new FormControl(null),
      file: new FormControl(null)
    });
  }

  close() {
    this.closeModal.emit();
  }

  getChoosedFile() {
    const choosedFile: File = this.createAttachmentFormGroup.value.file;

    return choosedFile ? choosedFile.name : '';
  }

  onSelectFile(file: File) {
    // const inputNode: any = document.querySelector('#file');
    //
    // if (typeof (FileReader) !== 'undefined') {
    //   const reader = new FileReader();
    //
    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target.result;
    //   };
    //
    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }
    console.log(file);
  }
}
