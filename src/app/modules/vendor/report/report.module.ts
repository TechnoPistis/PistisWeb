import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule } from "@angular/forms";
import { OrderReportComponent } from "./order-report/order-report.component";
import { ProductViewReportComponent } from "./product-view-report/product-view-report.component";
import { MostViewedComponent } from "./most-viewed/most-viewed.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { AdminPaginationModule } from '../../admin/admin-pagination/admin-pagination.module';
// import { VendorPaginationModule } from "../vendor-pagination/vendor-pagination.module";

@NgModule({
  declarations: [
    MostViewedComponent,
    OrderReportComponent,
    ProductViewReportComponent
  ],
  imports: [
    AdminPaginationModule,
    // VendorPaginationModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild([
      { path: "most-viewed", component: MostViewedComponent },
      { path: "product-view-report", component: ProductViewReportComponent },
      { path: "order-report", component: OrderReportComponent }
    ])
  ]
})
export class ReportModule {}
