import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainerComponent} from "./trainer.component";
import {NavTrainerComponent} from "./component/nav-trainer/nav-trainer.component";
import {WorkoutTrainerTableComponent} from "./component/workouts/workout-table/workout-trainer-table.component";
import {RouterModule} from "@angular/router";
import {TrainerRoutingModule} from "./trainer-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import { DetailWorkoutComponent } from './component/workouts/detail-workout/detail-workout.component';



@NgModule({
  declarations: [
    TrainerComponent,
    NavTrainerComponent,
    WorkoutTrainerTableComponent,
    DetailWorkoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TrainerRoutingModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class TrainerModule { }
