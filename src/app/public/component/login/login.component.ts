import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../../core/service/auth.service';
import {AuthStorageService} from '../../../core/auth/auth-storage.service';
import {AuthLoginInfo} from '../../../core/auth/login-info';

import {FormControl, FormGroup, Validators} from '@angular/forms'
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginResponse} from "../../../core/auth/login-response";

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

  constructor(public authService: AuthService,
              private authStorage: AuthStorageService,
              private router: Router,
              private route: ActivatedRoute) {
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
    if (this.authStorage.getRole()) {
      this.isLoggedIn = true;
      this.role = this.authStorage.getRole();
    }
    if (this.route.snapshot.queryParamMap.get('token') != null) {
      this.authService.getCurrentRole().subscribe({
        next: value => {
          this.role = value.name
          let login = new LoginResponse(this.route.snapshot.queryParamMap.get('token')!, '', '', '', '', this.role)
          this.auth(login)
        },
        error: err => {
          console.error(err)
          // alert(err)
        }
      })

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
        this.auth(data)
      },
      error: (error) => {
        this.setErrorMessage(error.error.errors[0].message)
        this.isLoginFailed = true;
      }
    })
  };

  private auth(loginResponse: LoginResponse): void {
    this.authStorage.saveUsername(loginResponse.username);
    this.authStorage.saveRole(loginResponse.role);

    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.role = this.authStorage.getRole();
    console.log('navigate')
    this.router.navigate(['']);
  }
}
