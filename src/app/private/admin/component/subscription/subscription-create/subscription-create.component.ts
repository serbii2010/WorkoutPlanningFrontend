import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {SubscriptionService} from "../../../../../core/service/subscription.service";
import {Router} from "@angular/router";
import {Role} from "../../../../../core/account/role";
import {AccountService} from "../../../../../core/service/account.service";
import {AccountInfo} from "../../../../../core/account/account-info";
import {SubscriptionType} from "../../../../../core/subscription/subscription-type";
import {CreateSubscriptionLimitedInfo} from "../../../../../core/subscription/create-subscription-limited-info";
import {CreateSubscriptionUnlimitedInfo} from "../../../../../core/subscription/create-subscription-unlimited-info";

@Component({
  selector: 'app-subscription-create',
  templateUrl: './subscription-create.component.html'
})
export class SubscriptionCreateComponent implements OnInit {
  isFailed: boolean = false
  private errorSubject: BehaviorSubject<string[]> = new BehaviorSubject(['No errors']);
  errorMessage$: Observable<string[]> = this.errorSubject.asObservable();

  clients!: AccountInfo[]
  workoutsCount: number[] = [8, 12, 24]
  monthsCount: number[] = [3, 6, 12]

  types: any = [{
    name: SubscriptionType.LIMITED,
    value: 'Limited'
  }, {
    name: SubscriptionType.UNLIMITED,
    value: 'Unlimited'
  }]

  formBase: FormGroup = new FormGroup({
    type: new FormControl<SubscriptionType>(SubscriptionType.LIMITED),
    username: new FormControl<string>('', [Validators.required])
  })
  formLimited: FormGroup = new FormGroup({
    total: new FormControl<number>(0, [Validators.required])
  })
  formUnlimited: FormGroup = new FormGroup({
    dateStart: new FormControl<string>('', [Validators.required]),
    countMonth: new FormControl<number>(0, [Validators.required])
  })

  constructor(private subscriptionService: SubscriptionService,
              private router: Router,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts(Role.CLIENT).subscribe({
      next: value => {
        this.clients = value
      }
    })
  }

  get type() {
    return this.formBase.controls.type;
  }
  get username() {
    return this.formBase.controls.username;
  }

  get total() {
    return this.formLimited.controls.total;
  }

  get dateStart() {
    return this.formUnlimited.controls.dateStart
  }
  get countMonth() {
    return this.formUnlimited.controls.countMonth
  }

  create() {
    let model: Observable<any>
    switch (this.type.value) {
      case SubscriptionType.LIMITED: {
        let requestParam = new CreateSubscriptionLimitedInfo(this.username.value, this.total.value)
        model = this.subscriptionService.createLimited(requestParam)
        break
      }
      case SubscriptionType.UNLIMITED: {
        let requestParam = new CreateSubscriptionUnlimitedInfo(this.username.value, this.dateStart.value, this.countMonth.value)
        model = this.subscriptionService.createUnlimited(requestParam)
        break
      }
      default:
        return
    }
    model.subscribe({
      next: () => {
        this.router.navigate(['admin', 'subscriptions'])
      },
      error: error => {
        let errorData: string[] = []
        for (let err of error.error.errors) {
          errorData.push('field ' + err.field + ' - ' + err.message)
        }
        this.setErrorMessage(errorData)
      }
    })
  }

  private setErrorMessage(message: string[]) {
    console.error(message)
    this.errorSubject.next(message);
    this.isFailed = true
  }
}
