import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {DialogService} from "../../../../shared/services/dialog.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../../styles/authForm.scss'],
})
export class ResetPasswordComponent {
  resetPassForm!: FormGroup;
  private DialogAnimationsExampleDialog!: ComponentType<unknown>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    this.resetPassForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.resetPassForm.valid) {
      console.log('Form is invalid'); // @todo сделать уведомление
      return
    }

    const dialogRef = this.dialogService.confirm(
      'Вы уверены?',
      'Да',
      'Отмена'
    );
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((apply) => {
        if (apply) {
          this.authService.resetPassword(this.resetPassForm.value)
            .pipe(take(1))
            .subscribe(success => {
              if (success) {
                console.log('Password reset successful');
                // @todo Перенаправить или выполнить любое действие при успешной регистрации
              } else {
                console.log('Password reset failed');
                // @todo Показать сообщение об ошибке
              }
            });
        }
      })


  }
}
