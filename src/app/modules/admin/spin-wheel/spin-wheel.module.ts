import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpinOptionsComponent } from './add-spin-options/add-spin-options.component';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ListComponent } from './list/list.component';
import { SpinnerOptionsPeriodComponent } from './spinner-options-period/spinner-options-period.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: "add", component: AddSpinOptionsComponent },
  { path: "list", component: ListComponent },
  { path: "Avalibility", component: SpinnerOptionsPeriodComponent },
  {path:"Report",component:ReportComponent}

]

@NgModule({
  declarations: [AddSpinOptionsComponent, ListComponent, SpinnerOptionsPeriodComponent, ReportComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    BsDatepickerModule.forRoot(),
    OwlDateTimeModule, OwlNativeDateTimeModule ,
    NgxMaterialTimepickerModule
  ]
})
export class SpinWheelModule { }
