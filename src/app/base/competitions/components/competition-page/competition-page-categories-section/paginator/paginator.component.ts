import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageState: PageState;

  @Output() onNextPage = new EventEmitter<void>();
  @Output() onPreviousPage = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  nextPage() {
    this.onNextPage.emit();
  }

  previousPage() {
    this.onPreviousPage.emit();
  }

  isNextPageDisabled(): boolean {
    return this.pageState.isLastPage();
  }

  isPreviousPageDisabled(): boolean {
    return this.pageState.isFirstPage();
  }
}


export class PageState {
  readonly itemsCount: number;
  currentPage: number;
  readonly pageSize: number;

  firstDisplayElement: number;
  lastDisplayElement: number;
  pagesCount: number;

  constructor(itemsCount: number, pageSize: number, currentPage: number = 1) {
    this.itemsCount = itemsCount;
    this.pageSize = pageSize;
    this.currentPage = currentPage;

    this.calcDisplayElements();
  }

  nextPage(): PageState {
    if (!this.isLastPage()) {
      this.currentPage++;
      this.calcDisplayElements();
    }

    return this;
  }

  previousPage(): PageState {
    if (!this.isFirstPage()) {
      this.currentPage --;
      this.calcDisplayElements();
    }

    return this;
  }

  private calcDisplayElements(): void {
    this.firstDisplayElement = (this.currentPage - 1) * this.pageSize + 1;
    this.lastDisplayElement = this.currentPage * this.pageSize;
    this.lastDisplayElement = this.lastDisplayElement < this.itemsCount ? this.lastDisplayElement : this.itemsCount;

    this.pagesCount = Math.floor(this.itemsCount / this.pageSize);
    if ((this.itemsCount % this.pageSize) > 0) {
      this.pagesCount ++;
    }
  }

  isLastPage(): boolean {
    return this.currentPage === this.pagesCount;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }
}
