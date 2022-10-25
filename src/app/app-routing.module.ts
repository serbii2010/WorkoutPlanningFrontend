import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from "./public/public.component";
import {PrivateComponent} from "./private/private.component";
import {HomeComponent} from "./public/component/home/home.component";

const routes: Routes = [
  {
    path: 'auth',
    component: PublicComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: PrivateComponent,
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
