import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { DROPZONE_CONFIG, DropzoneModule,DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { VendorPaginationComponent } from '../vendor-pagination/vendor-pagination.component';
import { VendorPaginationModule } from '../vendor-pagination/vendor-pagination.module';

const DROPZONECONFIG: DropzoneConfigInterface = {    
  url: 'https://httpbin.org/post',    
  maxFilesize: 5,    
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*'    
};
const routes: Routes = [
  { path: "", component: ProductListComponent },
  {path:"add",component:ProductComponent},
  {path:"edit",component:EditComponent},
]

@NgModule({
  declarations: [EditComponent,ProductComponent,ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    CKEditorModule,
    DropzoneModule,
    NgxPaginationModule,
    VendorPaginationModule
  ],
  exports: [
    
    CommonModule
  ],
  providers: [    
    {    
      provide: DROPZONE_CONFIG,    
      useValue: DROPZONECONFIG    
    }    
  ],
})
export class VendorProductsModule { }
