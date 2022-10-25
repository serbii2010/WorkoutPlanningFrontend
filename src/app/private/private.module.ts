import {NgModule} from '@angular/core';
import {PrivateRoutingModule} from "./private-routing.module";
import { PrivateComponent } from './private.component';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
  ],
})
export class PrivateModule {
}
