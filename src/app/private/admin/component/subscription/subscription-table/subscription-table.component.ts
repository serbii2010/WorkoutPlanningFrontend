import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../../../../../core/service/subscription.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {SubscriptionType} from "../../../../../core/subscription/subscription-type";
import {BaseSubscriptionInfo} from "../../../../../core/subscription/base-subscription-info";

@Component({
  selector: 'app-subscription-table',
  templateUrl: './subscription-table.component.html'
})
export class SubscriptionTableComponent implements OnInit {
  baseSubscriptions: BaseSubscriptionInfo[] = []

  types: any = [{
    name: SubscriptionType.LIMITED,
    value: 'Limited'
  }, {
    name: SubscriptionType.UNLIMITED,
    value: 'Unlimited'
  }]

  displayedColumns!: string[];

  formFilter: FormGroup = new FormGroup({
    type: new FormControl<SubscriptionType>(SubscriptionType.LIMITED),
    user: new FormControl<string>(''),
    dateStart: new FormControl<string>(''),
    dateEnd: new FormControl<string>(''),
  })

  constructor(private subscriptionService: SubscriptionService) {

  }

  ngOnInit(): void {
    this.getSubscriptions()
  }

  get type() {
    return this.formFilter.controls.type;
  }
  get user() {
    return this.formFilter.controls.user;
  }
  get dateStart() {
    return this.formFilter.controls.dateStart;
  }
  get dateEnd() {
    return this.formFilter.controls.dateEnd;
  }

  getSubscriptions() {
    let model: Observable<any>
    switch (this.type.value) {
      case SubscriptionType.LIMITED: {
        this.displayedColumns = ['username', 'total', 'remaining', 'active', 'creationTimestamp', 'actions'];
        model = this.subscriptionService.getLimitedSubscriptions(this.user.value, this.dateStart.value, this.dateEnd.value)
        break
      }
      case SubscriptionType.UNLIMITED: {
        this.displayedColumns = ['username', 'fromDate', 'toDate', 'active', 'creationTimestamp', 'actions'];
        model = this.subscriptionService.getUnlimitedSubscriptions(this.user.value, this.dateStart.value, this.dateEnd.value)
        break
      }
      default:
        console.error("Internal error")
        return
    }
    model.subscribe({
        next: value => {
          this.baseSubscriptions = value
        }
      }
    )
  }

  setActive(id: number, isActive: boolean) {
    this.subscriptionService.setActive(id, isActive).subscribe({
      next: () => {
        this.getSubscriptions()
      },
      error: error => {
        let errorData: string[] = []
        for (let err of error.error.errors) {
          errorData.push('field ' + err.field + ' - ' + err.message)
        }
        alert(errorData)
      }
    })
  }

}
