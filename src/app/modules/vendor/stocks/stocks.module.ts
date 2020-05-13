import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { VendorPaginationModule } from '../vendor-pagination/vendor-pagination.module';

const routes: Routes = [
  { path: "", component: StocksComponent },
 
]

@NgModule({
  declarations: [StocksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    NgxPaginationModule,
    VendorPaginationModule,
  ],
  exports: [
    
    CommonModule
  ],
})
export class StocksModule { }
