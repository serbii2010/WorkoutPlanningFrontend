import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html'
})
export class CodeComponent implements OnInit {
  isFailed = false;
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();

  public form: FormGroup = new FormGroup({
    code: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    passwordConfirm: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  })

  get code() {
    return this.form.controls.code
  }

  get password() {
    return this.form.controls.password
  }

  get passwordConfirm() {
    return this.form.controls.passwordConfirm
  }

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  submit() {
    if (!this.form.valid) {
      this.setErrorMessage('Form not valid')
      console.error('Form not valid')
      return
    }
    if (this.password.value != this.passwordConfirm.value) {
      this.setErrorMessage('Password not equals')
      return;
    }
    this.authService.sendCode(this.code.value, this.password.value).subscribe({
      next: () => {
        this.router.navigate(['auth', 'login'])
      },
      error: error => {
        console.error(error)
        if (error.status == 400) {
          this.setErrorMessage(error.error.errors[0].message)
        } else {
          this.setErrorMessage('Error by send restore code')
        }
      }
    })
  }

  setErrorMessage(error: string) {
    this.isFailed = true
    this.errorSubject.next(error);
  }
}
