import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {PublicComponent} from "./public.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // outlet: 'main'
  },
  {
    path: 'signup',
    component: RegisterComponent,
    // outlet: 'public'
  },
  {
    path: '',
    component: PublicComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
