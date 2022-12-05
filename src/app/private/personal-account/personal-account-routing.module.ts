import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EditMyAccountComponent} from "./component/edit-account/edit-my-account.component";
import {VisitedWorkoutsComponent} from "./component/workouts/visited-workouts/visited-workouts.component";
import {SkippedWorkoutsComponent} from "./component/workouts/skipped-workouts/skipped-workouts.component";
import {CancelledWorkoutsComponent} from "./component/workouts/cancelled-workouts/cancelled-workouts.component";
import {ActiveWorkoutsComponent} from "./component/workouts/active-workouts/active-workouts.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'edit',
    pathMatch: 'full',
  },
  {
    path: 'edit',
    component: EditMyAccountComponent,
  },
  {
    path: 'active-workout',
    component: ActiveWorkoutsComponent
  },
  {
    path: 'visited-workout',
    component: VisitedWorkoutsComponent
  },
  {
    path: 'skipped-workout',
    component: SkippedWorkoutsComponent
  },
  {
    path: 'cancelled-workout',
    component: CancelledWorkoutsComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAccountRoutingModule {
}
