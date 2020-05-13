import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalErrorHandlerService } from 'src/app/shared/services/global-error-handler-service.service';
// import { Product } from '../../../../shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { VariantService } from 'src/app/modules/admin/category-variants/variants.service';
import { searchFilter } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  variantList: any[] = [];
  public Products: any = [];
  Categories: [];
  Variants = [];
  SelectedCategory: 0;
  ProductCategories: any[];
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  variantModelArray = [];
  CategoryId:any=null
  SubCategoryId:any=null

searchFilter:searchFilter=new searchFilter

  variant_isDefault: boolean = true;
  selectedcat: number;
  selectedsubcat: number;
 
  constructor(public service: ProductService, private toaster: ToastrService,   private _variantService: VariantService
    , private error: GlobalErrorHandlerService, public translate: TranslateService, public Router: Router) {

  }

  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
      
  this.SearchName="";
  this.searchFilter.page=1
  this.searchFilter.pageSize=10;
  this.searchFilter.CategoryId=+(localStorage.getItem("CategoryId"))
  this.searchFilter.SubCategoryId=+(localStorage.getItem("SubCategoryId"))
  this.CategoryId=this.searchFilter.CategoryId==0?null:this.searchFilter.CategoryId;
  this.SubCategoryId=this.searchFilter.SubCategoryId==0?null:this.searchFilter.SubCategoryId
//if(this.searchFilter.CategoryId==0)
{
   // this.getCategories();
    this.getMainCategories()
}
this.getProducts();

  }
  
  getMainCategories() {
      
    this.service.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
          
        this.ProductCategories = data;
      }
    })
  }
  getSubCategoriesByCategory(id) {
      
    if (+id) {
      this.service.getCategoryByParentId(id).subscribe((data: any) => {
          
        if (data && data.length > 0) {
          this.Categories = data;
        }
      })
    }
  }
  getVariants(value: any) {
    if (value && value != null) {
      this._variantService.getVariantsByCategory(value).subscribe((data: any) => {
        this.variantList = [];
        this.variantModelArray = [];
        this.variantList = data;
        if (data.length > 0)
          this.Variants = [];
      })
    }
    else
      return false;
  }
 getproduct(){
      this.service.getProduct(this.page, this.pageSize,this.SearchName).subscribe((data: any) => {
        if(data!=null)
        {
      if (data.data) {
        this.Products = data.data;
        this.count = data.count;
      }
    }
    })
 }
  getProducts() {
      
    this.searchFilter.page=this.page
    this.searchFilter.pageSize=this.pageSize
    if(this.SearchName!=null)
    this.searchFilter.SearchName=this.SearchName
    if(this.CategoryId!=null)
    {
    this.searchFilter.CategoryId=this.CategoryId
    localStorage.setItem("CategoryId",this.searchFilter.CategoryId.toString())
    }
    else{
      localStorage.setItem("CategoryId","0")
    }
    if(this.SubCategoryId!=null)
    {
   this.searchFilter.SubCategoryId = this.SubCategoryId
   localStorage.setItem("SubCategoryId",this.searchFilter.SubCategoryId.toString())

    }
   if(this.searchFilter.SubCategoryId==null)
   {
   this.searchFilter.SubCategoryId=0;
   localStorage.setItem("SubCategoryId",this.searchFilter.SubCategoryId.toString())

   }
   if(this.variant_isDefault!=null)
   this.searchFilter.variant_isDefault= this.variant_isDefault
   
   //localStorage.setItem("SearchData",JSON.stringify(this.searchFilter))

   this.service.getProductfilter(   this.searchFilter).subscribe((data: any) => {
     if(data!=null)
     {
    if (data.data) {
      this.Products = data.data;
      this.count = data.count;
    }
  }
  })
    
  }
 //onEnable
 onEnable(id: number,val:number) {
  if(val==1){

  
 if (confirm('Are you want to enable this product?')) {

   this.service.enableProduct(id).subscribe(res => {
    this.getProducts();
     this.toaster.warning('Enabled successfully', 'product !');
   });
 }
}else{
 if (confirm('Are you want to disable this product?')) {

   this.service.disableProduct(id).subscribe(res => {
       
     this.toaster.warning('Disabled successfully', 'product !');

     this.getProducts();
   
   });
 }
}
}
  getCategories() {
    this.service.getSubcategories().subscribe(data => {
      var result = [];
      result.push(data);
      this.Categories = result[0];
    })
  }
  addProduct() {
    this.Router.navigate(['/vendor/products/add']);
  }
  editProduct(id: number) {    
    this.Router.navigate(['/vendor/products/edit'], { queryParams: { Id: id } });
  }

  ViewProduct(id: number) {
    this.Router.navigate(['/vendor/products/edit'], { queryParams: { Id: id, viewOnly: true } });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.service.deleteProduct(id).subscribe(res => {
        this.service.getProduct(this.page, this.pageSize,this.SearchName).subscribe(data => {
          this.Products = data;
        })
        this.getProducts();
        this.toaster.success('Deleted successfully', 'Category !');
      });
    }
  }

  openFilter() {
    this.SelectedCategory = 0;
  }

  filter(ProductCategoryId: number, Availability: string) {
    this.service.getFilterProducts(ProductCategoryId, Availability).subscribe(data => {
      this.Products = data;
    })
  }
  
  SearchByName(SearchName: string) {
    this.service.getProductsByName(SearchName).subscribe(data => {
      this.Products = data;
    })
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

  searchProduct(){
    this.page=1;
    this.getProducts();
  }
refresh(){
    
  localStorage.setItem("CategoryId","0")
  localStorage.setItem("SubCategoryId","0")
  this.searchFilter=new searchFilter()
  this.SubCategoryId=null;
  this.CategoryId=null;
  this.page=1;
  this.getCategories();
  this.getMainCategories();
  this.getProducts();
}
}
