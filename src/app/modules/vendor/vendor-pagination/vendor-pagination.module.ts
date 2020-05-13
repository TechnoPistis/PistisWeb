import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPaginationComponent } from './vendor-pagination.component';



@NgModule({
  declarations: [VendorPaginationComponent],
  imports: [
    CommonModule
  ],
  exports:[VendorPaginationComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class VendorPaginationModule { }
