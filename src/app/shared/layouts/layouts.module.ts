import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';


import{RouterModule} from '@angular/router';
import { VendorlayoutComponent } from './vendorlayout/vendorlayout.component';
import { CheckoutlayoutComponent } from './checkoutlayout/checkoutlayout.component';



@NgModule({
  declarations: [HomelayoutComponent,AdminlayoutComponent,VendorlayoutComponent, CheckoutlayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  exports:[AdminlayoutComponent,HomelayoutComponent,VendorlayoutComponent],
})
export class LayoutsModule { }
