import {Component, Injectable, OnInit} from '@angular/core';
import {RegisterComponent} from "../../../../shared/component/register/register.component";
import {Role} from "../../../../core/account/role";

@Component({
  selector: 'app-register-trainer',
  templateUrl: '../../../../shared/component/register/register.component.html'
})

@Injectable()
export class RegisterTrainerComponent extends RegisterComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() {
    super();
    this.typeUser = Role.TRAINER
    this.redirectToSuccess = ['admin', 'trainers']
  }
}
