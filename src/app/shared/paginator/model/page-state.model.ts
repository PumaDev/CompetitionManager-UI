import {PageLoadInfo} from './page-load-info.model';

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
      this.currentPage--;
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
      this.pagesCount++;
    }
  }

  isLastPage(): boolean {
    return this.currentPage === this.pagesCount;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  calculatePageLoadInfo(): PageLoadInfo {
    const offset: number = this.firstDisplayElement - 1;

    return new PageLoadInfo(offset, this.pageSize);
  }
}

