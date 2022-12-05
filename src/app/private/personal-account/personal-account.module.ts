import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalAccountComponent} from './personal-account.component';

import {PersonalAccountRoutingModule} from "./personal-account-routing.module";
import {NavAccountComponent} from "./component/nav-account/nav-account.component";
import {EditMyAccountComponent} from "./component/edit-account/edit-my-account.component";
import {ReactiveFormsModule} from "@angular/forms";
import {VisitedWorkoutsComponent} from './component/workouts/visited-workouts/visited-workouts.component';
import {MatTableModule} from "@angular/material/table";
import {SkippedWorkoutsComponent} from './component/workouts/skipped-workouts/skipped-workouts.component';
import {CancelledWorkoutsComponent} from "./component/workouts/cancelled-workouts/cancelled-workouts.component";
import {ActiveWorkoutsComponent} from "./component/workouts/active-workouts/active-workouts.component";


@NgModule({
  declarations: [
    PersonalAccountComponent,
    EditMyAccountComponent,
    NavAccountComponent,
    ActiveWorkoutsComponent,
    VisitedWorkoutsComponent,
    SkippedWorkoutsComponent,
    CancelledWorkoutsComponent
  ],
  imports: [
    CommonModule,
    PersonalAccountRoutingModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class PersonalAccountModule { }
