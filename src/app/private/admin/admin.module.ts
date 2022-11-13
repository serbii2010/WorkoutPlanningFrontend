import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {TrainerTableComponent} from "./component/trainers/trainer-table/trainer-table.component";
import {NavAdminComponent} from './component/nav-admin/nav-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterTrainerComponent} from "./component/trainers/register-trainer/register-trainer.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {GenerateWorkoutsComponent} from './component/workouts/generate-workouts/generate-workouts.component';
import {SharedModule} from "../../shared/shared.module";
import {CheckboxGroupComponent} from "../../shared/component/multi-check-box/checkbox-group.component";
import {EditWorkoutComponent} from './component/workouts/edit-workout/edit-workout.component';
import {WorkoutAdminTableComponent} from "./component/workouts/workout-table/workout-table.component";
import {RulesComponent} from './component/rules/rules.component';
import {AdminComponent} from "./admin.component";
import {EditTrainerComponent} from './component/trainers/edit-trainer/edit-trainer.component';
import {DetailWorkoutComponent} from "./component/workouts/detail-workout/detail-workout.component";


@NgModule({
  declarations: [
    AdminComponent,
    TrainerTableComponent,
    RegisterTrainerComponent,
    NavAdminComponent,
    EditTrainerComponent,
    WorkoutAdminTableComponent,
    GenerateWorkoutsComponent,
    CheckboxGroupComponent,
    EditWorkoutComponent,
    DetailWorkoutComponent,
    RulesComponent,
    EditTrainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class AdminModule {
}
