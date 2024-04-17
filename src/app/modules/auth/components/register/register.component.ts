import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../styles/authForm.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      console.log('dsadsa') // @todo сделать виджет
      return
    }
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      console.log('Passwords don\'t match');
      return;
    }

    console.log('Form submitted:', this.registerForm.value);
    this.authService.register(this.registerForm.value)
      .pipe(take(1))
      .subscribe(success => {
        if (success) {
          console.log('Registration successful');
          // @todo Перенаправить или выполнить любое действие при успешной регистрации
        } else {
          console.log('Registration failed');
          // @todo Показать сообщение об ошибке
        }
      });
  }
}
