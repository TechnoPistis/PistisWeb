import { Component, OnInit } from '@angular/core';
import { HomeService } from "./home.service";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/modules/admin/products/product.service';
import { VariantService } from 'src/app/modules/admin/category-variants/variants.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css']
})
export class HomeCategoryComponent implements OnInit {
  count: Array<number> = [];
  firstDiv = false
  searchhh: any = ''
  variantList: any[] = [];
  seconedDive = true
  list: [] = []
  thirdDiv = false
  val: number = 0;
  listName: string = '';
  CategoryId: any = null
  SubCategoryId: any = null
  invalid: boolean = false
  IsEnable: boolean = false;
  variantModelArray = [];
  c: number;
  ProductCategories: any[];
  Categories: [];
  Variants = [];
  selectedCustomers: [];
  products: [] = []
  listNameValidation: boolean = false
  data: Array<number> = []
  ListName: any = ''
  ListId: any = ''
  listdata: any = {
    listName: '',
    OrderNumber: 0,
    IsActive: false
  }
  id = 0
  HomeCategoryProducts: any;
  Data: any = {
    productID: [] = [],
    homeCategoryId: 0
  }

  constructor(private service: HomeService, private toastr: ToastrService,
    public _service: ProductService, private _variantService: VariantService
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.id = params['Id'];
    //   this.AddddList()
    // })
    this.getMainCategories()
    this.service.getAllList().subscribe(x => {
      this.list = x as []
    })
    this.orderCount()
  }
  orderCount() {
    this.service.getOrderNumberCount(
    ).subscribe((x: any) => {

      if (x == 0) {
        this.val++;
        this.count.push(this.val)
        console.log(this.count)
      } else {
        this.val = 0
        this.count = []
        for (let i = 0; i <= x; i++) {
          this.val++;
          this.count.push(this.val)
        }
      }
    })
  }

  showList() {
    this.firstDiv = false
    this.seconedDive = true
    this.thirdDiv = false
    this.HomeCategoryProducts=null
  }
  getValue(val: any) {

    this.c = val
  }

  getListData() {

    if (this.listName == '') {
      // this.toastr.info('Please add the list name.')
      this.listNameValidation = true
      return false;
    }
    this.listNameValidation = false
    this.listdata.listName = this.listName
    this.listdata.IsActive = this.IsEnable
    this.listdata.OrderNumber = this.c
    this.service.getListDetails(this.listdata).subscribe((x: any) => {

      if (x != null) {
        this.toastr.success("Saved data successfully.")
        this.firstDiv = false
        this.seconedDive = true
        this.thirdDiv=false
        this.list = x as []
        
      }
    })
  }
  onCheckboxChagen(event: any) {

    if (event.target.checked) {
      this.IsEnable = true
    } else {
      this.IsEnable = false
    }
  }
  //onActivate
  onActivate(id: number, val: number) {
    if (val == 1) {
      if (confirm('Are you want to Activate this List?')) {
        this.service.deactivateCustomer(id).subscribe(res => {
          this.service.getAllList().subscribe(x => {
            this.list = x as []
            this.firstDiv = false
            this.seconedDive = true
          })
          this.toastr.success('Activated successfully', 'List !');
        });
      }
    } else {
      if (confirm('Are you want to Deactivate this List?')) {
        this.service.deactivateCustomer(id).subscribe(res => {
          this.service.getAllList().subscribe(x => {
            this.list = x as []
            this.firstDiv = false
            this.seconedDive = true
          })
          this.toastr.success('Deactivated successfully', 'List !');
        });

      }
    }
  }
  addProducts(Name, Id) {
    this.selectedCustomers = [];
    this.SubCategoryId = null
    this.CategoryId = null
    this.firstDiv = false;
    this.seconedDive = false;
    this.thirdDiv = true
    this.ListName = Name
    this.selectedCustomers = []
    this.ListId = Id
    this.service.getHomeCategoryProducts(this.ListId).subscribe(x => {

      this.HomeCategoryProducts = x as []
    })
  }
  //////////////third div

  getSubCategoriesByCategory(id) {

    if (+id) {
      this._service.getCategoryByParentId(id).subscribe((data: any) => {

        if (data && data.length > 0) {
          this.Categories = data;
        }
      })
    }
  }
  getVariants(value: any) {

    if (value && value != null) {
      // this._variantService.getVariantsByCategory(value).subscribe((data: any) => {
      //     
      //   this.variantList = [];
      //   this.variantModelArray = [];

      //   this.variantList = data;
      //   if (data.length > 0)
      //     this.Variants = [];
      // })
      this.service.getProducts(value).subscribe(x => {

        this.products = x as []
        console.log(this.products)
      })
    }
    else
      return false;
  }
  getMainCategories() {

    this._service.getsubcategoryCategories().subscribe((data: any[]) => {
      if (data.length > 0) {

        this.ProductCategories = data;
      }
    })
  }


  onclick(id: any[]) {

  
    this.Data = {
      productID: [] = [],
      homeCategoryId: 0
    }

    if (id != [] || id != null || id[0] != 'undefined') {
      id.forEach((element: number) => {
        this.Data.productID.push(element);
      });
      this.Data.homeCategoryId = this.ListId
      // if((id.length + this.HomeCategoryProducts.length)>12){
      //   this.toastr.info("12 products per list")
      //   return false;
      // }
      //this.Data.homeCategoryId=2

      this.service.saveProducts(this.Data).subscribe((x: any) => {
        if (x == 1) {
          this.toastr.success('Product saved successfully.')
          this.Data = null
          this.firstDiv = false
          this.seconedDive = false
          this.thirdDiv = true
          this.service.getHomeCategoryProducts(this.ListId).subscribe(x => {

            this.HomeCategoryProducts = x as []
          })
        }
      })

      // alert(JSON.stringify(this.Data))
      //    
      //   return this.http.post(this.url + 'CustomerGroup/addtoCustomergroup', this.Data).subscribe(res => {
      //     if (res == 1) {
      //       this.toastr.info('Data added successfully');
      //       this.ngOnInit();
      //     } else {
      //       this.toastr.error('Please select the customer');
      //     }
      //   })
      // }else{
      //   this.toastr.info('Please select the customer');
      // }
    }
  }
  onDelete(productid: number) {

    if (confirm('Are you want to delete this product?')) {
      this.service.getDeleteProduct(this.ListId, productid).subscribe(x => {
        if (x == 1) {
          this.toastr.success("Product deleted successfully");
          this.firstDiv = false
          this.seconedDive = false
          this.thirdDiv = true
          this.service.getHomeCategoryProducts(this.ListId).subscribe(x => {

            this.HomeCategoryProducts = x as []
          })
        }
      })
    }
  }
  getValue1() {

    this.listName;
    this.service.checklistName(this.listName).subscribe(x => {
      if (x == 1) {
        this.invalid = true
      } else {
        this.invalid = false
      }
    })
  }
  AddddList() {
 
    this.firstDiv = true
    this.seconedDive = false
    this.thirdDiv = false
    this.listName = ''
    this.c = null
    this.IsEnable = false
    // this.service.getAllList().subscribe(x => {
    //   this.list = x as []
    // })
    this.orderCount()
    //this.showList()
  }
  search() {


    if (this.searchhh == '') {
      this.toastr.info('Write something to search.')
      return false;
    }
    this.service.getSearchedData(this.searchhh).subscribe(x => {
      this.list = x as []
    })
  }
}
