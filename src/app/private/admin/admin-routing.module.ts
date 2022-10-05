import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainerTableComponent} from "./component/trainer-table/trainer-table.component";
import {RegisterTrainerComponent} from "./component/register-trainer/register-trainer.component";
import {EditTrainerComponent} from "./component/edit-trainer/edit-trainer.component";

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
    path: 'register-trainer',
    component: RegisterTrainerComponent,
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
