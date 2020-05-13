import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeatureProduct } from '../add-feature-product/feature-product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-feature-product',
  templateUrl: './list-feature-product.component.html',
  styleUrls: ['./list-feature-product.component.css']
})




export class ListFeatureProductComponent implements OnInit {
  list: FeatureProduct[]
  public dataList: any = [];
  selectedVal: string;
  constructor(private srevice: ListService, private toastr: ToastrService
    , private Router: Router) {

  }

  count: number = 0; page: number = 1; perPage: number = 8; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    // this.resetForm();
    this.getProducts();

  }
  getProducts() {
      
    this.srevice.refreshList1().subscribe((res: any) => {
      if (res.length > 0){
          
        this.list = res as FeatureProduct[];
        console.log(this.list)
        this.count = res.count;
      }
    }
    );
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.srevice.formData = {
      Id: null,
      Name: '',
      Product: [],
      ProductId: null,
      Url: ""
    }

  }
  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {

      this.srevice.deleteFeatureProduct(id).subscribe(res => {
        this.getProducts();
        this.toastr.warning('Deleted successfully', 'Feature Product  !');
      });
    }
  }
  onEdit(id: number) {
    this.Router.navigate(['/admin/add_Feature_product/'], { queryParams: { Id: id } });
  }
  onClick() {
    this.Router.navigate(['/admin/add_Feature_product']);
  }


  prevPage() {
    this.page = this.page - 1;
    this.getProducts();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getProducts();
  }
  goToPage(event) {
    this.page = event;
    this.getProducts();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getProducts();
  }

  search(){
    this.page=1;
    this.getProducts();
  }

}
