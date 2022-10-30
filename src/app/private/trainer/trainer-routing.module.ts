import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkoutTrainerTableComponent} from "./component/workouts/workout-table/workout-trainer-table.component";
import {DetailWorkoutComponent} from "./component/workouts/detail-workout/detail-workout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workouts',
    pathMatch: 'full'
  },
  {
    path: 'workouts',
    component: WorkoutTrainerTableComponent,
  },
  {
    path: 'workouts/:id/detail',
    component: DetailWorkoutComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule {
}
