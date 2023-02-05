import { Component , Input , OnChanges , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges {
    @Input() totalRecords = 0;
    @Input() recordsPerPage = 0;
    @Input() totalPages = 0;

    @Output() onPageChange: EventEmitter<number> = new EventEmitter();
    @Output() onPerPageChange: EventEmitter<number> = new EventEmitter();

    public pages: number [] = [];
    activePage: number = 1;
    perPage: number = 0;

    ngOnChanges(): any {
      const pageCount = this.totalPages;
      this.pages = this.getArrayOfPage(pageCount);
      this.activePage = 1;
      this.onPageChange.emit(1);
    }

    private getArrayOfPage(pageCount: number): number [] {
      const pageArray = [];

      if (pageCount > 0) {
          for(let i = 1 ; i <= pageCount ; i++) {
            pageArray.push(i);
          }
      }

      return pageArray;
    }

    onClickPage(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.pages.length) {
            this.activePage = pageNumber;
            this.onPageChange.emit(this.activePage);
        }
    }

    changePageSize(target: any): void {
            this.perPage = target.value;
            this.onPerPageChange.emit(this.perPage);
    }
}
