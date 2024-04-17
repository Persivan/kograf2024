import {Component, Injectable, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subject, take} from "rxjs";
import {PeriodicElementInterface} from "../../types/periodicElement.interface";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {MatPaginatorIntl} from "@angular/material/paginator";
import '@angular/localize/init';

@Injectable()
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, MatPaginatorIntl {
  elements!: PeriodicElementInterface[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];



  // Пагинация
  paginationConfig: any = {
    size: 0
  }
  changes = new Subject<void>();

  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.getTableData()
      .pipe(take(1))
      .subscribe((res) => this.elements = res,
        error => {
          console.log(error)
          this.dialogService.notify('Ошибка при получение данных для таблицы', NotificationTypes.error)
        });
    this.dataService.getDataLength()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
          this.paginationConfig.size = res
        },
        error => {
          console.log(error)
          this.dialogService.notify('Ошибка при получение данных для таблицы', NotificationTypes.error)
        })
  }


}
