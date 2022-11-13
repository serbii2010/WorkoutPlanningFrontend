import {Component, OnInit} from '@angular/core';
import {EditAccountComponent} from "../../../component/edit-account/edit-account.component";
import {AuthStorageService} from "../../../../core/auth/auth-storage.service";

@Component({
  selector: 'app-edit-my-account',
  templateUrl: '../../../component/edit-account/edit-account.component.html'
})
export class EditMyAccountComponent extends EditAccountComponent implements OnInit {
  constructor(private authStorageService: AuthStorageService) {
    super();
  }

  ngOnInit(): void {
    if (this.authStorageService.getRole() == null) {
      this.router.navigate(['auth', 'login']).then()
    }
    this.accountService.getMyInfo().subscribe({
      next: value => {
        this.accountInfo = value
        this.initForm()
      },
      error: error => {
        console.error(error)
      }
    })
    this.successRedirect = ['account']
  }
}
