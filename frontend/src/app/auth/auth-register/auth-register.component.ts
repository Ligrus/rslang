import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, delay, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordVisible = false;
  password?: string;
  isLoading: boolean = false;

  @Output() backToLogin = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  initForm() {
    this.registerForm = this.fb.group({
      email: [null,  [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$')]],
    });
  }

  onSubmit() {
    const controlKeys = Object.keys(this.registerForm.value);

    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService
        .register(this.registerForm.value)
        .pipe(
          tap(() => {
            this.isLoading = false;
            this.message.success(
              'Успешная регистрация!',
              {
                nzDuration: 1500,
              }
            );
            this.registerForm.reset();
          }),
          delay(1500),
          tap(() => this.backToLogin.emit()),
          catchError(err => {
            this.isLoading = false;
            if(err.status === 417) {
              this.message.error(
                'Пользователь с данным email уже существует!',
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
        const ctrl = this.registerForm.controls[val];
        if (!ctrl.valid) {
          ctrl.markAsTouched()
          ctrl.setErrors({...ctrl.errors});
        }
      });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

}


