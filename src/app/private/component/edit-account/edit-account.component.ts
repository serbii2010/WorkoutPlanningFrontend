import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountInfo} from "../../../core/account/account-info";
import {AccountService} from "../../../core/service/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {EditAccountRequest} from "../../../core/account/edit-account-request";

@Injectable()
export class EditAccountComponent {
  userRequest: EditAccountRequest | undefined
  accountInfo: AccountInfo | undefined
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();
  isEditFailed: boolean = false;
  protected route: ActivatedRoute = inject(ActivatedRoute)
  protected router: Router = inject(Router)
  protected accountService: AccountService = inject(AccountService)
  successRedirect!: any

  initForm() {
    this.form.controls.username.setValue(this.accountInfo !== undefined ? this.accountInfo.username : '')
    this.form.controls.firstName.setValue(this.accountInfo !== undefined ? this.accountInfo.firstName : '')
    this.form.controls.lastName.setValue(this.accountInfo !== undefined ? this.accountInfo.lastName : '')
    this.form.controls.email.setValue(this.accountInfo !== undefined ? this.accountInfo.email : '')
    this.form.controls.phone.setValue(this.accountInfo !== undefined ? this.accountInfo.phone : '')
  }

  public form = new FormGroup({
    username: new FormControl<string>('', []),
    firstName: new FormControl<string>('', []),
    lastName: new FormControl<string>('', []),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl<string>('', [
      Validators.pattern("^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$")
    ])
  })

  get username() {
    return this.form.controls.username
  }

  get firstName() {
    return this.form.controls.firstName
  }

  get lastName() {
    return this.form.controls.lastName
  }

  get email() {
    return this.form.controls.email
  }

  get phone() {
    return this.form.controls.phone
  }

  edit() {
    if (!this.form.valid) {
      this.setErrorMessage('Form not valid')
      return
    }

    this.userRequest = new EditAccountRequest(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.phone.value
    )

    this.accountService.editAccount(this.userRequest, this.form.controls.username.value).subscribe({
        next: () => {
          this.router.navigate(this.successRedirect)
          this.isEditFailed = false
        },
        error: error => {
          this.setErrorMessage(error.error.errors[0].message)
        }
      },
    )
  }

  private setErrorMessage(message: string) {
    console.error(message)
    this.errorSubject.next(message);
    this.isEditFailed = true
  }
}
