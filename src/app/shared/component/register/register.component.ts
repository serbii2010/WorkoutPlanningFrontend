import {FormControl, FormGroup, Validators} from '@angular/forms'
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {SignUpInfo} from "../../../core/auth/signup-info";
import {AuthService} from "../../../core/service/auth.service";
import {inject, Injectable} from "@angular/core";
import {Role} from "../../../core/account/role";

@Injectable()
export abstract class RegisterComponent {
  isRegisterFailed: boolean = false
  protected signUpInfo: SignUpInfo | undefined;
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('No errors');
  errorMessage$: Observable<string> = this.errorSubject.asObservable();
  protected authService: AuthService = inject(AuthService)
  protected router: Router = inject(Router)

  protected redirectToSuccess: any[] | undefined;
  protected typeUser: Role = Role.CLIENT;

  protected constructor() {
  }

  formRegister: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    repeatPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
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

  get password() {
    return this.formRegister.controls.password
  }

  get repeatPassword() {
    return this.formRegister.controls.repeatPassword
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

  register(): void {
    if (!this.formRegister.valid) {
      this.setErrorMessage('Form not valid')
      console.error('Form not valid')
      return
    }

    this.signUpInfo = new SignUpInfo(
      this.username.value,
      this.firstName.value,
      this.lastName.value,
      this.password.value,
      this.email.value,
      this.phone.value
    )

    this.authService.signUp(this.signUpInfo, this.typeUser).subscribe({
      next: () => {
        if (this.redirectToSuccess) {
          this.router.navigate(this.redirectToSuccess);
        } else {
          console.error('redirect is undefined')
        }
      },
      error: (error: any) => {
        this.setErrorMessage(error.error.errors[0].message)
      }
    })
  }

  private setErrorMessage(message: string) {
    console.error(message)
    this.errorSubject.next(message);
    this.isRegisterFailed = true
  }
}
