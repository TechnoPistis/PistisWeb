// import { childOfKind } from 'tslint/lib';
import { NgModule, Component, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './shared/components/user/user.component';
import { RegisterComponent } from './shared/components/user/register/register.component';
import { LoginComponent } from './shared/components/user/login/login.component';
import { FooterContentComponent } from './shared/components/footer-content/footer-content.component';
import { AdminlayoutComponent } from './shared/layouts/adminlayout/adminlayout.component';
import { MenusComponent } from './shared/components/front-end/menus/menus.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { FrontEndComponent } from './shared/components/front-end/front-end.component';
import { FooterDataComponent } from './shared/components/footer-data/footer-data.component';
import { CustomerRegisterComponent } from './shared/components/cust/customer-register/customer-register.component';
import { CustomerLoginComponent } from './shared/components/cust/customer-login/customer-login.component';
import { ProductDetailsComponent } from './shared/components/product-details/product-details.component';
import { ProductlistComponent } from './shared/components/productlist/productlist.component';
import { FooterFrontComponent } from './shared/components/footer/footer.component';
import { CustComponent } from './shared/components/cust/cust.component';
import { RegistervendorComponent } from './shared/components/user/registervendor/registervendor.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { MycartComponent } from './shared/components/mycart/mycart.component';
import { WishListComponent } from './shared/components/wish-list/wish-list.component';
import { ManageAddressComponent } from './shared/components/manage-address/manage-address.component';
import { MyOrdersComponent } from './shared/components/my-orders/my-orders.component';
import { RatingReviewComponent } from './shared/components/rating-review/rating-review.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { MyProfileComponent } from './shared/components/my-profile/my-profile.component';
import { ConfirmorderComponent } from './shared/components/confirmorder/confirmorder.component';
import { CompareProductsComponent } from './shared/components/compare-products/compare-products.component';
import { PaypalComponent } from './shared/components/paypal/paypal.component';
import { TrackOrderComponent } from './shared/components/track-order/track-order.component';
import { ReturnComponent } from './shared/components/return/return.component';
import { ForgotPasswordComponent } from './shared/components/cust/forgot-password/forgot-password.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TestimonialComponent } from './shared/components/testimonial/testimonial.component';
import { TestimonialListComponent } from './shared/components/testimonial-list/testimonial-list.component';
import { CustomerReviewsssComponent } from './shared/components/customer-reviewsss/customer-reviewsss.component';
import { RedirectGuard } from './shared/guards/redirect-guard.service';
import { HomelayoutComponent } from './shared/layouts/homelayout/homelayout.component';
import { VendorlayoutComponent } from './shared/layouts/vendorlayout/vendorlayout.component';
import { AllDealsComponent } from './shared/components/all-deals/all-deals.component';
import { AllNotificationsComponent } from './shared/components/all-notifications/all-notifications.component';
import { RecentlyViewedComponent } from './shared/components/recently-viewed/recently-viewed.component';
import { CheckoutlayoutComponent } from './shared/layouts/checkoutlayout/checkoutlayout.component';
import { DealDeatilsComponent } from './shared/components/deal-deatils/deal-deatils.component';
import { TrackOrderGuestComponent } from './shared/components/track-order-guest/track-order-guest.component';
import { HomelistscatalogueComponent } from './shared/components/homelistscatalogue/homelistscatalogue.component';
import { OrderReportComponent } from './shared/components/order-report/order-report.component';

const routes: Routes = [

  {
    path: 'wordpress',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: 'https://www.pistis.com.mx/wordpress/'
    }
},
  { path: "", component: HomePageComponent },
 // { path: "checkout-process", loadChildren: 'src/app/shared/components/checkout/checkout.module#CheckoutModule' },
 {path:"homelistscatalogue",component:HomelistscatalogueComponent},
{path:"All-deals",component:AllDealsComponent},
{path:"recently-viewed",component:RecentlyViewedComponent},
  { path: "payment", component: PaypalComponent },
  { path: '404', component: NotFoundComponent },
  { path: "allreviews", component: CustomerReviewsssComponent },
  { path: "confirmation", component:ConfirmorderComponent  },
  { path: "AllNotifications", component:AllNotificationsComponent },
  { path: "RatingReview", component: RatingReviewComponent },
  { path: "MyOrders/:orderID", component: MyOrdersComponent },
  { path: "return", component: ReturnComponent },
  { path: "trackorder", component: TrackOrderComponent },
  { path: "trackorder_bynumber", component: TrackOrderGuestComponent },
  { path: "paging", component: PaginationComponent },
  { path: "footer", component: FooterFrontComponent },
  { path: "FooterContent", component: FooterContentComponent },
  { path: 'productcatalogue', component: ProductlistComponent },
  { path: 'dealscatalogue', component: DealDeatilsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'mycart', component: MycartComponent },
  { path: "OrderReport", component: OrderReportComponent },

  { path: 'footer-data', component: FooterDataComponent },
  { path: "MyProfile", component: MyProfileComponent },
  { path: "MyOrders", component: MyOrdersComponent },
  { path: "RatingReview", component: RatingReviewComponent },
  { path: "return", component: ReturnComponent },
  { path: "ManageAddress", component: ManageAddressComponent  },
  { path: "CompareProducts", component: CompareProductsComponent },
  { path: "wishlist", component: WishListComponent },
  { path: "return", component: ReturnComponent },
  { path: "", redirectTo: '/home-page', pathMatch: "full" },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'testimoniallist', component: TestimonialListComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  {
    path: "Front", component: FrontEndComponent,
    children: [
      { path: "Menus", component: MenusComponent }
    ]
  },
  {
    path: "vendor", component: HomelayoutComponent,
    children: [
      {path: 'login', loadChildren: 'src/app/shared/components/vendor-login/vendor-login.module#VendorLoginModule'},
  ]
  },
  {
    path: "vendor", component: VendorlayoutComponent,
    children: [
  {
    path: "", loadChildren: 'src/app/modules/vendor/vendor.module#VendorModule'
  },
]},
{
  path: "checkout-process", component: CheckoutlayoutComponent,
  children: [

{ path: '', loadChildren: 'src/app/shared/components/checkout/checkout.module#CheckoutModule' }]},
  {
    path: "admin", component: AdminlayoutComponent,
    children: [
      {
        path: "", loadChildren: 'src/app/modules/admin/admin.module#AdminModule'
      },
    ]},
  {
    path: "customer", component: CustComponent,
    children: [
      { path: 'UserLogin', component: CustomerLoginComponent },
      { path: 'UserRegistration', component: CustomerRegisterComponent },
      { path: "forgotpassword", component: ForgotPasswordComponent },

    ]
  },

  {
    path: "user", component: UserComponent,
    children: [
      { path: "register", component: RegisterComponent },//,canActivate: [AuthGuard] canActivate: [RoleGuard], data: { expectedRoleId: 1}
      { path: "login", component: LoginComponent },
      { path: "registervendor", component: RegistervendorComponent },
    ]
  },

  {path: '**',redirectTo:""},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload',useHash:false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
