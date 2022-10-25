import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountInfo} from "../../../../../core/account/account-info";
import {AccountService} from "../../../../../core/service/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {EditAccountRequest} from "../../../../../core/account/edit-account-request";

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html'
})
export class EditTrainerComponent implements OnInit {
  userRequest: EditAccountRequest | undefined
  accountInfo: AccountInfo | undefined
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();
  isEditFailed: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(urlParam => {
      this.accountService.getAccount(urlParam['id']).subscribe({
        next: value => {
          this.accountInfo = value
          this.initForm()
        }
      })
    })
  }

  initForm() {
    this.formRegister.controls.username.setValue(this.accountInfo !== undefined ? this.accountInfo.username :'' )
    this.formRegister.controls.firstName.setValue(this.accountInfo !== undefined ? this.accountInfo.firstName : '')
    this.formRegister.controls.lastName.setValue(this.accountInfo !== undefined ? this.accountInfo.lastName : '')
    this.formRegister.controls.email.setValue(this.accountInfo !== undefined ? this.accountInfo.email : '')
    this.formRegister.controls.phone.setValue(this.accountInfo !== undefined ? this.accountInfo.phone : '')
  }

  formRegister = new FormGroup({
    username: new FormControl<string>( '', []),
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
    return this.formRegister.controls.username
  }

  get firstName() {
    return this.formRegister.controls.firstName
  }

  get lastName() {
    return this.formRegister.controls.lastName
  }

  get email() {
    return this.formRegister.controls.email
  }

  get phone() {
    return this.formRegister.controls.phone
  }

  edit() {
    if (!this.formRegister.valid) {
      this.setErrorMessage('Form not valid')
      console.error('Form not valid')
      return
    }

    this.userRequest = new EditAccountRequest(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.phone.value
    )

    this.accountService.editAccount(this.userRequest, this.formRegister.controls.username.value).subscribe({
      next: () =>
          this.router.navigate(['admin', 'trainers'])
      }
    )
  }

  private setErrorMessage(message: string) {
    console.error(message)
    this.errorSubject.next(message);
    this.isEditFailed = true
  }
}
