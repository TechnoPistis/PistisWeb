import { SideCategoryModel } from '../productlist/productlist.model';
import { DomSanitizer } from '@angular/platform-browser';

export class ProductDetailsModel{
  likeProducts:any[]
  selectedQuantity:number
    validUser: any;
  description:string
  Action:string
  DataCue: any;
  images: any;
  varientimages = true;
  data = {
    CustomerId: null,
    ProductId: null,
    IpAddress: null
  };
  product: any;
  Products: any[] = [];
  maincat: SideCategoryModel = new SideCategoryModel();
  dataList: any;
  productId: number;
  LandingVariantId: number;
  ipAddress: any;
  Url: string;
  date: any;
  myThumbnail: string;
  validCheck = true;
  mouseover: boolean;
  mainImage: boolean = true;
  varientImage: any;
  CustomerTags: any = "";
  getImage: any;
  activeHeart: boolean;
  list: any;
  wishlistLenght: any;
  ComporeProduct: any[] = [];
  enableSticky = true;
  tag123: any = [];
  constructor(public sanitizer:DomSanitizer){
    this.likeProducts=[]
    this.selectedQuantity=1
    this.validUser='';
    this.description=''
    this.Action=''
    this.DataCue='';
    this.images='';
    this.varientimages = true;
    this.data = {
      CustomerId: null,
      ProductId: null,
      IpAddress: null
    };
    this.product='';
    this.Products = [];
    this.maincat= new SideCategoryModel();
    this.dataList='';
    this.productId=0;
    this.LandingVariantId=0;
    this.ipAddress='';
    this.Url='';
    this.date='';
    this.myThumbnail='';
    this.validCheck = true;
    this.mouseover=false;
    this.mainImage = true;
    this.varientImage='';
    this.CustomerTags = "";
    this.getImage='';
    this. activeHeart=false;
    this.list='';
    this.wishlistLenght='';
    this.ComporeProduct= [];
    this.enableSticky = true;
    this.tag123= [];
  }
  public clone(): ProductDetailsModel {
    let clonedModel: ProductDetailsModel = new ProductDetailsModel(this.sanitizer);
    clonedModel.likeProducts=[];
    clonedModel.selectedQuantity=1;
    clonedModel.validUser='';
    clonedModel.description=''
    clonedModel.Action=''
    clonedModel.DataCue='';
    clonedModel.images='';
    clonedModel.varientimages = true;
    clonedModel.data = {
      CustomerId: null,
      ProductId: null,
      IpAddress: null
    };
    clonedModel.product='';
    clonedModel.Products = [];
    clonedModel.maincat= new SideCategoryModel();
    clonedModel.dataList='';
    clonedModel.productId=0;
    clonedModel.LandingVariantId=0;
    clonedModel.ipAddress='';
    clonedModel.Url='';
    clonedModel.date='';
    clonedModel.myThumbnail='';
    clonedModel.validCheck = true;
    clonedModel.mouseover=false;
    clonedModel.mainImage = true;
    clonedModel.varientImage='';
    clonedModel.CustomerTags = "";
    clonedModel.getImage='';
    clonedModel. activeHeart=false;
    clonedModel.list='';
    clonedModel.wishlistLenght='';
    clonedModel.ComporeProduct= [];
    clonedModel.enableSticky = true;
    clonedModel.tag123= [];
    return clonedModel;
  }
}