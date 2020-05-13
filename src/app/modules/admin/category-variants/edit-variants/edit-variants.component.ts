import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VariantService } from '../variants.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-variants',
  templateUrl: './edit-variants.component.html',
  styleUrls: ['./edit-variants.component.css']
})
export class EditVariantsComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private _service: VariantService,
    private _router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private toastr: ToastrService

  ) { }

  IsMain: boolean;
  MainSelected: boolean;
  catVariantId: any;
  variantData: any;
  variantId: any;
  Categories: any[] = [];

  ngOnInit() {
      
    this.route.queryParams.subscribe(params => {
      this.catVariantId = +params['Id'] || 0;
    });
    this.getCategories();
    this.editForm = this.createFormGroup();
    if (this.catVariantId && this.catVariantId > 0) {
      this.getVariantData();
    }
  }


  checkExistingName() {
      
    let name = this.editForm.controls['Name'].value;
    let catId = this.editForm.controls['CategoryId'].value;
    if (name && catId && this.variantId) {
      this._service.checkExistingName(name, catId, this.variantId).subscribe((data: any) => {
          
        if (data) {
          this.toastr.error('Variant already exist for this category!');
          this.editForm.patchValue({ Name: this.variantData.Name });
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

  getVariantData() {
    if (this.catVariantId) {
      this._service.getVariantById(this.catVariantId).subscribe((data: any) => {
          
        this.IsMain = data.IsMain;
        this.MainSelected = data.MainSelected;
        this.variantData = data.VariantData;
        this.variantData.CategoryId = data.ProductCategory.Id;
        this.variantData.IsSearchOption = data.IsSearchOption;
        this.variantData.IsMain = data.IsMain;
        this.variantId = data.VariantId;
        var options = [];
        data.VariantData.VariantOptions.forEach(element => {
          if (element.Name)
            options.push(element.Name);
        });
        this.variantData.AllOptions = options.join(',');
        this.editForm.patchValue(this.variantData);
      })
    }
  }



  getCategories() {
    this._productService.getSubcategories().subscribe((data: any) => {
      this.Categories = [];
      this.Categories = data;
    })
  }


  async onSubmit() {
    await this.checkExistingName();
      
    if (!this.editForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }

    var model = this.editForm.value;
    model.Id = this.catVariantId;
    model.VariantId=this.variantId;
    this._service.updateVariant(model).subscribe((data: any) => {
        
      if (data === true)
        this.toastr.success('Variant updated successfully !');
      this._router.navigate(['/admin/variants']);
    })
  }

}
