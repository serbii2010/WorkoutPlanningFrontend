import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegisterUserComponent} from "./component/register/register.component";
import {PublicComponent} from "./public.component";
import {MailComponent} from "./component/restore-access/mail/mail.component";
import {CodeComponent} from "./component/restore-access/code/code.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterUserComponent,
  },
  {
    path: 'restore-access',
    component: MailComponent
  },
  {
    path: 'restore-code',
    component: CodeComponent
  },
  {
    path: '',
    component: PublicComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
