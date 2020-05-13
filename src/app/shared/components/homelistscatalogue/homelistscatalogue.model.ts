import { Category } from '../../../modules/admin/product-category/category';
import { Menu } from '../front-end/menus/menu';
import { VERSION } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class HomeListsCatalogueModel{
  version = VERSION;
  filter: Filter = new Filter();
  selectedItem: string;
  selectedSize: number;
  selectedReview: number;
  selectedCategory: number;
  selectedSizeArray: any[] = [];
  minPriceBox: string;
  maxPriceBox: string;
  list: Menu[];
  
  ProductList: boolean[];
  child: boolean;
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  pricelist: any[] = [];
  public Products: any = [];
  subCat: string = "";
  Cat: string;
  CatId: number;
  catvalue: number;
  isChecked: any;
  Variants = [];
  IsGrid: boolean;
  IsList: Boolean = true;
  selectedVariants = [];
  searchData: string = "";
  SortData: string = "NewArrival";
  model: any;
  Url: string;
  productId: any=0;
  ipAddress: any;
  constructor(private sanitizer: DomSanitizer){
    this.version = VERSION;
    this.filter= new Filter();
    this.selectedItem="";
    this.selectedSize=0;
    this.selectedReview=0;
    this.selectedCategory=0;
    this.selectedSizeArray = [];
    this.minPriceBox="";
    this.maxPriceBox="";
    this.list=[];
    this.ProductList=[];
    this.child=false;
    this.count = 0; this.page = 1; this.perPage = 10; this.pagesToShow = 10;
    this.pricelist = [];
    this. Products = [];
    this.subCat = "";
    this.Cat="";
    this.CatId=0;
    this.catvalue=0;
    this.isChecked=null;
    this.Variants = [];
    this.IsGrid=true;
    this.IsList = true;
    this.selectedVariants = [];
    this.searchData = "";
    this.SortData= "NewArrival";
    this.model=null;
    this.Url="";
    this.productId=0;
    this.ipAddress=null;
  }
    public clone(): HomeListsCatalogueModel {
      let clonedModel: HomeListsCatalogueModel = new HomeListsCatalogueModel(this.sanitizer);
      clonedModel.version = VERSION;
      clonedModel.filter= new Filter();
      clonedModel.selectedItem="";
      clonedModel.selectedSize=0;
      clonedModel.selectedReview=0;
      clonedModel.selectedCategory=0;
      clonedModel.selectedSizeArray = [];
      clonedModel.minPriceBox="";
      clonedModel.maxPriceBox="";
      clonedModel.list=[];
      clonedModel.ProductList=[];
      clonedModel.child=false;
      clonedModel.count = 0; clonedModel.page = 1; clonedModel.perPage = 10; clonedModel.pagesToShow = 10;
      clonedModel.pricelist = [];
      clonedModel. Products = [];
      clonedModel.subCat = "";
      clonedModel.Cat="";
      clonedModel.CatId=0;
      clonedModel.catvalue=0;
      clonedModel.isChecked=null;
      clonedModel.Variants = [];
      clonedModel.IsGrid=true;
      clonedModel.IsList = true;
      clonedModel.selectedVariants = [];
      clonedModel.searchData = "";
      clonedModel.SortData= "NewArrival";
      clonedModel.model=null;
      clonedModel.Url="";
      clonedModel.productId=0;
      clonedModel.ipAddress=null;
      return clonedModel;
    }
  }
export class Filter {
  MinPrice: string = "";
  MaxPrice: string = "";
  SelectedVariants: SelectVariant[];
  CategoryId: number;
  SearchData: string = "";
  AvgRate: number;
  SortBy: string = "NewArrival";

}
export class SelectVariant {
  CategoryId: number;
  VariantId: number;
  VariantOptionId: [];
}
export class SideCategoryModel {
  Idlevel1: number;
  Namelevel1: string;
  Idlevel2: number;
  Namelevel2: string;
  Children: Category[];
  OtherIdlevel2:Category[];
  ChildName:string;
  ChildId:number;
  SpanishNamelevel1:any;
  SpanishNamelevel2:any;
}