import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


const routes: Routes = [
  { path: "", component: DashboardComponent },
 
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    NgxPaginationModule,
    TabModule,
    BsDatepickerModule
  ],
  exports: [
    CommonModule
  ],
})
export class DashboardModule { }
