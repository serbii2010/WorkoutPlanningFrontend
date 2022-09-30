import {NgModule} from '@angular/core';
import {HomeComponent} from "./component/home/home.component";
import {PrivateRoutingModule} from "./private-routing.module";
import { PrivateComponent } from './private.component';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    HomeComponent,
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
  ],
})
export class PrivateModule {
}
