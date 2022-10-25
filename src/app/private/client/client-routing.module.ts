import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkoutClientTableComponent} from "./component/workouts/workout-table/workout-client-table.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workouts',
    pathMatch: 'full'
  },
  {
    path: 'workouts',
    component: WorkoutClientTableComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
