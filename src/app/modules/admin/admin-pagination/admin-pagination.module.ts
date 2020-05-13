import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaginationComponent } from './admin-pagination.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AdminPaginationComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[AdminPaginationComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AdminPaginationModule { }
