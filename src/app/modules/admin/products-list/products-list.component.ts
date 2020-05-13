import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../product-category/category.service";
import { Category } from '../product-category/category';
import { ListService } from './list.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Attribute } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public dataList: any = [];
  public List: any = [];
  selectedVal: string;
  constructor(private srevice: ListService, private toastr: ToastrService
    , private Router: Router,private http:HttpClient) {

  }

  ngOnInit() {
    this.srevice.refreshList().subscribe(data => {
      ;
      this.dataList = data;
//alert(this.dataList)
    }
    );
  }
  getChild(id:number){
    this.Router.navigate(['/admin/SubMenu'], { queryParams: { Id: id } });
  }

  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {

      this.srevice.deleteCategory(id).subscribe(res => {
        this.srevice.refreshList().subscribe(data => {
          ;
          this.dataList = data;
        });
        this.toastr.warning('Deleted successfully', 'Category !');
      });
    }
  }
  onEdit(id: number) {

    this.Router.navigate(['/admin/category/'], { queryParams: { Id: id } });
  }
  onClick() {
    this.Router.navigate(['/admin/category']);
  }


}
