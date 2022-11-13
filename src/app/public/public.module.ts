import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RegisterUserComponent} from "./component/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PublicRoutingModule} from "./public-routing.module";
import {PublicComponent} from './public.component';
import { MailComponent } from './component/restore-access/mail/mail.component';
import { CodeComponent } from './component/restore-access/code/code.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    PublicComponent,
    MailComponent,
    CodeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
  ]

})
export class PublicModule {
}
