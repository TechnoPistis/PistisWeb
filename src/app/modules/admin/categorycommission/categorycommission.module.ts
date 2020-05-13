import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPaginationModule } from '../admin-pagination/admin-pagination.module';

const routes: Routes = [
  {path:'', component:ListComponent},
  {path:'add',component:AddComponent}
]

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPaginationModule
  ]
})
export class CategorycommissionModule { }
