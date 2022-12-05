import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkoutClientTableComponent} from "./component/workouts/workout-table/workout-client-table.component";
import {SubscriptionTableComponent} from "./component/subscription/subscription-table/subscription-table.component";

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
  {
    path: 'subscriptions',
    component: SubscriptionTableComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
