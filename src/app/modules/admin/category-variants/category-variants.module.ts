import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantsComponent } from './variants/variants.component';
import { AddVariantsComponent } from './add-variants/add-variants.component';
import { EditVariantsComponent } from './edit-variants/edit-variants.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AdminModule } from '../admin.module';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';


const routes: Routes = [
  { path: "", component: VariantsComponent,pathMatch:'full' },
  { path: "add", component: AddVariantsComponent },
  { path: "edit", component: EditVariantsComponent },
]

@NgModule({
  declarations: [VariantsComponent, AddVariantsComponent, EditVariantsComponent],
  imports: [
    AdminPaginationModule,
    CommonModule,RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    DropzoneModule
  ]
})
export class CategoryVariantsModule { }
