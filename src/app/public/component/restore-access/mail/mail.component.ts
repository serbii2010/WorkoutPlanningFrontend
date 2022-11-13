import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restore-access',
  templateUrl: './mail.component.html'
})
export class MailComponent implements OnInit {
  isFailed = false;
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();

  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
  })

  get email() {
    return this.form.controls.email
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
    this.authService.restoreAccess(this.email.value).subscribe({
      next: () => {
        this.router.navigate(['auth', 'restore-code'])
      },
      error: error => {
        console.error(error)
        if (error.status == 400) {
          this.setErrorMessage(error.error.errors[0].message)
        } else {
          this.setErrorMessage('Send failed')
        }
      }
    })
  }

  setErrorMessage(error: string) {
    this.isFailed = true
    this.errorSubject.next(error);
  }
}
