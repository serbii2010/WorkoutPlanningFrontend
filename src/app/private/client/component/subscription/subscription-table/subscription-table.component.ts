import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {SubscriptionService} from "../../../../../core/service/subscription.service";
import {BaseSubscriptionInfo} from "../../../../../core/subscription/base-subscription-info";
import {SubscriptionType} from "../../../../../core/subscription/subscription-type";

@Component({
  selector: 'app-subscription-table',
  templateUrl: './subscription-table.component.html'
})
export class SubscriptionTableComponent implements OnInit {
  listSubscriptions: BaseSubscriptionInfo[] = []

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
    dateStart: new FormControl<string>(''),
    dateEnd: new FormControl<string>(''),
  })

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getSubscriptions()
  }

  get type() {
    return this.formFilter.controls.type;
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
        this.displayedColumns = ['total', 'remaining', 'active', 'creationTimestamp'];
        model = this.subscriptionService.getLimitedSubscriptions(null, this.dateStart.value, this.dateEnd.value)
        break
      }
      case SubscriptionType.UNLIMITED: {
        this.displayedColumns = ['fromDate', 'toDate', 'active', 'creationTimestamp'];
        model = this.subscriptionService.getUnlimitedSubscriptions(null, this.dateStart.value, this.dateEnd.value)
        break
      }
      default:
        console.error("Internal error")
        return
    }
    model.subscribe({
        next: value => {
          this.listSubscriptions = value
        }
      }
    )
  }
}
