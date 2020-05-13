import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { DealsService } from '../../deal/deal.service';
import { ToastrService } from 'ngx-toastr';
import { idLocale } from 'ngx-bootstrap/chronos/i18n/id';
import { spinnService } from '../spinn.service';
import { Spinn } from '../spinn';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-spin-options',
  templateUrl: './add-spin-options.component.html',
  styleUrls: ['./add-spin-options.component.css']
})
export class AddSpinOptionsComponent implements OnInit {
  ProductCategories: any[] = [];
  addForm: FormGroup;
  today: any = new Date();
  Categories = [];
  Products: any[] = [];
  Mood: any;
  ProductId: any = 0
  Id: number;
  CategoryId: any
  DisplayMessage: any
  Filterurl: any
  ActiveTo: any
  ActiveFrom: any
  DiscountPrice: any
  DiscountPercentage: any
  IsActive: any
  Description: any
  ActiveFromTime: any
  ActiveToTime: any
  Image: any
  MaxQty: any
  MoodId: any
  ProductCategoryId: any
  update:boolean=false
  save:boolean=true
  selected:number=0
  MoodSelected:number=0
  counter: any=0;
  constructor(private _productService: ProductService,
    private _service: DealsService,
    public _ProductService: ProductService,
    private toastr: ToastrService,
    public _spinService: spinnService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router) {
      this.addForm = this.createFormGroup();
     }

  ngOnInit() {
      
    this.route.queryParams.subscribe(params => {
      this.Id = +params['Id'] || 0;

    });
    if (this.Id > 0) {
      this.update=true
      this.save=false
      this._spinService.getSpinnerOptiondetails(this.Id).subscribe((x:any) => {
            this.addForm.patchValue(x)
        //this.updateFormGroup()
        this.getVariants();
        this._spinService.getMood().subscribe(x => {
          this.Mood = x as []
        })
          

        if(x.CategoryId>0){
          this.getSubCategoriesByCategory(x.CategoryId)
if(x.ProductCategoryId>0){
    
  this.GetProductCategory(x.ProductCategoryId)
  if(x.ProductId>0){
      
    this.selected=x.ProductId
  }
 if(x.MoodId){
   this.MoodSelected=x.MoodId
 }
}
        }
      })
    } else {
   this.update=false
   this.save=true
      this.getVariants();
      this._spinService.getMood().subscribe(x => {
          
        this.Mood = x as []
      })
    }
  }
  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      CategoryId: new FormControl(0),
      DisplayMessage: new FormControl('', [Validators.required]),
      MoodId: new FormControl(''),
      //Filterurl: new FormControl(''),
      ActiveTo: new FormControl('', [Validators.required]),
      ActiveFrom: new FormControl('', [Validators.required]),
     // DiscountPrice: new FormControl(''),
      DiscountPercentage: new FormControl(''),
      IsActive: new FormControl(false),
      Description: new FormControl('', [Validators.required]),
      ActiveFromTime: new FormControl('', [Validators.required]),
      ActiveToTime: new FormControl('', [Validators.required]),
      ProductCategoryId: new FormControl(0),
      ProductId: new FormControl(''),
      //Image: new FormControl(''),
      MaxQty: new FormControl(1)
    });
  }
  updateFormGroup() {
      
    return this._spinService.getSpinnerOptiondetails(this.Id).subscribe((x: any) => {
      this.addForm.patchValue(x)
      //  new FormGroup({
      //   Id: new FormControl(this.Id),
      //   CategoryId: new FormControl(x.CategoryId),
      //   DisplayMessage: new FormControl(x.DisplayMessage),
      //  MoodId: new FormControl(x.MoodId),
      //   Filterurl: new FormControl(x.Filterurl),
      //   ActiveTo: new FormControl(x.ActiveTo),
      //   ActiveFrom: new FormControl(x.ActiveFrom),
      //   DiscountPrice: new FormControl(x.DiscountPrice),
      //   DiscountPercentage: new FormControl(x.DiscountPercentage),
      //   IsActive: new FormControl(x.IsActive),
      //   Description: new FormControl(x.Description),
      //   ActiveFromTime: new FormControl(x.ActiveFromTime),
      //   ActiveToTime: new FormControl(x.ActiveToTime),
      //   ProductCategoryId: new FormControl(x.ProductCategoryId),
      //   ProductId:new FormControl(x.ProductId),
      //   Image:new FormControl(x.Image),
      //   MaxQty:new FormControl(x.MaxQty)
      // });
    })

  }

  getVariants() {
    this._productService.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
        this.ProductCategories = data;
      }
    })
  }
  GetProductCategory(id: number) {
      
    this._service.GetProductVariantDetails1(+id).subscribe((response: any) => {
        

      this.Products = response;
      
    });
  }
  getSubCategoriesByCategory(id) {
      

    if (+id) {
      this._ProductService.getCategoryByParentId(id).subscribe((data: any) => {
          
        if (data && data.length > 0) {
          this.Categories = data;
        }
      })
    }
  }
  AddProdcut(Id, index, event) {
      
  
    if (event.currentTarget.checked) {
      this.ProductId = Id
      ++this.counter
      if(this.counter==1)
      this.toastr.info("One product for one spinner option")
    }else{
      --this.counter
    }
   

  }
  onSubmit(event: any) {
      
    // if (!this.addForm.valid) {
    //   this.toastr.clear();
    //   this.toastr.error('Fill the form first !');
    //   return false;
    // }
    if(this.Id){
     
        this.addForm.value.ProductId = this.ProductId
        var model = this.addForm.value
        var spinner = new Spinn();
        spinner.ProductId = +model.ProductId
        spinner.ProductCategoryId = +model.ProductCategoryId
        spinner.MoodId = +model.MoodId
        spinner.IsActive = model.IsActive
        spinner.MaxQty = model.MaxQty
        spinner.Image = model.Image
        spinner.Id = +model.Id
        spinner.Filterurl = model.Filterurl
        spinner.DisplayMessage = model.DisplayMessage
        spinner.DiscountPrice = +model.DiscountPrice
        spinner.DiscountPercentage = +model.DiscountPercentage
        spinner.Description = model.Description
        spinner.CategoryId = +model.CategoryId
        spinner.ActiveFroms = this.datepipe.transform(model.ActiveFrom, 'MM-dd-yyyy')
        spinner.ActiveTos =this.datepipe.transform(model.ActiveTo, 'MM-dd-yyyy')
        // spinner.ActiveFrom = new Date(this.datepipe.transform(model.ActiveFrom, 'MM-dd-yyyy'))
        // spinner.ActiveTo = new Date(this.datepipe.transform(model.ActiveTo, 'MM-dd-yyyy'))
        spinner.ActiveFromTime = model.ActiveFromTime
        spinner.ActiveToTime = model.ActiveToTime
        this._spinService.SaveSpinnerOptions(spinner).subscribe((x: any) => {
       
         if (x == 4) {
            this.toastr.success("Data updated successfully.")
            this.router.navigate(['/admin/SpinWheel/list']);
          }
          else {
            this.toastr.warning("Something went wrong.Try agian")
          }
        })
      
    }
   
    else{
    this.addForm.value.ProductId = this.ProductId
    var model = this.addForm.value
    var spinner = new Spinn();
    spinner.ProductId = +model.ProductId
    spinner.ProductCategoryId = +model.ProductCategoryId
    spinner.MoodId = +model.MoodId
    spinner.IsActive = model.IsActive
    spinner.MaxQty = model.MaxQty
    spinner.Image = model.Image
    spinner.Id = +model.Id
    spinner.Filterurl = model.Filterurl
    spinner.DisplayMessage = model.DisplayMessage
    spinner.DiscountPrice = +model.DiscountPrice
    spinner.DiscountPercentage = +model.DiscountPercentage
    spinner.Description = model.Description
    spinner.CategoryId = +model.CategoryId
    spinner.ActiveFroms = this.datepipe.transform(model.ActiveFrom, 'MM-dd-yyyy')
    spinner.ActiveTos =this.datepipe.transform(model.ActiveTo, 'MM-dd-yyyy')
    //spinner.ActiveFrom = new Date(this.datepipe.transform(model.ActiveFrom, 'MM-dd-yyyy').getTimezoneOffset())
    //spinner.ActiveTo = new Date(this.datepipe.transform(model.ActiveTo, 'MM-dd-yyyy'))
    spinner.ActiveFromTime = model.ActiveFromTime
    spinner.ActiveToTime = model.ActiveToTime
    this._spinService.SaveSpinnerOptions(spinner).subscribe((x: any) => {
      if (x == -1) {
        this.toastr.warning("Description already exists.")
      }
      else if (x == 0) {
        this.toastr.success("Data saved successfully.")
        this.router.navigate(['/admin/SpinWheel/list']);
      }
      else {
        this.toastr.warning("Something went wrong.Try agian")
      }
    })
  }
}
}

