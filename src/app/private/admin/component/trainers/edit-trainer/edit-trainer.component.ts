import { Component, OnInit } from '@angular/core';
import {EditAccountComponent} from "../../../../component/edit-account/edit-account.component";

@Component({
  selector: 'app-edit-trainer-account',
  templateUrl: '../../../../component/edit-account/edit-account.component.html',
})
export class EditTrainerComponent extends EditAccountComponent implements OnInit {

  constructor() {
    super();
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
    this.successRedirect = ['admin', 'trainers']
  }

}
