import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import {NavClientComponent} from "./component/nav-client/nav-client.component";
import {ClientRoutingModule} from "./client-routing.module";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {WorkoutClientTableComponent} from "./component/workouts/workout-table/workout-client-table.component";



@NgModule({
  declarations: [
    ClientComponent,
    WorkoutClientTableComponent,
    NavClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
