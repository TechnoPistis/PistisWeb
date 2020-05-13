import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service';
import { DealsService } from '../deal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  dealId: any;
  editForm: FormGroup;
  Products: any[] = [];
  SelectedProducts: any[] = [];
  DealProduct: any[] = [];
  CategoryName;
  ProductCategories: any[] = [];
  RegularPrice: any = null;
  today = new Date();
  isData: boolean = false;
  SubCategoryName: any;
  constructor(
    private _productService: ProductService,
    private _service: DealsService,
    private _router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public _ProductService: ProductService,
  ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.dealId = +params['Id'] || 0;
    });

    this.editForm = this.createFormGroup();

    if (this.dealId && this.dealId > 0) {
      this.allStatus();
    }

    this.getVariants();
    this.dealData();
  }

  dealData() {
    
    if (this.dealId) {
      this._service.getDealById(this.dealId).subscribe((data: any) => {
  
        if (data && data.Id > 0) {
          if (data.ProductVariantId) {
            this.getPrice(data.ProductVariantId);
            var model = {
              Id: data.Id,
              ProductVariantId: data.ProductVariantId,
              ActiveFrom: data.ActiveFrom,
              ActiveTo: data.ActiveTo,
              RegularPrice: this.editForm.controls['RegularPrice'].value,
              DealPrice: data.DealPrice,
              DealQty: data.DealQty,
              Status: data.Status,
              IsFeatured: data.IsFeatured,
              IsShow:data.IsShow,
              SubCategoryName:data.SubCategoryName,
            };
            this.editForm.patchValue(model);

            this.isData = true;
          }
          this.DealProduct = data.DealProduct;
          this.GetProductCategory(data.ProductCategoryId);
          this.getSubCategoriesByCategory(data.CategoryId);
          
          this.ProductCategories.filter(x => x.Id == data.CategoryId).map(m => {
            this.CategoryName = m.Name;
          });
       
      
          this.editForm.patchValue(data);
        }
        else {
          this._router.navigate(['/admin/deals']);
        }
      })
    }
  }

  statusOptions: any[] = [];
  Categories = [];
  allStatus() {
    var model = {
      status: "Open",
      value: "open"
    }
    var model1 = {
      status: "Closed",
      value: "closed"
    }
    this.statusOptions.push(model);
    this.statusOptions.push(model1);
    this.getVariants();
  }

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      CategoryId: new FormControl('', [Validators.required]),
      ActiveTo: new FormControl('', [Validators.required]),
      ActiveFrom: new FormControl('', [Validators.required]),
      ActiveFromTime: new FormControl('', [Validators.required]),
      ActiveToTime: new FormControl('', [Validators.required]),
      Discount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      DealQty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Status: new FormControl('open', [Validators.required]),
      RegularPrice: new FormControl(''),
      IsActive: new FormControl(false),
      IsFeatured: new FormControl(false),
      IsShow: new FormControl(false),
      

      QuantityPerUser: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Name: new FormControl('', [Validators.required]),
      ProductCategoryId: new FormControl('', [Validators.required]),

    });
  }

  getVariants() {
    this._productService.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
        
        this.ProductCategories = data;
      }
    })
  }

  getPrice(id: any) {
    
    this.ProductCategories.filter(x => x.Id == id).map(m => {
      this.CategoryName = m.Name;
    });

    if (id && this.Products.length > 0) {
      var data = this.Products.find(v => v.Id == id);
      if (data) {
        this.editForm.patchValue({ RegularPrice: data.Price });
      }
    }
  }

  onSubmit(event: any) {
    if (!this.editForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }

    var model = this.editForm.value;
    model.SubCategoryName=this.SubCategoryName

    model.CategoryName = this.CategoryName;
    localStorage.removeItem('DealData');
    localStorage.removeItem('SelectedProducts');
    localStorage.setItem('DealData', JSON.stringify(model));
    localStorage.setItem('Update', 'Update');
    localStorage.setItem('SelectedProducts', JSON.stringify(this.SelectedProducts));
    this._router.navigate(['/admin/deals/preview']);
  }

  GetProductCategory(id: number) {
      
    this._service.GetProductVariantDetails(id,this.dealId).subscribe((response: any) => {
      
      if (this.DealProduct.length > 0) {
        
        response.map(m => {
          

          var data = this.DealProduct.filter(x => x.ProductVariantId == m.Id);
          if (data.length > 0) {
            m.Selected = true;
            m.DealId = this.DealProduct[0].DealId;
            this.SelectedProducts.push(m);
          }
        });
      }
        
      // if(this.SelectedProducts!=null || this.SelectedProducts!=[])
      // this.Products=this.SelectedProducts
      // else
      this.Products = response;
    });
  }

  AddProdcut(Id, index, event) {
      
    if (event.currentTarget.checked) {
      var category = this.Products[index];
      category.Selected = true;
      this.SelectedProducts.push(category);
    }
    else {
      var i = this.SelectedProducts.indexOf(this.Products[index]);
      if (i > -1) {
        this.SelectedProducts.splice(i, 1);
      }
    }
  }

  getSubCategoriesByCategory(id) {
    
    this.ProductCategories.filter(x => x.Id == id).map(m => {
      this.CategoryName = m.Name;
    });
      
    if (+id) {
      this._ProductService.getCategoryByParentId(id).subscribe((data: any) => {
        
        if (data && data.length > 0) {
            
          this.Categories = data;
        

          
         console.log(this.Categories)

        }
      })
    }
  }
  showMsg(){
    this.toastr.warning("This item is already included in some other deal.")
  }
}
