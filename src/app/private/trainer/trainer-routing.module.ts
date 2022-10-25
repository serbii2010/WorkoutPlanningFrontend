import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkoutTrainerTableComponent} from "./component/workouts/workout-table/workout-trainer-table.component";

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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule {
}
