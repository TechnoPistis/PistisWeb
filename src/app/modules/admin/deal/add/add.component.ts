import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { DealsService } from '../deal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductlistService } from 'src/app/shared/components/productlist/productlist.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  public invalidMoment = new Date(2018, 1, 11, 9, 30);
  public min = new Date();
  SubCategoryName: any;
  constructor(
    private _productService: ProductService,
    private _productListService: ProductlistService,
    private _service: DealsService,
    private _router: Router,
    private toastr: ToastrService,
    public _ProductService: ProductService,
  ) { }

  addForm: FormGroup;
  Products: any[] = [];
  SelectedProducts: any[] = [];
  today: any = new Date();
    
  ngOnInit() {

    this.addForm = this.createFormGroup();
    this.getVariants();
    this.allStatus();
      
    if (JSON.parse(localStorage.getItem('DealData'))) {
      var formdata = JSON.parse(localStorage.getItem('DealData'));
      this.CategoryName = formdata.CategoryName;
      this.addForm.patchValue(formdata);
      this.GetProductCategory(formdata.ProductCategoryId);
      this.getSubCategoriesByCategory(formdata.CategoryId);
      this.SelectedProducts = JSON.parse(localStorage.getItem('SelectedProducts'));
        

    }
  }

  statusOptions: any[] = [];
  ProductCategories: any[] = [];
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
  }

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      CategoryId: new FormControl('', [Validators.required]),
      ActiveTo: new FormControl('', [Validators.required]),
      ActiveFrom: new FormControl('', [Validators.required]),
      Discount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      DealQty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Status: new FormControl('open', [Validators.required]),
      RegularPrice: new FormControl(''),
      IsActive: new FormControl(false),
      IsFeatured: new FormControl(false),
      QuantityPerUser: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Name: new FormControl('', [Validators.required]),
      ActiveFromTime: new FormControl('', [Validators.required]),
      ActiveToTime: new FormControl('', [Validators.required]),
      ProductCategoryId: new FormControl('', [Validators.required]),
      IsShow: new FormControl('',[Validators.required])
    });
  }

  getVariants() {
    this._productService.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
        this.ProductCategories = data;
      }
    })
  }


  RegularPrice: any = null;
  CategoryName: string;

  getPrice(id: any) {
      
   
    if (id) {
      var data = this.Products.find(v => v.Id == id);
      if (data) {
        this.addForm.patchValue({ RegularPrice: data.Price });
      }
    }
    //this.GetProductCategory(id);
  }


  onSubmit(event: any) {
      
    if (!this.addForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }
      
    var model = this.addForm.value;
    model.SoldQty = 0;
    model.Id = 0;
    model.SubCategoryName=this.SubCategoryName
    model.CategoryName = this.CategoryName;
    localStorage.removeItem('DealData');
    localStorage.removeItem('SelectedProducts');
    localStorage.setItem('DealData', JSON.stringify(model));
    localStorage.setItem('SelectedProducts', JSON.stringify(this.SelectedProducts));
    localStorage.setItem('Add', 'Add');
    this._router.navigate(['/admin/deals/preview']);
  }

  GetProductCategory(id: number) {
      
    this.Categories.filter(x => x.Id == id).map(m => {
      this.SubCategoryName = m.Name;
    });

      
    this._service.GetProductVariantDetails(id,0).subscribe((response: any) => {
        
      if (this.SelectedProducts.length > 0) {
        response.map(m => {
            
          var data = this.SelectedProducts.filter(x => x.Id == m.Id);
          if (data.length > 0) {
            m.Selected = true;
          }
        });
      }
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
      
      //var i = this.SelectedProducts.indexOf(this.Products[index]);
      if (index > -1) {
        var data=  this.SelectedProducts.filter(x => x.Id == Id);
        this.SelectedProducts=this.SelectedProducts.filter(x => x.Id != Id);
        //this.SelectedProducts.indexOf( this.SelectedProducts)
        //this.SelectedProducts.splice(index, 1);
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
        }
      })
    }
  }

}
