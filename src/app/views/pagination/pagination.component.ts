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
      this.pages = this.getArrayOfPage(pageCount, this.activePage);
      this.activePage = 1;
      this.onPageChange.emit(1);
    }

    private getArrayOfPage(pageCount: number, pageNumber: number): number [] {
      const pageArray: number[] = [];

        for(let i = 1; i <= pageCount; i++) {
            pageArray.push(i);
        }

        if(pageArray.length >= 3) return pageArray.slice(0, 3);

        return pageArray;
    }

    onClickPage(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.activePage = pageNumber;
            console.log(pageNumber)
            this.pages = this.updatePageArray(pageNumber, this.totalPages);
            this.onPageChange.emit(this.activePage);
        }
    }

    private updatePageArray(pageNumber:number, totalPages: number): number[] {
        if(pageNumber !== 1 && pageNumber < totalPages) {
            return [pageNumber - 1, pageNumber, pageNumber + 1];
        }
        if (pageNumber === totalPages) {
            return [pageNumber -2, pageNumber - 1, pageNumber];
        }
        return this.getArrayOfPage(this.totalPages, pageNumber);
    }

    changePageSize(target: any): void {
            this.perPage = target.value;
            this.onPerPageChange.emit(this.perPage);
    }
}
