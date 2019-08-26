export class PageLoadInfo {

  constructor(offset: number, size: number, pageNumber: number) {
    this.offset = offset;
    this.size = size;
    this.pageNumber = pageNumber;
  }

  offset: number;
  size: number;
  pageNumber: number;
}

