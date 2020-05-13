import { LayoutsModule } from './shared/layouts/layouts.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { UserComponent } from './shared/components/user/user.component';
import { RegisterComponent } from './shared/components/user/register/register.component';
import { UserService } from './shared/services/user.service';
import { LoginComponent } from './shared/components/user/login/login.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { ProductService } from './modules/admin/products/product.service';
import { ProductsModule } from './modules/admin/products/products.module';
import { DropzoneModule, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';


// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { FrontEndComponent } from './shared/components/front-end/front-end.component';
import { FooterFrontComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterDataComponent } from './shared/components/footer-data/footer-data.component';
import { CustomerRegisterComponent } from './shared/components/cust/customer-register/customer-register.component';
import { CustomerLoginComponent } from './shared/components/cust/customer-login/customer-login.component';
import { ProductDetailsComponent } from './shared/components/product-details/product-details.component';
import { ProductlistComponent } from "./shared/components/productlist/productlist.component";
import { MenusComponent } from './shared/components/front-end/menus/menus.component';
import { CustComponent } from './shared/components/cust/cust.component';
import { RegistervendorComponent } from './shared/components/user/registervendor/registervendor.component';
import { FooterContentComponent } from './shared/components/footer-content/footer-content.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { MycartComponent } from './shared/components/mycart/mycart.component';
import { ManageAddressComponent } from './shared/components/manage-address/manage-address.component';
import { WishListComponent } from './shared/components/wish-list/wish-list.component';
import { CompareProductsComponent } from './shared/components/compare-products/compare-products.component';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { RatingReviewComponent } from './shared/components/rating-review/rating-review.component';
import { MyOrdersComponent } from './shared/components/my-orders/my-orders.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyProfileComponent } from './shared/components/my-profile/my-profile.component';
import { ConfirmorderComponent } from './shared/components/confirmorder/confirmorder.component';
import { PaypalComponent } from './shared/components/paypal/paypal.component';
import { TrackOrderComponent } from './shared/components/track-order/track-order.component';
import { TrackOrderGuestComponent } from './shared/components/track-order-guest/track-order-guest.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgxLoadingModule } from 'ngx-loading';
import { GtagModule } from 'angular-gtag';

import {GoogleAnalyticsService} from './google-analytics.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DIALOG_DEFAULT_OPTIONS,

} from '@angular/material';
import { OrdersDetailsComponent } from './modules/admin/orders-details/orders-details.component';
import { ReturnComponent } from './shared/components/return/return.component';
import { TestimonialComponent } from './shared/components/testimonial/testimonial.component';
import { MDBBootstrapModule,  IconsModule, WavesModule } from 'angular-bootstrap-md'
import { NgbCarouselConfig } from "node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel-config";
import { SearchtermComponent } from './shared/components/searchterm/searchterm.component';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { ForgotPasswordComponent } from './shared/components/cust/forgot-password/forgot-password.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestimonialListComponent } from './shared/components/testimonial-list/testimonial-list.component';
import { TestiDescriptionComponent } from './shared/components/testi-description/testi-description.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CustomerReviewsssComponent } from './shared/components/customer-reviewsss/customer-reviewsss.component';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { RedirectGuard } from './shared/guards/redirect-guard.service';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxWheelModule } from 'ngx-wheel';
import { AdminPaginationModule } from './modules/admin/admin-pagination/admin-pagination.module';
import { CheckoutModule } from './shared/components/checkout/checkout.module';
import { HeaderModule } from './shared/components/header/header.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { AllDealsComponent } from './shared/components/all-deals/all-deals.component';
import { AllNotificationsComponent } from './shared/components/all-notifications/all-notifications.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { RecentlyViewedComponent } from './shared/components/recently-viewed/recently-viewed.component';
//import { ImageCropperModule } from 'ngx-image-cropper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DealDeatilsComponent } from './shared/components/deal-deatils/deal-deatils.component';
import { HomePageDesktopComponent } from './shared/components/home-page/home-page.component.desktop';
import { HomePageMobileComponent } from './shared/components/home-page/home-page.component.mobile';
import { ProductlistDesktopComponent } from './shared/components/productlist/productlist.component.desktop';
import { ProductlistMobileComponent } from './shared/components/productlist/productlist.component.mobile';
import { ProductDetailsDesktopComponent } from './shared/components/product-details/product-details.component.desktop';
import { ProductDetailsMobileComponent } from './shared/components/product-details/product-details.component.mobile';
import { MyCartDesktopComponent } from './shared/components/mycart/mycart.component.desktop';
import { MyCartMobileComponent } from './shared/components/mycart/mycart.component.mobile';
import {  DealDetailsMobileComponent } from './shared/components/deal-deatils/deal-deatils.component.mobile';
import {  DealDetailsDesktopComponent } from './shared/components/deal-deatils/deal-deatils.component.desktop';
import { HomelistscatalogueComponent } from './shared/components/homelistscatalogue/homelistscatalogue.component';
import { HomelistDesktopComponent } from './shared/components/homelistscatalogue/homelistscatalogue.component.desktop';
import { HomelistMobileComponent } from './shared/components/homelistscatalogue/homelistscatalogue.component.mobile';
import { LayoutRoundComponent } from './shared/components/layout-round/layout-round.component';
import { OrderReportComponent } from './shared/components/order-report/order-report.component';

//import { VendorchatComponent } from './shared/components/vendorchat/vendorchat.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
export function tokenGetter() {
  return localStorage.getItem("jwt");
  }
@NgModule({
  declarations: [
    OrderReportComponent,
    AllDealsComponent,
  AllNotificationsComponent,
  ConfirmorderComponent,
    CustomerReviewsssComponent,
    AppComponent,
    UserComponent,
    RegisterComponent,
    TrackOrderGuestComponent,
    LoginComponent,
    ErrorComponent,
    RegistervendorComponent,
    ErrorComponent,
    HomePageComponent,
    HomePageDesktopComponent,
    HomePageMobileComponent,
    MenusComponent,
    FrontEndComponent,
    FooterDataComponent ,
    CustomerRegisterComponent,
    CustomerLoginComponent,
    ProductDetailsComponent,
    ProductDetailsDesktopComponent,
    ProductDetailsMobileComponent,
    ProductlistComponent,
    ProductlistDesktopComponent,
    ProductlistMobileComponent,
    CustComponent,
    FooterContentComponent ,
    PaginationComponent,
    TermsComponent,
    MycartComponent,
    MyCartDesktopComponent,
    MyCartMobileComponent,
    ManageAddressComponent,
    WishListComponent,
    MyOrdersComponent,
    RatingReviewComponent,
    CompareProductsComponent,
    MyProfileComponent,
    PaypalComponent,
    TrackOrderComponent,
    ReturnComponent,
    TestimonialComponent,
   SearchtermComponent,
   ForgotPasswordComponent,
   NotFoundComponent,
   TestimonialListComponent,
   TestiDescriptionComponent,
   RecentlyViewedComponent,
   DealDeatilsComponent,
   DealDetailsDesktopComponent,
   DealDetailsMobileComponent,
   HomelistscatalogueComponent,
   HomelistDesktopComponent,
   HomelistMobileComponent,
   LayoutRoundComponent
  // VendorchatComponent,
  ],
  imports: [
    CarouselModule,
    CountdownTimerModule.forRoot(),
    FooterModule,
    HeaderModule,
    CheckoutModule,
    NgxWheelModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ["localhost:44343"],
      blacklistedRoutes: []
      }
      }),
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    //NgxCaptchaModule,
    NgxLoadingModule.forRoot({

    }),
    GtagModule.forRoot({ trackingId: 'UA-152870542-1', trackPageviews: true }),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,

    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MDBBootstrapModule.forRoot(),  IconsModule, WavesModule ,
    AdminPaginationModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AdminModule,
    AngularStickyThingsModule,
    VendorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialMultilevelMenuModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ProductsModule,
    LayoutsModule,
    DropzoneModule,
    NgbModule,
    //AngularFontAwesomeModule,
    NgxPaginationModule,
    //ImageCropperModule ,
    CKEditorModule
  ],
  providers: [
 //  AuthGuard,
 {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
   RedirectGuard,
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {

          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      },
  },
    GoogleAnalyticsService,{
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG,
  }, UserService, ProductService, DatePipe
    , {
    provide: LocationStrategy, useClass: PathLocationStrategy

  },

  ],// ,  { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  // entryComponents:[HeaderComponent],
 bootstrap: [AppComponent],

  //exports:[HeaderComponent]
})
export class AppModule {

}
