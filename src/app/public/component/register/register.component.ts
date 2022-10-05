import {Component, Injectable, OnInit} from '@angular/core';
import {RegisterComponent} from "../../../shared/component/register/register.component";
import {Role} from "../../../core/account/role";

@Component({
  selector: 'app-register',
  templateUrl: '../../../shared/component/register/register.component.html'
})
@Injectable()
export class RegisterUserComponent extends RegisterComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() {
    super();
    this.typeUser = Role.CLIENT
    this.redirectToSuccess = ['auth', 'login']
  }
}
