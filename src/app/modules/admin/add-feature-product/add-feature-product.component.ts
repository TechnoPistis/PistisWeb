import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { FeatureProductService } from "./feature-product.service";
import { FeatureProduct } from "./feature-product";
import { ProductService } from '../products/product.service';
import { VariantService } from '../category-variants/variants.service';
@Component({
  selector: 'app-add-feature-product',
  templateUrl: './add-feature-product.component.html',
  styleUrls: ['./add-feature-product.component.css']
})
export class AddFeatureProductComponent implements OnInit {
  
  cat: FeatureProduct;
  dataList: any;
  Categories: [];
id:number;
variantList: any[] = [];
Variants = [];
CategoryId:any=null
SubCategoryId:any=null
SelectedCategory: 0;
ProductCategories: any[];
  variantModelArray: any[]=[];
  ProductId:any=null
 
  public Products: any = [];
  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute
    ,public service:FeatureProductService,public _service: ProductService, private _variantService: VariantService) { }
    
  ngOnInit() {
   
    this.getMainCategories()
    this.resetForm();
      this.service.refreshList().then(data=>{ 
        this.dataList=data;
         this.route.queryParams.subscribe(params => {
        this.id = params['Id'];
        if(this.id>0){
        this.cat= this.service.getProduct(this.id);
      this.populateForm(this.cat);
        }
    })
  })
  }
  getVariants(value: any) {
    if (value && value != null) {
      // this._variantService.getVariantsByCategory(value).subscribe((data: any) => {
      //   this.variantList = [];
      //   this.variantModelArray = [];
      //   this.variantList = data;
      //   if (data.length > 0)
      //     this.Variants = [];
      // })
      this.getProducts()
    }
    else
      return false;
  }
  getSubCategoriesByCategory(id) {
      
    if (+id) {
      this._service.getCategoryByParentId(id).subscribe((data: any) => {
          
        if (data && data.length > 0) {
          this.Categories = data;
        }
      })
    }
  }
  getMainCategories() {
      
    this._service.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
          
        this.ProductCategories = data;
      }
    })
  }

  populateForm(cat:  FeatureProduct) {
   // alert(JSON.stringify(cat));
    
    this.service.formData = Object.assign({}, cat);
    this.service.formData.ProductId=this.id
  }
  onClick(){
    this.Router.navigate(['/admin/FeatureProducts']);
  }
  //submit
  // onSubmit(form: NgForm) {
    
  //   if (form.value.Id == null)
  //     this.insertRecord(form);
  //   else
  //     this.updateRecord(form);
  // }

  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.formData={
        Id:null,
      Name:'',
       Url:"",
       ProductId:0,Product:[]
      }

  }

  //delete
onDelete(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
  
    this.service.deleteCategory(id).subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Category !');
    });
  }

}

//updateRecord
updateRecord(form: NgForm) {

  this.service.updateCategory(form.value)
  .subscribe(res => {
    this.toastr.info('Updated successfully', 'Feature Product !');
    this.resetForm(form);
    this.service.refreshList();
    this.Router.navigate(['/admin/FeatureProducts']);
    
  });
}
//insertRecord 
insertRecord() {
 
this.service.postCategory(this.ProductId).subscribe((res:any) => {
  if(res.Id==1){
  this.toastr.success('Inserted successfully', 'Feature Product !');

this.service.refreshList();
this.Router.navigate(['/admin/FeatureProducts']);
  }
  else{
    this.toastr.warning('Already added to feature products!');
  }
});
}


getProducts() {
    
let searchFilter:any={
  CategoryId:0,
  SubCategoryId:0
}

 // this.searchFilter.page=this.page
 // this.searchFilter.pageSize=this.pageSize
  //if(this.SearchName!=null)
 // this.searchFilter.SearchName=this.SearchName
  if(this.CategoryId!=null)
  searchFilter.CategoryId=this.CategoryId
  if(this.CategoryId==null)
  searchFilter.CategoryId=0
 searchFilter.SubCategoryId = this.SubCategoryId
 if(this.SubCategoryId==null)
  searchFilter.SubCategoryId=0

//  if(this.variant_isDefault!=null)
//  searchFilter.variant_isDefault= this.variant_isDefault

 this.service.getProductfilter(searchFilter).subscribe((data: any) => {
     
 
      
    this.Products = data as [];
   // this.count = data.count;
 
})
}
}
