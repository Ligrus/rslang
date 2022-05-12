import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { Router } from '@angular/router';

interface SuccessfulLoginData {
  message: string,
  name: string,
  refreshToken: string,
  token: string,
  userId: string
}
@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  logInForm: FormGroup;
  passwordVisible = false;
  password?: string;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private settingsService: SettingsService

  ) {

   }

  initForm() {
    this.logInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null,  [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$')],],
    })
  }

  onSubmit() {
    const values = this.logInForm.value;
    const controlKeys = Object.keys(values);

    if (this.logInForm.valid) {
      this.isLoading = true;
      this.authService
        .login<SuccessfulLoginData>(values)
        .pipe(
          tap((data) => {
            this.isLoading = false;
            this.message.success(
              'Успешная авторизация!',
              {
                nzDuration: 1500,
              }
            );
            this.logInForm.reset();
            this.authService.setTokensToStorage(data.token, data.refreshToken, data.userId)
            this.authService.setAuthState(true)
            this.settingsService.setUser(data.userId)
          }),
          delay(1500),
          tap(() => this.router.navigateByUrl('home')),
          catchError(err => {
            this.isLoading = false;
            if(err.status === 403) {
              this.message.error(
                'Неверное имя пользователя или пароль!',
                {
                  nzDuration: 1500,
                }
              );
            } else {
              this.message.error(
                'Что-то пошло не так, попробуйте позже!',
                {
                  nzDuration: 1500,
                }
              );
            }
            return of('error', err)
          })
        )
        .subscribe();
    } else {
      controlKeys.forEach(val => {
        const ctrl = this.logInForm.controls[val];
        if (!ctrl.valid) {
          ctrl.markAsTouched()
          ctrl.setErrors({...ctrl.errors});
        }
      });
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

}
