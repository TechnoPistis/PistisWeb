import { Component, OnInit } from '@angular/core';
import { VariantService } from '../variants.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../products/product.service';


@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit {


  variantList: any[] = [];

  constructor(
    private _service: VariantService,
    private _router: Router,
    private toastr: ToastrService,
    private _productService: ProductService
  ) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;
  categoryId:any;

  ngOnInit() {
      
    this.page = 1;
    this.pageSize = 10;
    this.getAllVariants();
    this.getCategories();
  }

  filterVariants(value) {
      
    this.page=1;
    this.categoryId=value;
    this.getAllVariants();
  }

  Categories: any[] = [];

  getCategories() {
    this._productService.getSubcategories().subscribe((data: any) => {
        
      this.Categories = [];
      this.Categories = data;
    })
  }

  getAllVariants() {
    this._service.getAllVariants(this.page, this.pageSize, this.SearchName,this.categoryId).subscribe((response: any) => {
      this.variantList = response.data;
      this.count = response.count
    });
  }

  editVariant(id: any) {
    if (id) {
      this._router.navigate(['/admin/variants/edit'], { queryParams: { Id: id } });
    }
  }

  deleteVariant(id: any) {
    if (id) {
      if (confirm('Are you sure want to delete !')) {
        this._service.deleteVariant(id).subscribe((data: any) => {
            
          this.toastr.success('Deleted successfully !');
          this.getAllVariants();
        })
      }
    }
  }

  prevPage() {
    this.page = this.page - 1;
    this.getAllVariants();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getAllVariants();
  }
  goToPage(event) {
    this.page = event;
    this.getAllVariants();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getAllVariants();
  }

  search() {
    this.page = 1;
    this.getAllVariants();
  }

}
