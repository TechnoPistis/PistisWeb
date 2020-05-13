import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './products/product/product.component';
import { TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { LayoutsModule } from '../../../shared/layouts/layouts.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { EditComponent } from './products/edit/edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';
import { AdminPaginationComponent } from '../admin-pagination/admin-pagination.component';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';

const DROPZONECONFIG: DropzoneConfigInterface = {    
  url: 'https://httpbin.org/post',    
  maxFilesize: 5,    
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*'    
};
const routes:Routes=[
  {
    path: "", component: ProductsComponent,
    children: [
      { path: "productlist", component: ProductListComponent },
      { path: "product", component: ProductComponent },
      { path: "edit", component: EditComponent }
    ]
  },
]
@NgModule({
  declarations: [ ProductComponent,ProductListComponent, ProductsComponent, EditComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    CKEditorModule,
    DropzoneModule,
    DropzoneModule,
    NgxPaginationModule,
    AdminPaginationModule
  ],
  providers: [    
    {    
      provide: DROPZONE_CONFIG,    
      useValue: DROPZONECONFIG    
    }    
  ], 

})
export class ProductsModule { }
