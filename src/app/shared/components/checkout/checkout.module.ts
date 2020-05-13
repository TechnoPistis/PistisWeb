import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout1.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HeaderModule } from '../header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { CheckoutLoginComponent } from './checkout-login/checkout-login.component';
import { CheckoutStepsComponent } from './checkout-steps/checkout-steps.component';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { LayoutModule } from '@angular/cdk/layout';


const routes:Routes=[
  //{
    // path: " ", component: CheckoutComponent,
    // children: [
      { path: "checkout-login", component: CheckoutLoginComponent },
       { path: "checkout", component: CheckoutStepsComponent },
      // { path: "edit", component: EditComponent }
  //   ]
  // },
]
@NgModule({
  declarations: [CheckoutComponent, CheckoutLoginComponent, CheckoutStepsComponent],
  imports: [
    AngularStickyThingsModule,
    HeaderModule,
    CommonModule,
    FooterModule,
    TranslateModule,
    FormsModule,
    LayoutModule,
    NgxLoadingModule,
    NgxSpinnerModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
]
})
export class CheckoutModule { }
