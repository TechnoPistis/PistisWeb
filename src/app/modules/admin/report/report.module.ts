import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostViewedComponent } from './most-viewed/most-viewed.component';

import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { LowStockComponent } from './low-stock/low-stock.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { HttpLoaderFactory, AdminModule } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';


@NgModule({
  declarations: [MostViewedComponent, BestSellerComponent, LowStockComponent],
  imports: [
    AdminPaginationModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild([
      { path: 'most-viewed', component: MostViewedComponent },
      { path: 'low-stock', component: LowStockComponent },
      { path: 'best-seller', component: BestSellerComponent },
    ]),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     //useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  

  ]
})
export class ReportModule { }
