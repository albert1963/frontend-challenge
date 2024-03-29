import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent} from "./dashboard.component";
import {ChartModule} from "../../component/chart/chart.module";
import {HeaderModule} from "../../component/header/header.module";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule,
        HeaderModule,
        ReactiveFormsModule
    ]
})
export class DashboardModule {
}
