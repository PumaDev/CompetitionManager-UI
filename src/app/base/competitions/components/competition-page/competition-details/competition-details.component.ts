import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompetition} from '../../../models/competitions.models';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {competitionsConfig} from '../../../service/competitions.config';
import {ActionState} from '../../../../../shared/general/general.models';
import { saveAs } from 'file-saver/src/FileSaver';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  @Input() set competition(competition: ICompetition) {
    this._competition = competition;
    if (competition !== null && competition !== undefined) {
      this.generateGridLink = competitionsConfig.generateGrid.replace('{competitionId}', this.competition.id.toString());
    }
  }

  @Input() userRole: UserRole;
  @Input() gridFile: Blob;
  @Input() generateGridState: ActionState;

  @Output() generateGridEvent: EventEmitter<number> = new EventEmitter<number>();

  public generateGridLink: string;
  private _competition: ICompetition;

  get competition(): ICompetition {
    return this._competition;
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  showGenerateGridButton(): boolean {
    return this.userRole === UserRole.ADMIN || this.userRole === UserRole.DEVELOPER;
  }

  isGridGenerationInProcess(): boolean {
    return this.generateGridState === ActionState.IN_PROGRESS;
  }

  isGrigGenerationComplete(): boolean {
    return this.generateGridState === ActionState.SUCCEEDED && this.gridFile !== undefined && this.gridFile !== null;
  }

  generateGrid(): void {
    this.generateGridEvent.emit(this.competition.id);
  }

  download(): any {
    const binaryData = [];
    binaryData.push(this.gridFile);
    return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(new Blob(binaryData, {type: 'application/pdf'})));
  }
}
