import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../types/user.interface";
import {AuthService} from "../../../auth/services/auth.service";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {take} from "rxjs";
import {SkillInterface} from "../../types/skill.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser!: UserInterface;
  displayedColumns: string[] = ['position', 'name'];

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    this.currentUser.role = 'Разработчик'
    console.log(this.currentUser);
  }


  logout() {
    const dialogRef = this.dialogService.confirm(
      'Вы уверены, что хотите выйти?',
      'Да',
      'Отмена'
    );
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((apply) => {
        if (apply) {
          this.authService.logout();
        }
      })
  }

  like() {
    this.dialogService.notify('Мне тоже нравится собачка', NotificationTypes.success)
  }

  get dataSource(): SkillInterface[] {
    let temp = [];
    for (let weightsKey in this.currentUser.weights) {
      temp.push({
        level: weightsKey,
        hours: this.currentUser.weights[weightsKey]
      })
    }
    console.log(temp)
    return temp;
  }
}
