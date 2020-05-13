import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service';
import { NgForm, Validator, FormGroup, FormControl, Validators } from '@angular/forms';
import { VariantService } from '../variants.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-variants',
  templateUrl: './add-variants.component.html',
  styleUrls: ['./add-variants.component.css']
})
export class AddVariantsComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _service: VariantService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  MainSelected: boolean;
  addForm: FormGroup;

  ngOnInit() {
      
    this.addForm = this.createFormGroup();
    this.getCategories();
  }

  Categories: any[] = [];

  getCategories() {
    this._productService.getSubcategories().subscribe((data: any) => {
        
      this.Categories = [];
      this.Categories = data;
    })
  }


  checkMainSelected(event: any) {
      
    if (event.target.value) {
      this._service.checkMainSelected(event.target.value).subscribe((data: any) => {
          
        this.MainSelected = data;
      })
    }
  }

  checkExistingName() {
      
    let name=this.addForm.controls['Name'].value;
    let catId=this.addForm.controls['CategoryId'].value;
    let variantId=0;
    if (name && catId) {
      this._service.checkExistingName(name,catId,variantId).subscribe((data: any) => {
          
        if(data){
          this.toastr.error('Variant already exist for this category!');
          this.addForm.patchValue({Name:''});
          return false;
        }
      })
    }
  }

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', [Validators.required]),
      CategoryId: new FormControl('', [Validators.required]),
      VariantOptions: new FormControl(''),
      AllOptions: new FormControl('', [Validators.required]),
      IsSearchOption: new FormControl(false),
      IsMain: new FormControl(false),
    });
  }


  async onSubmit(event:any) {
      
    $('#submitButton').attr('disable');
    await this.checkExistingName();
    
    if (!this.addForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }
      
    var model = this.addForm.value;
    if (this.MainSelected == true)
      model.IsMain = false;
    model.Id = 0;
    this._service.addVariant(model).subscribe((data: any) => {
        
      if (data === true)
        this.toastr.success('Variant added successfully !');
      this._router.navigate(['/admin/variants']);
    })
  }
}
