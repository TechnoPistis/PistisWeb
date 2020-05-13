import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';
import { TrackWishComponent } from './track-wish/track-wish.component';
import { TrackCatComponent } from './track-cat/track-cat.component';
import { TrackCompareComponent } from './track-compare/track-compare.component';
import { TrackHeaderComponent } from './track-header/track-header.component';
import { TrackFooterComponent } from './track-footer/track-footer.component';
import { EnableTrackComponent } from './enable-track/enable-track.component';
import { TrackMyprofileComponent } from './track-myprofile/track-myprofile.component';
//import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { DealCatelogueComponent } from './deal-catelogue/deal-catelogue.component';
import { AllNotificationComponent } from './all-notification/all-notification.component';
import { ProductTrackComponent } from './product-track/product-track.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CustomerRegComponent } from './customer-reg/customer-reg.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ChartsModule } from 'angular-bootstrap-md';
import { TrackDhashboardComponent } from './track-dhashboard/track-dhashboard.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ErrorsComponent } from './errors/errors.component';
import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { LiveTrafficComponent } from './live-traffic/live-traffic.component';
import { UserLiveComponent } from './user-live/user-live.component';
import { OrderLiveComponent } from './order-live/order-live.component';
import { SalesLiveComponent } from './sales-live/sales-live.component';


const routes: Routes = [
  { path: 'trackcat', component: TrackCatComponent },
  { path: 'trackMobileDhash', component: DashboardMobileComponent },
  { path: 'liveTraffic', component: LiveTrafficComponent },
  { path: 'UserliveTraffic', component: UserLiveComponent },
  {path:"OrderLiveReport" ,component: OrderLiveComponent},
  {path:"ProductTrack" ,component: ProductTrackComponent},


  { path: 'trackwish', component: TrackWishComponent },
  { path: 'trackComp', component: TrackCompareComponent },
  { path: 'trackHeader', component: TrackHeaderComponent },
  { path: 'trackFooter', component: TrackFooterComponent },
  { path: 'Enable', component: EnableTrackComponent },
  { path: 'trackMyProfile', component: TrackMyprofileComponent },
  { path: 'trackUserLogin', component: CustomerLoginComponent },
  { path: 'trackCustReg', component: CustomerRegComponent },
  { path: 'allreviews', component: CustomerRegComponent },
  { path: 'dealDetails', component: DealCatelogueComponent },
  { path: 'confirmation', component: ConfirmOrderComponent },
  { path: 'allnotification', component: AllNotificationComponent },
  { path: 'myorders', component: MyOrdersComponent },
  {
    path:'trackDashboard',component:TrackDhashboardComponent
  },
  { path: 'error', component: ErrorsComponent },


  //








]

@NgModule({

  declarations: [TrackWishComponent, TrackCatComponent, TrackCompareComponent, TrackHeaderComponent, TrackFooterComponent, EnableTrackComponent,
     TrackMyprofileComponent,
      CustomerLoginComponent,
       DealCatelogueComponent,
       AllNotificationComponent,
        ProductTrackComponent,
        AllReviewsComponent,
        ConfirmOrderComponent, CustomerRegComponent, MyOrdersComponent, TrackDhashboardComponent, ErrorsComponent, DashboardMobileComponent, LiveTrafficComponent, UserLiveComponent, OrderLiveComponent, SalesLiveComponent],
  imports: [
    CommonModule,
    AdminPaginationModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(

      routes),

      ChartsModule,
    CommonModule,
    TabModule,
    FormsModule,
  //   RouterModule.forChild([
  //      { path: 'trackcat', component: TrackCatComponent },
  //     // { path: 'low-stock', component: LowStockComponent },
  //     // { path: 'best-seller', component: BestSellerComponent },
  // ])
]
})
export class TrackModule {

 }
