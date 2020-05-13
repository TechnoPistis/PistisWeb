import { Component, OnInit, DebugElement, ViewChild, ElementRef } from '@angular/core';
import { HomePageService } from "../home-page/home-page.service";
import { Menu } from "../front-end/menus/menu";
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/modules/admin/product-category/category.service';
import { MycartService } from '../mycart/mycart.service';
import { MyCart, CartItem } from '../mycart/mycartModel';
import { ToastrService } from 'ngx-toastr';
import { SearchTermService } from '../searchterm/search-term.service';
import { Searchtermmodel } from '../searchterm/searchtermmodel';
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogService } from '../../services/user-log.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';
import { HomeListsCatalogueModel } from './homelistscatalogue.model';
import { HomelistService } from './homelist.service';

@Component({
  selector: 'app-homelistscatalogue',
  templateUrl: './homelistscatalogue.component.html',
  styleUrls: ['./homelistscatalogue.component.css']
})
export class HomelistscatalogueComponent implements OnInit {
  description:string
  slanguage: any
  Action:string
  RequestUrl: string;
  Guid: string;
  PageUrl: string;
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  menus: Promise<Menu[]>;
  Variant = {
    init: function (CategoryId, VariantId, VariantOptionId) {
      this.CategoryId = CategoryId;
      this.VariantId = VariantId;
      this.VariantOptionId = VariantOptionId;
    },
  }
  model: HomeListsCatalogueModel;
  myViewModel: HomeListsCatalogueModel;
  isMobileResolution: boolean=false;
  constructor(

    public datepipe: DatePipe,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    public service: CategoryService,
    public myservice: HomelistService,
    public cartservice: MycartService,
    private route: ActivatedRoute,
    private Router: Router,
    private toastr: ToastrService,
    public serviceTerm: SearchTermService,
    private userLog:UserLogService,
    private sanitizer:DomSanitizer,
    private applicationStateService:ApplicationStateServiceService,
    public tracklog:Tracklog,)
    {
      this.model = new HomeListsCatalogueModel(sanitizer);
      this.myViewModel = new HomeListsCatalogueModel(sanitizer);
           if(this.isMobileResolution)
           this.ActiveGrid(0)
           else
            this.ActiveGrid(1)
      //this.loadView();
      this.updateView();
      this.isMobileResolution = applicationStateService.getIsMobileResolution();
     }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
     private updateView():void{this.myViewModel = this.model.clone();}

    public loadView():void {

    let userId = +localStorage.getItem('UserId')
    if (userId == null || userId == undefined || userId == 0) {
      this.http.get("https://api.ipify.org/?format=json").subscribe(data => {
        localStorage.setItem("IpAddress", data["ip"]);
      this.myViewModel.ipAddress = data["ip"];

      });
    }
    this.myViewModel.Url = this.Router.url;
      this.userLog.UserLog(0, 1, this.myViewModel.Url, 1);
    this.spinner.show();
    this.slanguage = localStorage.getItem('browseLang')

    this.route.queryParams.subscribe(params => {

      this.myViewModel.catvalue = params['Id'];
      this.myViewModel.page = 1
      this.myViewModel.perPage = 15
      this.myViewModel.selectedCategory = this.myViewModel.catvalue;
      this.myViewModel.searchData = params['searchData'];

      this.getMainSearchProducts(this.myViewModel.catvalue, this.myViewModel.searchData, this.myViewModel.page, this.myViewModel.perPage);
      this.getVariants();
    });
  }
  getVariants() {
    this.myservice.getVariants(this.myViewModel.catvalue).subscribe(data => {
      this.myViewModel.Variants = data as [];
      this.headerData.ngOnInit()
      })
  }

  emptyProductsList: any = false;

  getMainSearchProducts(catvalue: number, searchData: string, page: number, pageSize: number): boolean {
    //this.myservice.getproductsByCategoryData(catvalue, searchData, page, pageSize).subscribe(data => {

    this.myViewModel.filter.CategoryId = catvalue;
    this.myViewModel.filter.SearchData = searchData;
    this.spinner.show();
    this.RequestUrl='products/getFilterProducts?page='+page+"&pagesize="+pageSize,  JSON.stringify( this.myViewModel)
    this.tracklog.handleSuccess1(this.description="Products",this.Action="User searched product","Request",this.RequestUrl,this.PageUrl, this.Guid)

   // this.tracklog.handleSuccess(this.description="get products By Search",this.Action="User searched product by ",JSON.stringify(this.myViewModel))
    this.myservice.getFilterProducts(this.myViewModel.filter, page, pageSize).subscribe((data) => {
      this.service.getCategoryHierarchy(this.myViewModel.catvalue).subscribe(category => {

        this.myViewModel.Cat = category;
      })

      this.service.getSubCat(catvalue).subscribe(subcategory => {
        this.myViewModel.subCat = subcategory
      })

      this.myViewModel.Products = data;
      this.myViewModel.Products.forEach(d => {
        let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
        d.ActiveTo=correcttime;
      });
      this.myViewModel.model = new Searchtermmodel();
      this.myViewModel.model.Name = this.myViewModel.searchData;
      this.myViewModel.model.UserCount = 1;
      if (this.myViewModel.Products.length > 1){
        this.myViewModel.model.ProductCount = this.myViewModel.Products[0].Count
        this.emptyProductsList=false;
        this.spinner.hide();
      }
      else{
        this.emptyProductsList=true;
        this.myViewModel.model.ProductCount = 0;
        this.spinner.hide();
      }
      this.serviceTerm.addSearchTerm(this.model).subscribe(term => {

      })
      if (this.myViewModel.Products.length > 1) {
        this.myViewModel.count = this.myViewModel.Products[0].Count;
        this.myViewModel.pricelist = this.myViewModel.Products[0].PriceList;
      }
      else {
        this.myViewModel.count = 0;
        this.myViewModel.pricelist = [];
      }
      this.tracklog.handleSuccess1(this.description="Products",this.Action="User get result by search",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

    },
    error => this.tracklog.handleError1(error,this.Action="User get result by search",this.RequestUrl,this.PageUrl,this.Guid)

    )

    return false;
  }

  getProducts(catvalue: number, page: number, pageSize: number): boolean {

    this.myViewModel.selectedCategory = catvalue;
    this.myViewModel.filter.CategoryId = catvalue
    this.myViewModel.catvalue = catvalue;
    this.RequestUrl='products/getFilterProducts?page='+page+"&pagesize="+pageSize, this.myViewModel
    this.tracklog.handleSuccess1(this.description="breadcrumbs",this.Action="Breadcrumbs of product","Request",this.RequestUrl,this.PageUrl,this.Guid)
    //this.myservice.getproductsByCategoryData(catvalue,this.searchData, page, pageSize).subscribe(data => {
    this.myservice.getFilterProducts(this.myViewModel.filter, page, pageSize).subscribe((data) => {
      this.service.getCategoryHierarchy(this.myViewModel.catvalue).subscribe(category => {
        this.myViewModel.Cat = category;
      })

      this.service.getSubCat(catvalue).subscribe(subcategory => {
        this.myViewModel.subCat = subcategory
      })

      this.myViewModel.Products = data;
      this.myViewModel.Products.forEach(d => {
        let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
        d.ActiveTo=correcttime;
      });
      if (this.myViewModel.Products.length > 0) {
        this.myViewModel.count = this.myViewModel.Products[0].Count;
        if(this.myViewModel.count==0)
        this.emptyProductsList=true;
        this.myViewModel.pricelist = this.myViewModel.Products[0].PriceList;
      }
      else {
        this.myViewModel.count = 0;
        this.emptyProductsList=true;
        this.myViewModel.pricelist = [];
      }
      this.tracklog.handleSuccess1(this.description="get products",this.Action="Breadcrumbs of product",JSON.stringify(data),this.RequestUrl,this.PageUrl ,this.Guid)

    }
    ,
    error => this.tracklog.handleError1(error,this.Action="Breadcrumbs of product",this.RequestUrl,this.PageUrl,this.Guid)
    )

    return false;

  }


  getFilterData(e: any, VariantId: number, VariantOptionId: number) {
    if (e == true || e == false) {
      this.myViewModel.isChecked = e;
    }
    else {
      var index = this.myViewModel.selectedSizeArray.findIndex((x) => x == e)
      if (index > -1) {
        this.myViewModel.selectedSizeArray.splice(index, 1);
        this.myViewModel.isChecked = false;
      }
      else {
        this.myViewModel.selectedSizeArray.push(e);
        this.myViewModel.isChecked = true;
      }
    }
    let variant1 = Object.create(this.Variant);
    let VariantOptionIdArray = [];
    VariantOptionIdArray.push(VariantOptionId)
    variant1.init(this.myViewModel.catvalue, VariantId, VariantOptionIdArray);
    //push variants to array on ischecked=true
    if (this.myViewModel.isChecked) {
      if (!this.myViewModel.selectedVariants.some((item) => item.VariantId == variant1.VariantId)) {
        this.myViewModel.selectedVariants.push(variant1);
      }
      else {
        if (!this.myViewModel.selectedVariants.some((item) => item.VariantOptionId == VariantOptionId)) {
          let i = this.myViewModel.selectedVariants.findIndex((item) => item.VariantId == variant1.VariantId);
          this.myViewModel.selectedVariants[i].VariantOptionId.push(VariantOptionId);
        }
      }
    }
    //delete variant from array on ischecked=false
    else {
      let i = this.myViewModel.selectedVariants.findIndex((item) => item.VariantId == variant1.VariantId);
      let inner_i = this.myViewModel.selectedVariants[i].VariantOptionId.findIndex((option) => option == VariantOptionId);
      this.myViewModel.selectedVariants[i].VariantOptionId.splice(inner_i, 1);
      if (this.myViewModel.selectedVariants[i].VariantOptionId.length == 0)
        this.myViewModel.selectedVariants.splice(i, 1);

    }

    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants
    this.tracklog.handleSuccess1(this.description="get products ",this.Action="User filtered product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  getFilterData1(e: any, VariantId: number, VariantOptionId: number) {

    if (e.target.checked == true || e.target.checked == false) {
      this.myViewModel.isChecked = e.target.checked;
    }
    else {
      var index = this.myViewModel.selectedSizeArray.findIndex((x) => x == e)
      if (index > -1) {
        this.myViewModel.selectedSizeArray.splice(index, 1);
        this.myViewModel.isChecked = false;
      }
      else {
        this.myViewModel.selectedSizeArray.push(e);
        this.myViewModel.isChecked = true;
      }
    }
    let variant1 = Object.create(this.Variant);
    let VariantOptionIdArray = [];
    VariantOptionIdArray.push(VariantOptionId)
    variant1.init(this.myViewModel.catvalue, VariantId, VariantOptionIdArray);
    //push variants to array on ischecked=true
    if (this.myViewModel.isChecked) {
      if (!this.myViewModel.selectedVariants.some((item) => item.VariantId == variant1.VariantId)) {
        this.myViewModel.selectedVariants.push(variant1);
      }
      else {
        if (!this.myViewModel.selectedVariants.some((item) => item.VariantOptionId == VariantOptionId)) {
          let i = this.myViewModel.selectedVariants.findIndex((item) => item.VariantId == variant1.VariantId);
          this.myViewModel.selectedVariants[i].VariantOptionId.push(VariantOptionId);
        }
      }
    }

    //delete variant from array on ischecked=false
    else {
      let i = this.myViewModel.selectedVariants.findIndex((item) => item.VariantId == variant1.VariantId);
      let inner_i = this.myViewModel.selectedVariants[i].VariantOptionId.findIndex((option) => option == VariantOptionId);
      this.myViewModel.selectedVariants[i].VariantOptionId.splice(inner_i, 1);
      if (this.myViewModel.selectedVariants[i].VariantOptionId.length == 0)
        this.myViewModel.selectedVariants.splice(i, 1);

    }

    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants
    this.myViewModel.page = 1
    this.tracklog.handleSuccess1(this.description="get products ",this.Action="User filtered product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  getFilterPrice(minprice: any, maxprice: any) {
    if (this.myViewModel.selectedItem == minprice) {
      this.myViewModel.selectedItem = "0";
      minprice = 0;
      maxprice = 0;
    }
    else
      this.myViewModel.selectedItem = minprice;
    if (maxprice == "-1") {
      if (minprice.includes("Under")) {
        maxprice = minprice.split(' ')[1];
        minprice = "0";
      }
      else if (minprice.includes("Above")) {
        minprice = minprice.split(' ')[1];
        maxprice = "";
      }
      else {
        var data = minprice.split('-')
        minprice = data[0];
        maxprice = data[1];
      }
    }
    else {
      minprice = minprice == "" ? "" : "$" + minprice;
      maxprice = maxprice == "" ? "" : "$" + maxprice;
    }
    this.myViewModel.filter.MinPrice = minprice;
    this.myViewModel.filter.MaxPrice = maxprice;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;

    this.myViewModel.minPriceBox = minprice.split('$')[1];
    if (maxprice != "") {
      let data1 = (parseFloat(maxprice.split('$')[1])) - .01
      this.myViewModel.maxPriceBox = JSON.stringify(data1) == null ? "0" : JSON.stringify(data1);
    }
    else {
      this.myViewModel.maxPriceBox = maxprice.split('$')[1];
    }
    if (minprice != "" || maxprice != "" || this.myViewModel.selectedVariants.length > 0 || this.myViewModel.searchData != "") {
      this.myViewModel.page = 1
    }
    //this.getMainSearchProducts(this.catvalue, this.searchData, this.page, this.perPage)
    this.tracklog.handleSuccess1(this.description="get products By price filter",this.Action="User filter product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  getFilterReview(rate: number) {
    if (this.myViewModel.selectedReview == rate) {
      this.myViewModel.selectedReview = 0;
    }
    else {
      this.myViewModel.selectedReview = rate;
    }
    this.myViewModel.filter.AvgRate = this.myViewModel.selectedReview;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
    this.myViewModel.page = 1
   // this.tracklog.handleSuccess(this.description="product Filter according to rate on product catelogue page ",this.Action="Rating product clicked",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="product Filter according to rate on product catelogue page ",this.Action="User filter product","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  SortBy(sort: string) {
    this.myViewModel.SortData = sort;
    this.myViewModel.filter.SortBy = this.myViewModel.SortData;
    this.myViewModel.filter.AvgRate = this.myViewModel.selectedReview;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    //this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
    this.myViewModel.page = 1;
    //this.tracklog.handleSuccess(this.description="page data sorted on product catelogue page ",this.Action="Page sorted",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="page data sorted on product catelogue page ",this.Action="User filter product","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();

  }
  decidefunction() {
    // if (this.filter.SelectedVariants.length == 0 && this.filter.MinPrice == " " && this.filter.MaxPrice == "" && this.filter.SearchData == "" && this.filter.AvgRate == 0 && this.filter.SortBy == "") {
    //   //changed
    //   this.myservice.getproductsByCategoryData(this.catvalue,this.searchData, this.page, this.perPage).subscribe(data => {
    //     this.Products = data;
    //     if (this.Products.length > 0) {
    //       this.count = this.Products[0].Count;
    //       this.pricelist = this.Products[0].PriceList;
    //     }
    //     else {
    //       this.count = 0;
    //       this.pricelist = [];
    //     }
    //   })
    // }
    // else {
    //if (this.filter)
    var filter=this.myViewModel.filter
    this.RequestUrl='products/getFilterProducts?page='+this.myViewModel.page+"&pagesize="+this.myViewModel.perPage+JSON.stringify(filter)

      this.myservice.getFilterProducts(filter, this.myViewModel.page, this.myViewModel.perPage).subscribe((data) => {
        this.myViewModel.Products = data;
        this.myViewModel.Products.forEach(d => {
          let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
          d.ActiveTo=correcttime;
        });
        if (this.myViewModel.Products.length > 1) {
          this.myViewModel.count = this.myViewModel.Products[0].Count;
          this.myViewModel.pricelist = this.myViewModel.Products[0].PriceList;
          this.emptyProductsList=false;
        }
        else {
          this.myViewModel.count = 0;
          this.myViewModel.pricelist = this.myViewModel.Products[0].PriceList;
          this.emptyProductsList=true;
        }
        this.tracklog.handleSuccess1(this.description="filter products",this.Action="User filter product",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

      }
      ,
      error => this.tracklog.handleError1(error,this.Action="User filter product",this.RequestUrl,this.PageUrl,this.Guid)

      )


  }
  prevPage() {
    this.myViewModel.page = this.myViewModel.page - 1;

    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
   // this.tracklog.handleSuccess(this.description="page changed on product catelogue page ",this.Action="Page changed",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="page changed on product catelogue page ",this.Action="Page changed","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  nextPage() {
    this.myViewModel.page = this.myViewModel.page + 1;

    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
  //  this.tracklog.handleSuccess(this.description="page changed on product catelogue page ",this.Action="Page changed",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="page changed on product catelogue page ",this.Action="Page changed","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  goToPage(event) {
    this.myViewModel.page = event;

    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
   // this.tracklog.handleSuccess(this.description="page changed on product catelogue page ",this.Action="Page changed",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="page changed on product catelogue page ",this.Action="Page changed","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  newPageSize(e) {
    if (e == 0) {
      e = this.myViewModel.count;
    }
    this.myViewModel.perPage = e;
    this.myViewModel.filter.SelectedVariants = this.myViewModel.selectedVariants;
    this.myViewModel.filter.CategoryId = this.myViewModel.catvalue;
    this.myViewModel.filter.SearchData = this.myViewModel.searchData;
  //  this.tracklog.handleSuccess(this.description="page changed on product catelogue page ",this.Action="Page changed",JSON.stringify( this.myViewModel))
    this.tracklog.handleSuccess1(this.description="page changed on product catelogue page ",this.Action="Page changed","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.decidefunction();
  }
  //render to detail page
  passTheSalt(Id: number, variantId,event) {
    this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="product details button clicked","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    if (event.ctrlKey) {
      window.open(this.myViewModel.Url, '_blank'); // in new tab
  } else

    this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
  }
  newTab(){

    window.open(this.myViewModel.Url, '_blank'); // in new tab
  }
  addToCart(Id: number, DetailId: number) {
    this.RequestUrl='cart/addToCart'
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart",this.Action="add To Cart","Request",this.RequestUrl,this.PageUrl,this.Guid)

    //alert(localStorage.getItem("UserId"))
    let pro = this.myViewModel.Products.filter(x => x.Id == Id)
    let item: CartItem = new CartItem();
    item.ProductVariantDetailId = pro[0].VariantDetailId;
    item.VendorId = pro[0].VendorId;
    item.VendorName = pro[0].VendorName;
    item.UnitPrice = pro[0].SellingPrice;
    item.Discount = pro[0].Discount;
    item.Amount = pro[0].PriceAfterDiscount;
    item.ShipmentVendor=pro[0].ShipmentVendor
    let cart: MyCart = new MyCart();
    cart.IpAddress = localStorage.getItem("IpAddress");
    cart.UserId = parseInt(localStorage.getItem("UserId") == null ? "0" : localStorage.getItem("UserId"));
    cart.TotalAmount = pro[0].PriceAfterDiscount;
    cart.CartItems.push(item);
    this.cartservice.addToCart(cart).subscribe(data => {
      this.headerData.ngOnInit()
      if(data){
      if(cart.UserId>0)
      this.Router.navigate(['/checkout-process/checkout'])
      else
      this.Router.navigate(['/checkout-process/checkout-login'])
    }
      else
      {

        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success("Product added successfully.");
        } else {
          this.toastr.success("Producto agregado con éxito.");
        }
        this.tracklog.handleSuccess1(this.description="Prouct Adding to cart",this.Action="add To Cart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

      this.Router.navigate(['/mycart'])
      }

    }
  ,
  error => this.tracklog.handleError1(error,this.Action="Prouct Adding to cart",this.RequestUrl,this.PageUrl,this.Guid)

    )
  }
  ActiveList() {

    this.myViewModel.IsGrid = true;
    this.myViewModel.IsList = false;
    return false;
  }
  ActiveGrid(data) {
    if (data == 1){
      this.myViewModel.IsGrid = true;
    }
    else
    {
      this.myViewModel.IsGrid = false;
    }
    //return false;
  }

  // ngAfterViewInit() {
  //
  //   this.myservice.appDrawer = this.appDrawer;
  // }
}
