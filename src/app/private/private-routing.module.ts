import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/home/home.component";
import {ClientComponent} from "./component/client/client.component";
import {TrainerComponent} from "./component/trainer/trainer.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'trainer',
    component: TrainerComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
