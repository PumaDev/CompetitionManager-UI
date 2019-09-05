import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompetitionCategory} from '../../../models/category.model';
import {PageLoadInfo, PageState} from '../../../../../shared/paginator/model';
import {UserRole} from '../../../../../shared/permissions/models/permission.models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCategoriesModalSmartComponent} from '../../new-competition/add-categories-modal/add-categories.modal.smart.component';

@Component({
  selector: 'app-competition-page-categories-list',
  templateUrl: './competition-page-categories-list.component.html',
  styleUrls: ['./competition-page-categories-list.component.css']
})
export class CompetitionPageCategoriesListComponent implements OnInit {

  @Input() set categories(categories: ICompetitionCategory[]) {
    this.pageState = new PageState(categories.length, 5, this.pageState ? this.pageState.currentPage : 1);
    this._allCategories = categories;
    if (categories.length > 0) {
      this._categories = categories.slice(this.pageState.firstDisplayElement - 1, this.pageState.lastDisplayElement);
    }
  }

  @Output() addCategories: EventEmitter<ICompetitionCategory[]> = new EventEmitter<ICompetitionCategory[]>();

  get categories() {
    return this._categories;
  }

  currentUserRole: UserRole;

  pageState: PageState;

  private _allCategories: ICompetitionCategory[] = [];
  private _categories: ICompetitionCategory[];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.currentUserRole = JSON.parse(localStorage.getItem('user')).userRole;
  }

  onPageNumberChange(pageLoadInfo: PageLoadInfo) {
    this._categories = this._allCategories.slice(pageLoadInfo.offset, pageLoadInfo.offset + pageLoadInfo.size);
  }

  canShowAddCategoriesButton(): boolean {
    return this.currentUserRole === UserRole.DEVELOPER || this.currentUserRole === UserRole.ADMIN;
  }

  openAddCategoriesModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {selectedCategories: this.categories};

    const dialogRef = this.dialog.open(AddCategoriesModalSmartComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: ICompetitionCategory[]) => {
      if (result) {
        this.addCategories.emit(result);
      }
    });
  }
}
