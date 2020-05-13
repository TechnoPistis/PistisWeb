import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../admin/products/products.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AdminlayoutComponent } from '../../shared/layouts/adminlayout/adminlayout.component';
import { AppModule } from '../../app.module';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from '../../shared/layouts/layouts.module';
import { SlidersComponent } from './sliders/sliders.component';
import { SlidersListComponent } from './sliders-list/sliders-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BannerImagesComponent } from './banner-images/banner-images.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddFeatureProductComponent } from './add-feature-product/add-feature-product.component';
import { ListFeatureProductComponent } from './list-feature-product/list-feature-product.component';
import { FooterComponent } from './footerUrl/footer.component';
import { FooterListComponent } from './footer-Url-list/footer-list.component';
import { FooterHeaderComponent } from './footer-header/footer-header.component';
import { FooterHeaderListComponent } from './footer-header-list/footer-header-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { FooterUrlDataListComponent } from './footer-url-data-list/footer-url-data-list.component';
import { FooterUrlDataComponent } from "./footer-url-data/footer-url-data.component";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { AddCustomerGroupComponent } from './add-customer-group/add-customer-group.component';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { ManageCustomerGroupsComponent } from './manage-customer-groups/manage-customer-groups.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserActivityListComponent } from './user-activity-list/user-activity-list.component';
import { ManageGroupCustomersComponent } from './manage-group-customers/manage-group-customers.component';
import { SubMenuListComponent } from './sub-menu-list/sub-menu-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

import { NewsletterTempleteComponent } from './newsletter-templete/newsletter-templete.component';
import { NewsletterTempleteListComponent } from './newsletter-templete-list/newsletter-templete-list.component';
//import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
//import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { CustomersOrdersReportComponent } from './customers-orders-report/customers-orders-report.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { OrdersComponent } from './orders/orders.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { InvoiceComponent } from './invoice/invoice.component';
import { EditsearchtermComponent } from './editsearchterm/editsearchterm.component';
import { SearchtermlistComponent } from './searchtermlist/searchtermlist.component';
import { AdminPaginationComponent } from './admin-pagination/admin-pagination.component';

import { BrowserModule } from '@angular/platform-browser';
import { EditMenuListComponent } from './edit-menu-list/edit-menu-list.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { VendoreditComponent } from './vendoredit/vendoredit.component';
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AddNewsletterimageComponent } from './add-newsletterimage/add-newsletterimage.component';

import { BannerUploadComponent } from './banner-upload/banner-upload.component';
import { CategorycommissionModule } from './categorycommission/categorycommission.module';
import { AllUsersActivitesComponent } from 'src/app/shared/components/all-users-activites/all-users-activites.component';
import { HomeCategoryComponent } from 'src/app/shared/components/home-category/home-category.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { AddToNewsletterComponent } from './add-to-newsletter/add-to-newsletter.component';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';
import { CategoryVariantsModule } from './category-variants/category-variants.module';
import { ReportModule } from './report/report.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { SpinWheelModule } from './spin-wheel/spin-wheel.module';
import { DealModule } from './deal/deal.module';
import { AdminPaginationModule } from './admin-pagination/admin-pagination.module';
import { EditMainMenuComponent } from './edit-main-menu/edit-main-menu.component';
import { EditSubMenuComponent } from './edit-sub-menu/edit-sub-menu.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperModule } from 'src/app/modules/admin/image-cropper/image-cropper.module';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ProductVarientsComponent } from './product-varients/product-varients.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { TrackModule } from "./track/track.module";

import { TrackhomeComponent } from './trackhome/trackhome.component';
import { TrackProductDetailComponent } from './track-product-detail/track-product-detail.component';
import { TrackCartComponent } from './track-cart/track-cart.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DROPZONECONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 5,
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*'
};

const routes: Routes = [
  {path:"balance",loadChildren:'src/app/modules/admin/vendor-balance/vendor-balance.module#VendorBalanceModule'},
  {path:"track",loadChildren:'src/app/modules/admin/track/track.module#TrackModule'},

  {path:"SpinWheel",loadChildren:'src/app/modules/admin/spin-wheel/spin-wheel.module#SpinWheelModule'},
  { path: "TrackHome", component: TrackhomeComponent },
  { path: "trackProductDet", component: TrackProductDetailComponent },
  { path: "TrackCart", component: TrackCartComponent },

  { path: "invoice", component: InvoiceComponent },
    { path: "cropper", component: ImageCropperComponent },
    { path: "commission", loadChildren: 'src/app/modules/admin/categorycommission/categorycommission.module#CategorycommissionModule' },
    { path: 'newsLetter_image', component: AddNewsletterimageComponent},

    { path: 'vendorlist', component: VendorlistComponent},
    { path: 'productVarients', component: ProductVarientsComponent},
{path: 'Vendoradd', component: VendoraddComponent},
{path: 'Vendoredit', component: VendoreditComponent},
    {path:"AllUsers",component:AllUsersActivitesComponent},
    { path: "homeCategory", component: HomeCategoryComponent },
    { path: "testimonial", loadChildren: 'src/app/modules/admin/testimonial/testimonial.module#TestimonialModule' },

    { path: "orderReport", component: OrdersDetailsComponent },
    { path: "return", component: ReturnListComponent },
    {path:"SpinWheel",loadChildren:'src/app/modules/admin/spin-wheel/spin-wheel.module#SpinWheelModule'},
    {
      path: "deals", loadChildren: 'src/app/modules/admin/deal/deal.module#DealModule'
    },

    { path: "editMainmenu", component: EditMainMenuComponent },
    { path: "editSubMainmenu", component: EditSubMenuComponent },

    { path: "editsearchterm", component: EditsearchtermComponent },
    { path: "searchterm", component: SearchtermlistComponent },
    {
      path: "tracking", loadChildren: 'src/app/modules/admin/tracking/tracking.module#TrackingModule'
    },
    { path: "dashboard", component: DashboardComponent },
    { path: "productTag", component: TagsListComponent },


    { path: "customerReport", component: CustomerReportComponent },
    { path: "customerOrderReport", component: CustomersOrdersReportComponent },
    { path: "customerReviewsReport", component: CustomerReviewsComponent },
    { path: "customerReviews", component: CustomerReviewsComponent },
    { path: "productReviews", component: ProductReviewComponent },
    { path: "Orders", component: OrdersComponent },
    { path: "report", loadChildren: 'src/app/modules/admin/report/report.module#ReportModule' },
    { path: "BannerUpload", component: BannerUploadComponent },
    { path: "newsTemp", component: NewsletterTempleteComponent },
    { path: "newsTempList", component: NewsletterTempleteListComponent },
    { path: "MenuList", component: MenuListComponent },
    { path: "AddSubMenu", component: SubCategoryComponent },
    { path: "EditmenuList", component: EditMenuListComponent },
    { path: "addmainMenu", component: MainCategoryComponent },
    { path: "products", loadChildren: 'src/app/modules/admin/products/products.module#ProductsModule' },
    { path: "orderReportDetails", component: OrderReportComponent },

    { path: "sliders", component: SlidersComponent },
    { path: 'UserActivity', component: UserActivityComponent },
    { path: 'UserActivityList', component: UserActivityListComponent },
    { path: 'manageGroupUsers', component: ManageGroupCustomersComponent },
    { path: 'AddCustomerGroup', component: AddCustomerGroupComponent },
    { path: 'CustomerGroupList', component: CustomerGroupListComponent },
    { path: 'CustomersList', component: CustomerListComponent },
    { path: "sliderImages", component: SlidersListComponent },
    { path: 'BannerImages', component: BannerImagesComponent },
    { path: 'CustomersList', component: CustomerListComponent },
    { path: 'EditCustomer', component: CustomerEditComponent },
    { path: 'add_Feature_product', component: AddFeatureProductComponent },
    {
      path: 'FeatureProducts', component: ListFeatureProductComponent
    }, {
      path: 'Footer-header', component: FooterHeaderComponent
    },
    {
      path: 'SubMenu', component: SubMenuListComponent
    },
    {
      path: 'Footer-header-list', component: FooterHeaderListComponent
    }, {
      path: 'footer-urls', component: FooterComponent
    }, {
      path: 'footer-url-list', component: FooterListComponent
    }, {
      path: 'AddNewsLetter', component: AddToNewsletterComponent
    }
    , {
      path: 'NewsLetterList', component: NewsletterListComponent
    }
    ,

    {
      path: "variants", loadChildren: 'src/app/modules/admin/category-variants/category-variants.module#CategoryVariantsModule'
    }, {
      path: 'footerUrlData', component: FooterUrlDataComponent
    }, {
      path: 'footerUrlDataList', component: FooterUrlDataListComponent
    },
    { path: "category", component: ProductCategoryComponent },
    { path: "category-list", component: ProductsListComponent },

]
@NgModule({

  declarations: [
    OrdersDetailsComponent,
    FooterListComponent,
    AddToNewsletterComponent,
    NewsletterListComponent,
    AllUsersActivitesComponent,
    ProductCategoryComponent,
    ProductsListComponent,
    DashboardComponent,
    SlidersComponent,
    SlidersListComponent,
    BannerImagesComponent,
    AddFeatureProductComponent,
    ListFeatureProductComponent,
    FooterComponent,
    InvoiceComponent,
    FooterListComponent
    , FooterHeaderComponent,
    FooterHeaderListComponent,
    FooterUrlDataComponent,
    FooterUrlDataListComponent,
    CustomerListComponent,
    CustomerEditComponent,
    AddCustomerGroupComponent,
    CustomerGroupListComponent,
    ManageCustomerGroupsComponent,
    UserActivityComponent,
    UserActivityListComponent,
    ManageGroupCustomersComponent,
    SubMenuListComponent,
    MainCategoryComponent,
    SubCategoryComponent,
    MenuListComponent,
    EditMenuComponent,
BannerUploadComponent,
    NewsletterTempleteComponent,
    NewsletterTempleteListComponent,
    CustomerReportComponent,
    CustomersOrdersReportComponent,
    CustomerReviewsComponent,
    ProductReviewComponent,
    OrdersComponent,
    ReturnListComponent,
    TagsListComponent,
    EditsearchtermComponent,
    SearchtermlistComponent,
    EditMenuListComponent,
    VendorlistComponent,
    VendoreditComponent,
    VendoraddComponent,
    AddNewsletterimageComponent,
    HomeCategoryComponent,
    EditMainMenuComponent,
    EditSubMenuComponent,
    ImageCropperComponent,
    ProductVarientsComponent,
    OrderReportComponent,
    TrackhomeComponent,
    TrackProductDetailComponent,
    TrackCartComponent,



    // DropzoneModule
  ],
  imports: [
    ProductsModule,
    SpinWheelModule,
    CategorycommissionModule,
    CategoryVariantsModule,
    RouterModule.forChild(routes),
    DropzoneModule,
    AdminPaginationModule,
    CommonModule,
    TabModule,
    FormsModule,
    ReactiveFormsModule,
    //ProductsModule,
    TranslateModule,
    RouterModule,
    LayoutsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgbModule,
     CKEditorModule,
    MatSelectModule,
    ReportModule,
    TestimonialModule,
    DealModule,
    ImageCropperModule,
    TrackModule


  ],
  exports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
   providers: [
     {
       provide: DROPZONE_CONFIG,
       useValue: DROPZONECONFIG
     }
   ],
})
export class AdminModule { }
