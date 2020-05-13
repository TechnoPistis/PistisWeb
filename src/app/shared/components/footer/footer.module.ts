import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterFrontComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterFrontDesktopComponent } from './footer.component.desktop';
import { FooterFrontMobileComponent } from './footer.component.mobile';



@NgModule({
  declarations: [FooterFrontComponent,FooterFrontDesktopComponent,FooterFrontMobileComponent],
  imports: [
    CommonModule,RouterModule,
    TranslateModule,
    FormsModule,
    NgxLoadingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  exports:[FooterFrontComponent,FooterFrontDesktopComponent,FooterFrontMobileComponent]
})
export class FooterModule { }
