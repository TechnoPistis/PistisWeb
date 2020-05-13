import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { EditComponent } from './edit/edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PreviewComponent } from './preview/preview.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';
const routes: Routes = [
  { path: "", component: ListComponent, pathMatch: 'full' },
  { path: "add", component: AddComponent },
  { path: "edit", component: EditComponent },
  { path: "preview", component: PreviewComponent },
]

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, PreviewComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    BsDatepickerModule.forRoot(),
    OwlDateTimeModule, OwlNativeDateTimeModule ,
    NgxMaterialTimepickerModule,
    AdminPaginationModule
  ]
})
export class DealModule { }
