import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { VendorPaginationModule } from '../vendor-pagination/vendor-pagination.module';
import { ProfileComponent } from './profile.component';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
const DROPZONECONFIG: DropzoneConfigInterface = {    
  url: 'https://httpbin.org/post',    
  maxFilesize: 5,    
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*'    
};

const routes: Routes = [
  { path: "", component: ProfileComponent },
 
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    NgxPaginationModule,
    VendorPaginationModule,
    DropzoneModule
  ],
  exports: [
    
    CommonModule
  ],
  providers: [    
    {    
      provide: DROPZONE_CONFIG,    
      useValue: DROPZONECONFIG    
    }    
  ]
})

export class ProfileModule { }
