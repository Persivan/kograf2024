import {Component, Injectable, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subject, take} from "rxjs";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {MatPaginatorIntl} from "@angular/material/paginator";
import '@angular/localize/init';
import {TaskInterface} from "../../types/task.interface";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  outDatedTasks!: TaskInterface[];
  thisDayTasks!: TaskInterface[];
  thisWeekTasks!: TaskInterface[];
  nextWeekTasks!: TaskInterface[];

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.getTableData()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
          this.outDatedTasks = res.outDatedTasks;
          this.thisDayTasks = res.thisDayTasks;
          this.thisWeekTasks = res.thisWeekTasks;
          this.nextWeekTasks = res.nextWeekTasks;
        },
        error => {
          console.log(error)
          this.dialogService.notify('Ошибка при получение данных для таблицы', NotificationTypes.error)
        });
    this.dataService.getDataLength()
      .pipe(take(1))
      .subscribe((res) => {
          console.log(res);
        },
        error => {
          console.log(error)
          this.dialogService.notify('Ошибка при получение данных для таблицы', NotificationTypes.error)
        })
  }


}
