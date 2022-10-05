import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {TrainerTableComponent} from "./component/trainer-table/trainer-table.component";
import {NavAdminComponent} from './component/nav-admin/nav-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterTrainerComponent} from "./component/register-trainer/register-trainer.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { EditTrainerComponent } from './component/edit-trainer/edit-trainer.component';


@NgModule({
  declarations: [
    AdminComponent,
    TrainerTableComponent,
    RegisterTrainerComponent,
    NavAdminComponent,
    EditTrainerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AdminModule {
}
