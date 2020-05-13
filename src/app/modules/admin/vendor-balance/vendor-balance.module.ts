import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VendorBalanceComponent } from './vendor-balance.component';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDetailComponent } from './view-detail/view-detail.component';


const routes: Routes = [
  { path: "", component: VendorBalanceComponent },
  { path: "detail", component: ViewDetailComponent },
  

]

@NgModule({
  declarations: [VendorBalanceComponent, ViewDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    NgxPaginationModule,
    AdminPaginationModule
  ]
})
export class VendorBalanceModule { }
