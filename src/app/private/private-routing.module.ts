import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../public/component/home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {TrainerComponent} from "./trainer/trainer.component";
import {ClientComponent} from "./client/client.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'trainer',
    component: TrainerComponent,
    loadChildren: () => import('./trainer/trainer.module').then(m=>m.TrainerModule)
  },
  {
    path: 'client',
    component: ClientComponent,
    loadChildren: () => import('./client/client.module').then(m=>m.ClientModule)
  },
  {
    path: 'home',
    component: HomeComponent
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
