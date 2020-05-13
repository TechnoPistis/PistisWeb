import { Component, OnInit, DebugElement, ViewChild } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DropzoneModule, DropzoneConfig, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { map } from 'rxjs/operators';
import { errorComparator } from 'tslint/lib/verify/lintError';
import { VariantService } from 'src/app/modules/admin/category-variants/variants.service';
import { ProductService } from '../product.service';
import { Product, Variant, ProductVariantDetails, ProductVariantOptions, ProductImages, ProductSpecification } from '../product.model';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Categories = [];
  isDefaultImage: boolean = false;
  ProductSKU1: any;
  Weight: any;
  Lenght: any
  Width: any
  Height: any
  Weight1: any;
  showoptionerr: boolean;
  showpriceerr: boolean;
  showquantityerr: boolean;
  showskuerr: boolean;
  showweighterr: boolean;
  showcosterr: boolean;
  showdiscountpriceerr: boolean;
  ProductCategories: any[];
  ShippmentCost: any = 1
  ShippmentTime: any;
  constructor(
    private _variantService: VariantService,
    public service: ProductService, public toastr: ToastrService, public Router: Router, private route: ActivatedRoute
  ) { }
  id: any;
  editproduct: Product;
  i: any;
  SelectedImageVariant: any;
  Shipchecked: boolean = false
  varii: Variant;
  variantsData: Variant[] = [];
  selectedVariant: any[] = [];
  showVari: any[] = [];
  variantList: any[] = [];
  imageList: any[] = [];
  config: any;
  VendorId: any;
  vendor: any;
  Shiptime = false
  ngOnInit() {
    this.getMainCategories();
    this.getAllVendors();
    this.resetForm();
    //this.getSubCategories();
    this.editoptions = [];
    this.resetUpdateColumn();
  }

  @ViewChild(DropzoneComponent,{static:false}) componentRef?: DropzoneComponent;



  getAllVendors() {

    this.service.getVendor().subscribe((data: any) => {
      this.vendor = data;

    })
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


  getSubCategories() {
    this.service.getSubcategories().subscribe(data => {
      var result = [];
      result.push(data);
      this.Categories = result[0];
    })
  }

  onSubmit(form: NgForm) {
      

    if (form.value.Id == null)
      this.addProduct(form);
  }

  addProduct(form: NgForm) {
    if (this.Shipchecked)	{
      if(this.ShippmentTime){
    if (this.ShippmentTime > 45 || this.ShippmentTime == 0 ) {	
      this.toastr.info("Shipment days should be between 1 to 45.")
      return false	
    } else {	
      this.Shiptime = false	
    }
  }else{
    this.Shiptime = true	
    return false;
  }
}
      
    if (!form.valid) {
      this.toastr.clear();
      this.toastr.error('Invalid form!');
      return false;
    }

    if ((!this.variantModelArray) || (this.variantModelArray.length <= 0)) {
      this.toastr.clear();
      this.toastr.error('Enter some variants for this product!');
      return false;
    }
    if (this.imageList.length <= 0) {
      this.toastr.clear();
      this.toastr.error('Enter one image atleast!');
      return false;
    }

    //---------getting data from groups to list
    this.imageVariants = [];
    this.imageList.forEach(element => {
      element.images.forEach(ele => {
        this.imageVariants.push(ele);
      });
    });


    var model = new Product();
    model.ProductVariantDetails = [];
    this.variantModelArray.forEach(element => {
      var data = new ProductVariantDetails();
      data.Price = element.price;
      data.InStock = element.quantity;
      data.CostPrice = element.CostPrice;
      data.Discount = +element.Discount;
      data.PriceAfterdiscount = element.PriceAfterdiscount;
      data.IsActive = true;
      data.IsDefault = element.isDefault;
      data.ProductSKU = element.ProductSKU1;
      data.Weight = element.Weight1;
      data.Lenght = element.Lenght
      data.Width = element.Width
      data.Height = element.Height
      if (element.Specification && element.Specification.length > 0) {
        data.ProductSpecifications = [];
        element.Specification.forEach(spec => {
          var sp = {
            HeadingName: spec.Heading,
            Description: spec.Description,
          }
          data.ProductSpecifications.push(sp);
        });
      }

      model.ProductVariantDetails.push(data);
      data.ProductVariantOptions = [];

      var variants = element.variants.split('|');
      variants.forEach(element1 => {
        var options = new ProductVariantOptions();
        options.IsActive = true;
        options.ProductVariantDetailId = 0;
        var ele = element1.split(':');
        this.variantList.forEach(element2 => {
          if (element2.VariantData.Name === ele[0]) {
            options.CategoryVariantId = element2.Id;
            var option = element2.VariantData.VariantOptions.filter(c => c.Name == ele[1])[0];
            options.VariantOptionId = option.Id;
            data.ProductVariantOptions.push(options);
            data.ProductImages = [];
            this.imageVariants.forEach(img => {
              if (img.variants === element.variants) {
                var pp = new ProductImages();
                pp.ImagePath = img.image;
                pp.IsDefault = img.isdefaultimage;
                data.ProductImages.push(pp);
              }
            })
          }
        });
      });
    });

    model.ProductSpecifications = [];
    this.specification.forEach(element => {
      var specs = new ProductSpecification();
      specs.HeadingName = element.SpecificationHeading;
      specs.Description = element.specification;
      model.ProductSpecifications.push(specs);
    });

    model.Description = form.value.Description;
    //model.Discount = form.value.Discount;
    model.Name = form.value.Name;
      
    if (this.Shipchecked) {
      model.ShipmentVendor = this.Shipchecked
      model.ShipmentTime = this.ShippmentTime
      model.ShipmentCost = this.ShippmentCost
    } else {
      model.ShipmentVendor = false

    }

    //model.SellingPrice = form.value.SellingPrice;
    //model.PriceAfterDiscount = form.value.PriceAfterDiscount;
    model.ProductCategoryId = form.value.ProductCategoryId;
    model.ProductTags = form.value.ProductTags;
    //model.CostPrice = form.value.CostPrice;
    let Id = +localStorage.getItem("UserId");

    model.VendorId = Id;


    this.service.addProduct(model).subscribe(res => {
      console.log(res)
      this.toastr.success('Product added successfully !');
      this.resetForm(form);
      this.Router.navigate(['/vendor/products']);
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      MainCategoryId: null,
      Name: '',
      ProductCategoryId: null,
      VendorId: null,
      UnitId: null,
      //CostPrice: null,
      // CostPrice1: 0,
      //SellingPrice: 0,
      //Discount: null,
      // Discount1: 0,
      //PriceAfterDiscount: null,
      // PriceAfterDiscount1: 0,
      Description: '',
      ProductTags: '',
      Barcode: '',
      //unit
      UnitName: '',
      FinalVariants: [],
      VariantModels: [],
      VariantImages: [],
      FileUploads: [],
      Inventory: '',
      Image: '',
      ProductCategoryName: '',
      Specification: '',
      SpecificationHeading: '',
      ProductSpecifications: [],
      ProductionSpecifications: [],
      ProductVariantDetails: [],
      ProductImages: [],
      ShipmentCost: 0,
      ShipmentTime: 1,
      ShipmentVendor: false
      // VendorId: null
    }
  }

  //variants
  optionDefault: boolean = false;
  selectedItem: any;
  public show: boolean = false;
  public buttonName: any = 'Add Variant';
  options = [];
  optionsSpecs = [];
  optionValues = [];
  Variants = [];
  specification = []
  variantValues = [];
  public vari: any[] = [];


  stage = null;
  stage1 = null;
  Variant = {
    init: function (option, optionvalue, isdefault) {
      this.option = option;
      this.optionvalue = optionvalue;
      if (isdefault == "on")
        this.isdefault = true;
      else
        this.isdefault = false;

    },
  }
  //specification model
  public SpecificationHeading: string; Specification: string;
  SpecificationModel = {
    init: function (SpecificationHeading, Specification) {
      this.specification = Specification;
      this.SpecificationHeading = SpecificationHeading
    }
  }

  addOption() {

    let newItemNo = this.options.length + 1;
    this.options.push({ 'id': 'option' + newItemNo });
    //$scope.preventDefault();
  }


  toggle() {
    this.show = !this.show;
    if (this.options.length == 0)
      this.addOption();
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Cancel";
    else
      this.buttonName = "Add Variant";
  }

  deleteRow(index: number, option: any) {

    let data = this.options[index];
    var vIndex = this.Variants.indexOf(this.Variants.filter((item) => item.option == option)[0]);
    if (vIndex !== -1) {
      this.Variants.splice(vIndex, 1);
    }
    this.options.splice(index, 1);
    // if (this.Variants.some((item) => item.option == option)) {
    //   var i = this.Variants.indexOf((item) => item.option == option)
    //   this.Variants.splice(i, 1);
    // }
  }

  deleteRowSpec(index: number, option: any) {

    let data = this.optionsSpecs[index];
    var vIndex = this.specification.indexOf(this.specification.filter((item) => item.optionsSpecs == option)[0]);
    if (vIndex !== -1) {
      this.specification.splice(vIndex, 1);
    }
    this.optionsSpecs.splice(index, 1);
  }


  getVariants(value: any) {
    if (value && value != null) {
      this._variantService.getVariantsByCategory(value).subscribe((data: any) => {
        this.variantList = [];
        this.variantModelArray = [];
        this.variantList = data;
        if (data.length > 0)
          this.bindVariants();
        else
          this.Variants = [];
      })
    }
    else
      return false;
  }

  bindVariants() {

    this.show = true;
    var option = "";
    var isdefault = false;
    this.Variants = [];
    this.options = [];
    this.options = this.variantList;
    this.variantList.forEach(element => {
      option = element.VariantData.Name;
      isdefault = element.VariantData.IsSearchOption;
      this.optionValues = [];
      element.VariantData.VariantOptions.forEach(ele => {
        if (ele.Name)
          this.optionValues.push(ele.Name);
      });
      let variant1 = Object.create(this.Variant);
      variant1.init(option, this.optionValues, isdefault);
      if (!this.Variants.some((item) => item.option == variant1.option)) {
        this.Variants.push(variant1);
        this.varii = new Variant();
        this.varii.Name = variant1.option;
        this.varii.VariantOptionsModel = variant1.optionvalue;
        this.variantsData.push(this.varii);
      }
      else {
        let i = this.Variants.findIndex((item) => item.option == variant1.option);
        this.Variants.splice(i, 1);
        this.Variants.push(variant1);
        this.varii = new Variant();

        let j = this.variantsData.findIndex((item) => item.Name === variant1.option);
        this.variantsData.splice(j, 1);
        this.varii.Name = variant1.option;
        this.varii.VariantOptionsModel = variant1.optionvalue;
        this.variantsData.push(this.varii);
        //  alert(JSON.stringify(this.Variants))
      }
    });
  }

  onKeyPress1(SpecificationHeading: any, Specification: any, index: any) {
    // alert(SpecificationHeading)
    if (this.specification[index]) {
      this.specification[index].specification = Specification;
      this.specification[index].SpecificationHeading = SpecificationHeading;
    }
    else {
      let specification = Object.create(this.SpecificationModel)
      specification.init(SpecificationHeading, Specification)
      this.specification.push(specification);
    }
  }


  saveEditVariants(form: NgForm) {

    if (this.options.length !== this.edit_vari.length || (!this.edit_variant_price) || (!this.edit_variant_quantity)) {
      this.toastr.clear();
      this.toastr.error('Fill All fields to add new variants!');
      return false;
    }
    var variant1 = Object.create(this.variantModel);
    // for (let a = 0; a < this.options.length; a++) {
    //   this.edit_vari.push(this.editoptions[a])
    // }

    var AllVarData = [];
    this.edit_vari.forEach(data => {
      this.Variants.forEach(element => {
        element.optionvalue.forEach(value => {
          if (value === data) {
            var res = element.option + ":" + value;
            AllVarData.push(res);
          }
        });
      });
    });

    this.showVari = [];
    this.showVari = this.edit_vari;
    if (this.showVari.length === AllVarData.length) {
      this.showVari = [];
      this.showVari = AllVarData;
    }

    variant1.init(this.showVari.join('|'), this.edit_variant_price, this.edit_variant_quantity, this.edit_variant_isDefault == null ? false : this.edit_variant_isDefault)
    let oldVariant = this.variantModelArray[this.editIndex];
    this.variantModelArray[this.editIndex] = variant1;

    this.imageList.forEach(list => {
      if (list.variant === oldVariant.variants) {
        list.variant = variant1.variants;
        list.images.forEach(vari => {
          if (vari.variants === oldVariant.variants) {
            vari.variants = variant1;
          }
        });
      }
    });

    this.editdivshow = false;
    this.vari = [];
    this.variant_isDefault = null;
    this.variant_price = 0.0;
    this.stage = "null";
    this.stage1 = "null";
    this.variant_quantity = 0;
    $(".changeClass").val("null")
    this.showVari = [];
    // alert(JSON.stringify(this.variantModelArray))

  }
  //edit variants end
  //delete variants
  deleteVariant(i: number) {

    var removeData = this.variantModelArray[i];
    this.variantModelArray.splice(i, 1);
    var imgData = this.imageList.find(v => v.variant == removeData.variants);
    if (imgData) {
      this.imageList.splice(this.imageList.indexOf(imgData), 1);
    }
  }
  //delete variants end

  //upload image

  urls: any[] = [];
  image: any[] = [];
  fileToUploads: File[] = [];
  fileToUpload: File;

  ImageVariant = {
    init: function (variantvalue, isdefaultimage: boolean, image) {
      this.variantvalue = variantvalue;
      this.isdefaultimage = isdefaultimage;
      this.image = image;
    },
  }
  imageVariants = [];
  OpenFileDailog() {
    let e: HTMLElement = document.getElementById("variantimageid") as HTMLElement;
    e.click();
  }

  // imageUpload(event) {
  //   ;
  //   if (event.target.files && event.target.files[0]) {

  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       reader.onload = (event: any) => {
  //         ;
  //         this.urls.push(event.target.result);
  //         this.image = event.target.result;
  //         this.fileToUploads.push(this.image);
  //       }
  //       this.fileToUpload = event.target.files[i];

  //       //        this.service.postCategory(this.fileToUpload).subscribe(res => {
  //       //          this.toastr.success('Inserted successfully', 'Category !');                                   

  //       reader.readAsDataURL(this.fileToUpload);
  //       //})
  //     }

  //   }
  // }


  ImageDelete(i, j) {

    this.imageList[i].images.splice(j, 1);
    if (this.imageList[i].images.length == 0)
      this.imageList.splice(i, 1);
  }

  AddImage(ImageVariant, isDefault_Image: boolean) {

    if (!ImageVariant || ImageVariant === "null") {
      this.toastr.error('Select variant first');
      return false;
    }
    this.image.forEach(img => {
      var variant1 = Object.create(this.ImageVariant);
      variant1.isdefaultimage = isDefault_Image;
      variant1.image = img;
      variant1.variants = ImageVariant;
      var imgs = this.imageList.filter(c => c.variant === variant1.variants)[0];
      if (imgs) {
        imgs.images.push(variant1);
        if (isDefault_Image) {
          imgs.images.forEach(element => {
            if (element != variant1) {
              element.isdefaultimage = false;
            }
          });
        }
      }
      else {
        var d = {
          variant: ImageVariant,
          images: []
        };
        d.images.push(variant1)
        this.imageList.push(d);
      }
    });
    this.resetDropzoneUploads();
  }


  public resetDropzoneUploads(): void {
    this.image = [];
    this.componentRef.directiveRef.reset();
  }


  setAsDefault(i, j) {

    var cur = this.imageList[i].images[j];
    cur.isdefaultimage = true;
    this.imageList[i].images.forEach(element => {
      if (element != cur)
        element.isdefaultimage = false;
    });
  }

  onUploadSuccess(event: any) {

    if (event[0].dataURL) {
      this.image.push(event[0].dataURL);
    }
  }


  //-------updated variants


  addOption1() {
    let newItemNoSpecs = this.optionsSpecs.length + 1;
  }

  variantSpecsArray: any[] = [{ Heading: '', Description: '' }];

  addVariantSpecs() {
    this.variantSpecsArray.push({ Heading: '', Description: '' });
  }

  deleteVariantSpecs(index: any) {
    this.variantSpecsArray.splice(index, 1);
  }


  resetUpdateColumn() {
    this.editdivshow = false;
    this.IsEdit = false;
    this.editIndex = -1;
    this.vari = [];
    this.variant_isDefault = null;
    this.variant_price = null;
    this.stage = "null";
    this.stage1 = "null";
    this.variant_quantity = null;
    $(".changeClass").val("null")
    this.showVari = [];
    this.variantSpecsArray = [];
    this.variant_isDefault = false;
    this.CostPrice1 = null;
    this.ProductSKU1 = null;
    this.Weight1 = null;
    this.Lenght = null
    this.Width = null
    this.Height = null
    this.Discount1 = null;
    this.PriceAfterDiscount1 = null;

    this.copyFromSpecsVariantsArray = [];
    this.variantModelArray.forEach(element => {
      var x = element;
      this.copyFromSpecsVariantsArray.push(x);
    });
  }


  variantModel = {
    init: function (variants, price, Discount, PriceAfterDiscount, CostPrice, quantity, isDefault, variantSpecs, weight, sku, Lenght, Width, Height) {
      this.variants = variants;
      this.price = price;
      this.quantity = quantity;
      this.isDefault = isDefault;
      this.Discount = Discount;
      this.PriceAfterdiscount = PriceAfterDiscount;
      this.CostPrice = CostPrice;
      this.Specification = variantSpecs;
      this.Weight1 = weight;
      this.ProductSKU1 = sku;
      this.Lenght = Lenght
      this.Width = Width
      this.Height = Height
    }
  }

  goToProducts(): boolean {
    this.Router.navigate(['/vendor/products']);
    return false;
  }

  public variant_price: number = 0; variant_quantity: number = 0;
  variant_isDefault: boolean = false; Discount1: number = 0;
  PriceAfterDiscount1: number = 0; CostPrice1: number = 0; variantSpecs: any[];

  variantModelArray = [];

  checkSpecs(): any {
    this.variantSpecsArray.forEach(element => {
      if ((!element.Heading) || (!element.Description)) {
        return 0;
      }
    });
  }

  geterrors() {
    if (this.options.length !== this.vari.length)
      this.showoptionerr = true;
    else
      this.showoptionerr = false;

    if (!Number(this.variant_price))
      this.showpriceerr = true;
    else
      this.showpriceerr = false;

    if (!Number(this.variant_quantity))
      this.showquantityerr = true;
    else
      this.showquantityerr = false;

    if (!Number(this.ProductSKU1))
      this.showskuerr = true;
    else
      this.showskuerr = false;


    if (!Number(this.Weight1))
      this.showweighterr = true;
    else
      this.showweighterr = false;

    if (!Number(this.Lenght))
      this.showweighterr = true;
    else
      this.showweighterr = false;
    if (!Number(this.Width))
      this.showweighterr = true;
    else
      this.showweighterr = false;
    if (!Number(this.Height))
      this.showweighterr = true;
    else
      this.showweighterr = false;

    if (!Number(this.CostPrice1))
      this.showcosterr = true;
    else
      this.showcosterr = false;

    if (!Number(this.PriceAfterDiscount1))
      this.showdiscountpriceerr = true;
    else
      this.showdiscountpriceerr = false;

    if (!Number(this.PriceAfterDiscount1))
      this.showdiscountpriceerr = true;
    else
      this.showdiscountpriceerr = false;
  }
  async saveVariants(form: NgForm) {

      
    var data = this.variantSpecsArray.find(b => (!b.Heading) || (!b.Description));
    if (data) {
      this.toastr.clear();
      this.toastr.error('Fill Specification fields!');
      return false;
    }

    if (this.editIndex >= 0) {
      this.geterrors()
      if (this.options.length !== this.edit_vari.length || (!Number(this.variant_price))
        || (!Number(this.variant_quantity)) || (!this.ProductSKU1) || (!Number(this.Weight1)) || (!Number(this.Lenght)) || (!Number(this.Width)) || (!Number(this.Height))
        || (!Number(this.PriceAfterDiscount1)) || (!Number(this.CostPrice1))) {
        this.toastr.clear();
        this.toastr.error('Fill All fields to add new variants!');
        return false;
      }
      else {

        // if (this.variantSpecsArray.filter(c => (!c.Description) || (!c.Heading))) {
        //   this.toastr.clear();
        //   this.toastr.error('Fill specification first!');
        //   return false;
        // }

        var variant1 = Object.create(this.variantModel);
        var AllVarData = [];
        this.edit_vari.forEach(data => {
          var optionData = this.Variants.filter(b => b.optionvalue.filter(n => n === data))[0];
          if (optionData) {
            var res = optionData.option + ":" + data;
            AllVarData.push(res.replace(/^0+/, ''));
          }
        });

        this.showVari = [];
        this.showVari = this.edit_vari;
        if (this.showVari.length === AllVarData.length) {
          this.showVari = [];
          this.showVari = AllVarData;
        }

        variant1.init(this.showVari.join('|'),
          this.variant_price,
          this.Discount1,
          this.PriceAfterDiscount1,
          this.CostPrice1,
          this.variant_quantity,
          this.variant_isDefault == null ? false : this.variant_isDefault,
          this.variantSpecs = this.variantSpecsArray,
          this.Weight1,
          this.ProductSKU1,
          this.Lenght,
          this.Width,
          this.Height
        )

        let oldVariant = this.variantModelArray[this.editIndex];
        if (oldVariant.Id)
          variant1.Id = oldVariant.Id;
        else
          variant1.Id = 0;

        this.variantModelArray[this.editIndex] = variant1;

        this.imageList.forEach(list => {
          if (list.variant === oldVariant.variants) {
            list.variant = variant1.variants;
            list.images.forEach(vari => {
              if (vari.variants === oldVariant.variants) {
                vari.variants = variant1.variants;
              }
            });
          }
        });
      }
      this.resetUpdateColumn();
    }
    else {
      this.Discount1 = form.value.Discount1;
      this.PriceAfterDiscount1 = form.value.PriceAfterDiscount1;
      this.CostPrice1 = form.value.CostPrice1;
      this.geterrors()

      if (this.options.length !== this.vari.length || (!Number(this.variant_price))
        || (!Number(this.variant_quantity)) || (!this.ProductSKU1) || (!Number(this.Weight1))
        || (!Number(this.PriceAfterDiscount1)) || (!Number(this.CostPrice1))) {
        this.toastr.clear();
        this.toastr.error('Fill All fields to add new variants!');
        return false;
      }


      var variant1 = Object.create(this.variantModel);
      var AllVarData = [];
      this.vari.forEach(data => {
        var optionData = this.Variants.find(b => b.optionvalue.find(c => c.replace(/\s/g, "") === data.replace(/\s/g, "")));
        if (optionData) {
          var res = optionData.option + ":" + data;
          AllVarData.push(res.replace(/^0+/, ''));
        }
      });

      this.showVari = this.vari;
      this.edit_vari = this.vari;
      if (this.showVari.length === AllVarData.length) {
        this.showVari = [];
        this.showVari = AllVarData;
      }

      variant1.init(
        this.showVari.join("|"),
        this.variant_price,
        this.Discount1,
        this.PriceAfterDiscount1,
        this.CostPrice1,
        this.variant_quantity,
        this.variant_isDefault == null ? false : this.variant_isDefault,
        this.variantSpecs = this.variantSpecsArray,
        this.Weight1,
        this.ProductSKU1,
        this.Lenght,
        this.Width,
        this.Height
      )
      var oldVariantname = this.variantModelArray.filter(x=>x.variants==variant1.variants)[0]
      if (!oldVariantname)
        this.variantModelArray.push(variant1);
        else
        this.toastr.warning("This Variant already exists.")
      this.resetUpdateColumn();
    }
  }

  //specification model


  addToSpecs(event: any, index) {

    if (this.variantSpecsArray[index]) {
      this.variantSpecsArray[index].Heading = $(event.target.parentElement.parentElement.parentElement).find('input')[0].value;
      this.variantSpecsArray[index].Description = $(event.target.parentElement.parentElement.parentElement).find('input')[1].value;
    }
    else {
      var model = {
        Heading: $(event.target.parentElement.parentElement.parentElement).find('input')[0].value,
        Description: $(event.target.parentElement.parentElement.parentElement).find('textarea')[0].value
      }
      this.variantSpecsArray.push(model);
    }
  }



  SpecificationModelArray = [];
  saveSpecification(from: NgForm) {
    console.log(from.value)
    let specification = Object.create(this.SpecificationModel);
    specification.init(this.Specification, this.SpecificationHeading)
    this.SpecificationModelArray.push(specification);
  }


  deleteSpecification(i: number) {
    this.variantModelArray.splice(i, 1);
  }

  //specification end...
  eventdata: any;
  event: any;


  onChange(event: any) {

    if (this.editIndex >= 0) {
      if (event.target.value != "null") {
        var options = [];
        for (var i = 0; i < event.target.options.length; i++) {
          if (event.target.options[i].value && !(event.target.options[i].value === "null"))
            options.push(event.target.options[i].value);
        }
        if (event.target.value != "null") {
          options.forEach(element => {
            var data = this.edit_vari.find(b => b === element);
            if (data) {
              var index = this.edit_vari.indexOf(data);
              if (index >= 0) {
                this.edit_vari[index] = "";
                this.edit_vari[index] = event.target.value;
              }
            }
          });
        }
      }
    }
    else {
      if (event.target.value != "null") {
        this.vari.length = this.variantList.length;
        var data = this.variantList.find(b => b.VariantData.VariantOptions.find(n => n.Name === event.target.value));
        if (data) {
          var index = this.variantList.indexOf(this.variantList.find(b => b.VariantData.VariantOptions.find(n => n.Name === event.target.value)));
          if (index >= 0) {
            this.vari[index] = event.target.value;
          }
        }
        // for (var i = 0; i < event.target.options.length; i++) {
        //   // var data = new VariantOption();
        //   if (event.target.options[i].value === event.target.value) {
        //     var index = event.target.selectedIndex;
        //     this.eventdata = event.target.options[index].text;
        //     this.vari.push(this.eventdata);
        //   }
        //   this.vari.forEach(ele => {
        //     if (ele === event.target.options[i].value && ele !== event.target.value) {
        //       this.eventdata = "";
        //       this.vari.splice(this.vari.indexOf(ele), 1);
        //     }
        //   });
        // }
      }
    }
  }



  onChange1(event: any) {

    var options = [];
    for (var i = 0; i < event.target.options.length; i++) {
      options.push(event.target.options[i].value);
    }

    if (event.target.value != "null") {
      for (var i = 0; i < event.target.options.length; i++) {
        if (event.target.options[i].value === event.target.value) {
          this.eventdata = event.target.value;
          this.edit_vari.push(this.eventdata);
        }
        if (this.edit_vari.filter(c => c === event.target.value).length > 1) {
          this.edit_vari.forEach(el => {
            if (el === event.target.value) {
              el = "";
              this.edit_vari.splice(this.edit_vari.indexOf(this.edit_vari.filter(c => c === "")), 1);
            }
          });
        }
        this.options.forEach(ele => {
          if (ele === event.target.options[i].value && ele !== event.target.value) {
            this.eventdata = "";
            this.edit_vari.splice(this.vari.indexOf(ele), 1);
          }
        });
      }
    }
  }

  //edit variants
  editdivshow: boolean = false;
  editoptions: any[];
  edit_vari = [];
  editIndex: number;
  IsEdit: boolean;
  public edit_variant_price: number; edit_variant_quantity: number; edit_variant_isDefault: boolean = false;
  edit_variant_Discount1: number;
  edit_variant_PriceAfterDiscount1: number; edit_variant_CostPrice1: number;

  copyFromSpecsVariantsArray: any[] = [];

  editVariant(i: number) {

    this.showVari = [];
    this.edit_vari = [];
    this.showVari = this.vari;
    this.editIndex = i;
    this.IsEdit = true;
    // this.editdivshow = true;
    let data = this.variantModelArray[i];
    this.editoptions = [];
    var data1 = data.variants.split('|');
    data1.forEach(element => {
      this.editoptions.push((element.split(':')[1]).trim());
    });

    this.showVari = this.editoptions;
    this.edit_vari = this.editoptions;
    this.variant_price = data.price;
    this.variant_isDefault = data.isDefault;
    this.variant_quantity = data.quantity;
    this.Discount1 = data.Discount;
    this.PriceAfterDiscount1 = data.PriceAfterdiscount;
    this.CostPrice1 = data.CostPrice;
    this.ProductSKU1 = data.ProductSKU1;
    this.Weight1 = data.Weight1;
    this.Lenght = data.Lenght
    this.Width = data.Width
    this.Height = data.Height
    this.variantModelArray.forEach(element => {
      var x = element;
      this.copyFromSpecsVariantsArray.push(x);
    });
    this.copyFromSpecsVariantsArray.splice(this.editIndex, 1);

    if (data.Specification)
      this.variantSpecsArray = data.Specification;
    else
      this.variantSpecsArray = [];
  }

  copySpecs(event: any) {

    var value = event.target.value;
    let copyFrom = this.variantModelArray.filter(c => c.variants.trim() == value.trim())[0];
    let copyTo = this.variantModelArray[this.editIndex];
    if ((!copyTo) && (copyFrom)) {
      this.variantSpecsArray = [];
      copyFrom.Specification.forEach(element => {
        var model = {
          Heading: element.Heading,
          Description: element.Description
        };
        this.variantSpecsArray.push(model);
      });
    }
    if (copyFrom && copyTo) {
      copyTo.Specification = [];
      if (copyFrom.Specification) {
        copyTo.Specification = [];
        this.variantSpecsArray = [];
        copyFrom.Specification.forEach(element => {
          var model = {
            Heading: element.Heading,
            Description: element.Description
          };
          copyTo.Specification.push(model);
          this.variantSpecsArray.push(model);
        });

      } else {
        copyTo.Specification = [];
        this.variantSpecsArray = [];
      }
    }
  }


  CalculatePriceAfterDiscount(Discount, SellingPrice) {

    if (parseInt(SellingPrice)) {
      if (!Discount)
        Discount = 0;
      let price = SellingPrice - (SellingPrice * Discount / 100);
      //this.service.formData.PriceAfterDiscount = price;
    }
    else {
      this.toastr.clear();
      this.toastr.error('Enter any amount here !');
    }
  }

  CalculatePriceAfterDiscount1(Discount, SellingPrice, action: string) {

    Discount = this.Discount1;
    SellingPrice = this.variant_price;
    if (parseInt(SellingPrice)) {
      if (!Discount)
        Discount = 0;
      let price = SellingPrice - (SellingPrice * Discount / 100);
      if (action == "edit")
        this.edit_variant_PriceAfterDiscount1 = price;
      else
        this.PriceAfterDiscount1 = price;
    }
    else {
      return false;
    }
  }


  //--------check existing sku
  checkExistingSKU() {

    if (this.variantModelArray.find(v => v.ProductSKU1 == this.ProductSKU1)) {
      this.toastr.error('SKU already exist!');
      this.ProductSKU1 = "";
      return false;
    }
    let prodId = 0;
    let variantId = 0;
    if (this.ProductSKU1) {
      this.service.checkExistingSKU(prodId, variantId, this.ProductSKU1).subscribe((data: any) => {

        if (data) {
          this.toastr.error('SKU already exist!');
          this.ProductSKU1 = "";
          return false;
        }
      })
    }
  }
  //===shipment
  handleSelected($event) {
    if ($event.target.checked === true) {
      // Handle your code
      this.Shipchecked = true
    } else {
      this.Shipchecked = false
    }
  }
}

