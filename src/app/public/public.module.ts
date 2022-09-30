import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PublicRoutingModule} from "./public-routing.module";
import {PublicComponent} from './public.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
  ]

})
export class PublicModule {
}