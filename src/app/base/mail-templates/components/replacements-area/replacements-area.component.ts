import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMailTemplateReplacement} from '../../mail-templates.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-replacements-area',
  templateUrl: './replacements-area.component.html',
  styleUrls: ['./replacements-area.component.css']
})
export class ReplacementsAreaComponent implements OnInit {

  @Input() set mailReplacements(inputMailReplacements: IMailTemplateReplacement[]) {
    this.mailTemplatesForm = new FormGroup({
      replacements: new FormControl(this.buildViewOfReplacements(inputMailReplacements))
    });
  }

  @Output() changedMailReplacements: EventEmitter<IMailTemplateReplacement[]> = new EventEmitter<IMailTemplateReplacement[]>();

  mailTemplatesForm: FormGroup = new FormGroup({
    replacements: new FormControl(null)
  });

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.changedMailReplacements.emit(this.getCurrentReplacements());
  }

  getCurrentReplacements(): IMailTemplateReplacement[] {
    return  this.buildReplacementsFromString(this.mailTemplatesForm.value.replacements);
  }

  buildViewOfReplacements(replacements: IMailTemplateReplacement[]): string {
    return replacements.map((replacement) => `${replacement.key}->${replacement.fieldName}\n`).reduce((a, b) => a + b);
  }

  buildReplacementsFromString(textReplacements: string): IMailTemplateReplacement[] {
    return textReplacements
      .split('\n')
      .map((splitLine) => splitLine.split('->'))
      .filter((chunk) => chunk.length === 2)
      .map((chunk) => <IMailTemplateReplacement> {key: chunk[0], fieldName: chunk[1]});
  }
}
