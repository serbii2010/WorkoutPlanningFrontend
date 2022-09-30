import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainerTableComponent} from "./component/trainer-table/trainer-table.component";

const routes: Routes = [
  {
    path: 'trainers',
    component: TrainerTableComponent,
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
