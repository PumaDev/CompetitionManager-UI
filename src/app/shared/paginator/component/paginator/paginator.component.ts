import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageState} from '../../model/page-state.model';
import {PageLoadInfo} from '../../model/page-load-info.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageState: PageState;

  @Output() onNextPage = new EventEmitter<PageLoadInfo>();
  @Output() onPreviousPage = new EventEmitter<PageLoadInfo>();

  constructor() {
  }

  ngOnInit() {
  }

  nextPage() {
    this.pageState.nextPage();
    this.onNextPage.emit(this.pageState.calculatePageLoadInfo());
  }

  previousPage() {
    this.pageState.previousPage();
    this.onPreviousPage.emit(this.pageState.calculatePageLoadInfo());
  }

  isNextPageDisabled(): boolean {
    return this.pageState.isLastPage();
  }

  isPreviousPageDisabled(): boolean {
    return this.pageState.isFirstPage();
  }
}
