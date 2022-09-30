import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../../core/service/auth.service';
import {AuthStorageService} from '../../../core/auth/auth-storage.service';
import {AuthLoginInfo} from '../../../core/auth/login-info';

import {FormControl, FormGroup, Validators} from '@angular/forms'
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();
  role: string | null = null;
  private loginInfo: AuthLoginInfo | null = null;

  constructor(private authService: AuthService,
              private authStorage: AuthStorageService,
              private router: Router) {
  }

  public formLogin: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get username() {
    return this.formLogin.controls.username
  }

  get password() {
    return this.formLogin.controls.password
  }

  setErrorMessage(error: string) {
    this.errorSubject.next(error);
  }

  ngOnInit() {
    console.log('init login component')
    if (this.authStorage.getRole()) {
      this.isLoggedIn = true;
      this.role = this.authStorage.getRole();
    }
  }

  submit() {
    if (!this.formLogin.valid) {
      this.setErrorMessage('Form not valid')
      console.error('Form not valid')
      return
    }
    this.loginInfo = new AuthLoginInfo(
      this.username.value,
      this.password.value
    );

    this.authService.attemptAuth(this.loginInfo).subscribe({
      next: (data) => {
        this.authStorage.saveUsername(data.username);
        this.authStorage.saveRole(data.role);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.authStorage.getRole();
        this.router.navigate(['']);
      },
      error: (error) => {
        this.setErrorMessage(error.error.errors[0].message)
        this.isLoginFailed = true;
      }
    })
  };
}
