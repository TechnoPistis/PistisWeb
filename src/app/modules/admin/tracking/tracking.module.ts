import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { AdminModule } from '../admin.module';
import { CommonModule } from '@angular/common';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';


const routes: Routes = [
  { path: "", component: ListComponent, pathMatch: 'full' },
  { path: "update", component: UpdateComponent },
  { path: "view", component: ViewComponent },
]

@NgModule({
  declarations: [ListComponent, UpdateComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    AdminPaginationModule
  ]
})
export class TrackingModule { }
