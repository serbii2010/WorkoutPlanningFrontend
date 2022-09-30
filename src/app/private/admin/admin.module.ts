import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {TrainerTableComponent} from "./component/trainer-table/trainer-table.component";
import { NavAdminComponent } from './component/nav-admin/nav-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    TrainerTableComponent,
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
