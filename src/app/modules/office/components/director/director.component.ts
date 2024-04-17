import {Component, OnInit} from '@angular/core';
import {DirectorService} from "../../services/director.service";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {take} from "rxjs";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})
export class DirectorComponent implements OnInit {

  constructor(
    private directorService: DirectorService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {

    // Тестовое назначение задачи
    // const task: TaskInterface = {
    //   "id": "02d2f791-9518-4ff9-b536-14aabcfd8194",
    //   "title": "Vere vinco quod tot curriculum sub sonitus.",
    //   "date": "2025-03-18T15:29:45.382Z",
    //   "level": 7,
    //   "assigned": ""
    // }
    //
    // this.directorService.assignTask(task, 'Norman Ledner PhD')
    //   .pipe(take(1))
    //   .subscribe((res) => {
    //       console.log('Успех');
    //     },
    //     (error) => {
    //       this.dialogService.notify("Ошибка при назначение задач", NotificationTypes.error)
    //     })
  }

  assignAllTasks() {
    const dialogRef = this.dialogService.confirm(
      'Вы уверены, что хотите привязать все задачи?',
      'Да',
      'Отмена'
    );
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((apply) => {
        if (apply) {
          this.directorService.assignTasksToUsers()
            .then(() => {
              this.dialogService.notify('Задачи успешно назначены', NotificationTypes.success)
            })
            .catch(() => {
              this.dialogService.notify('Произошла ошибка при назначение задач', NotificationTypes.error)
            })
        }
      })



  }

}
