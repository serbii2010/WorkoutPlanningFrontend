import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainerTableComponent} from "./component/trainers/trainer-table/trainer-table.component";
import {RegisterTrainerComponent} from "./component/trainers/register-trainer/register-trainer.component";
import {EditTrainerComponent} from "./component/trainers/edit-trainer/edit-trainer.component";
import {GenerateWorkoutsComponent} from "./component/workouts/generate-workouts/generate-workouts.component";
import {EditWorkoutComponent} from "./component/workouts/edit-workout/edit-workout.component";
import {WorkoutAdminTableComponent} from "./component/trainers/workout-table/workout-table.component";

const routes: Routes = [
  {
    path: 'trainers',
    component: TrainerTableComponent,
  },
  {
    path: 'trainers/edit/:id',
    component: EditTrainerComponent,
  },
  {
    path: 'trainers/register-trainer',
    component: RegisterTrainerComponent,
  },
  {
    path: 'workouts',
    component: WorkoutAdminTableComponent,
  },
  {
    path: 'workouts/generate-workouts',
    component: GenerateWorkoutsComponent,
  },
  {
    path: 'workouts/edit/:id',
    component: EditWorkoutComponent,
  },
  {
    path: '',
    redirectTo: 'trainers',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
