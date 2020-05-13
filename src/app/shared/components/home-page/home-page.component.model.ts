import { Newsletter } from 'src/app/modules/admin/add-to-newsletter/newsletter';
import { Menu } from '../front-end/menus/menu';
import { FeatureProduct } from 'src/app/modules/admin/add-feature-product/feature-product';
import { HeaderComponent } from '../header/header.component';
import { ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export class HomePageComponentModel {
  bought:any;
  relatedProducts:any[];
  likeProducts:any[];
    display = 'none';
  showDiv: boolean = false
  spinOnce: number = 1
  colors = []; //10, 9, 6 ,2
 audio= new Audio();
  prizeToWin: any
  prizes: any[] = [];
  spinner: any[] = [];
  ModalImage = 'assets/img/newsletter-img.jpg';
  ComporeProduct: any[] = [];
  HomeCtegoryList: any[] = [];
  DealList: any[] = [];
  ProductList: boolean[];
  searchValue: string;
  child: boolean;
  banner: any = [];
  image1: any = null;
  image2: any = null;
  image3: any = null;
  image4: any = null;
  view: string = null;
  Rightside: string = null;
  Rside: string = null;
  Middleside: string = null;
  Mside: string = null;
  LeftSide: string = null;
  Lside: string = null;
  HalfUp: string = null;
  HfUp: string = null;
  FourImages: string = null;
  FImages: string = null;
  FullImage: string = null;
  FuImages: string = null;
  TwoImages: string = null;
  TImages: string = null;
  HalfDown: string = null;
  hfDown: string = null;
  public dataList1: any = [];
  dataList:any=[];
  public CategoryProducts: any[];
  category: any = [];
  Boxcategory: [];
  productId: number | null;
  public Id: number | null;
  selectedVal: string;
  footer: [];
  FeatureProduct: FeatureProduct[];
  list: Menu[];
  ipAddress: any = "";
  NewsletterHeading:any="to our newsletter"
Newsletterdescription:any="Get the latest news, updates and special offers."
//if(isMobileResolution)
  active: boolean = true;
  active2: boolean = false;
  selectedItem: any = 0;
  slanguage: string;
  Url: string;
  news: any;
  showSpinnerDiv=false
  SpinnerMoodId:any=0
  //10, 9, 6 ,2
  SpinnercatelogueId:any=0;
  SpinnerproductId:any=0
  SpinnervarientId:any=0;
  newarray: any=[];
  cancelCount: any=+localStorage.getItem("CancelCount")
  recent: any=[];
  iconCategory: any=[];

  constructor(private sanitizer: DomSanitizer){
    this.bought=null;
    this.relatedProducts=[];
    this.likeProducts=[];
    this.display = 'none';
    this.showDiv = false
    this.spinOnce = 1
    this.colors = []; //10, 9, 6 ,2
   this.audio= new Audio();
    this.prizeToWin=''
    this.prizes = [];
    this.spinner= [];
    this.ModalImage = 'assets/img/newsletter-img.jpg';
    this.ComporeProduct= [];
    this.HomeCtegoryList = [];
    this.DealList = [];
    this.ProductList=[];
    this.searchValue='';
    this.child=false;
    this.banner = [];
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
    this.image4= null;
    this. view= null;
    this.Rightside = null;
    this. Rside= null;
    this.Middleside = null;
    this.Mside = null;
    this.LeftSide = null;
    this.Lside = null;
    this.HalfUp = null;
    this.HfUp = null;
    this.FourImages= null;
    this.FImages = null;
    this.FullImage = null;
    this.FuImages = null;
    this.TwoImages = null;
    this.TImages = null;
    this.HalfDown = null;
    this.hfDown = null;
    this.dataList1 = [];
    this.dataList=[];
    this.CategoryProducts=[];
    this.category = [];
    this.Boxcategory= [];
    this.productId= null;
    this.Id=null;
    this.selectedVal='';
    this.footer= [];
    this.FeatureProduct=[];
    this.list=[];
    this.ipAddress = "";
    this.NewsletterHeading="to our newsletter"
    this.Newsletterdescription="Get the latest news, updates and special offers."
    this.active = true;
    this.active2 = false;
    this.selectedItem = 0;
    this.slanguage='';
    this.Url='';
    this.news='';
    this.showSpinnerDiv=false
    this.SpinnerMoodId=0
    //10, 9, 6 ,2
    this.SpinnercatelogueId=0;
    this.SpinnerproductId=0
    this.SpinnervarientId=0;
    this.newarray=[];
    this.cancelCount=+localStorage.getItem("CancelCount")
    this.recent=[];
    this.iconCategory=[];
  }
  public clone(): HomePageComponentModel {
    let clonedModel: HomePageComponentModel = new HomePageComponentModel(this.sanitizer);
    clonedModel.bought=null;
    clonedModel.relatedProducts=[];
    clonedModel.likeProducts=[];
    clonedModel.display = 'none';
    clonedModel.showDiv = false
    clonedModel.spinOnce = 1
    clonedModel.colors = []; //10, 9, 6 ,2
   clonedModel.audio= new Audio();
    clonedModel.prizeToWin=''
    clonedModel.prizes = [];
    clonedModel.spinner= [];
    clonedModel.ModalImage = 'assets/img/newsletter-img.jpg';
    clonedModel.ComporeProduct= [];
    clonedModel.HomeCtegoryList = [];
    clonedModel.DealList = [];
    clonedModel.ProductList=[];
    clonedModel.searchValue='';
    clonedModel.child=false;
    clonedModel.banner = [];
    clonedModel.image1 = null;
    clonedModel.image2 = null;
    clonedModel.image3 = null;
    clonedModel.image4= null;
    clonedModel. view= null;
    clonedModel.Rightside = null;
    clonedModel. Rside= null;
    clonedModel.Middleside = null;
    clonedModel.Mside = null;
    clonedModel.LeftSide = null;
    clonedModel.Lside = null;
    clonedModel.HalfUp = null;
    clonedModel.HfUp = null;
    clonedModel.FourImages= null;
    clonedModel.FImages = null;
    clonedModel.FullImage = null;
    clonedModel.FuImages = null;
    clonedModel.TwoImages = null;
    clonedModel.TImages = null;
    clonedModel.HalfDown = null;
    clonedModel.hfDown = null;
    clonedModel.dataList1 = [];
    clonedModel.dataList=[];
    clonedModel.CategoryProducts=[];
    clonedModel.category = [];
    clonedModel.Boxcategory= [];
    clonedModel.productId= null;
    clonedModel.Id=null;
    clonedModel.selectedVal='';
    clonedModel.footer= [];
    clonedModel.FeatureProduct=[];
    clonedModel.list=[];
    clonedModel.ipAddress = "";
    clonedModel.NewsletterHeading="to our newsletter"
    clonedModel.Newsletterdescription="Get the latest news, updates and special offers."
    clonedModel.active = true;
    clonedModel.active2 = false;
    clonedModel.selectedItem = 0;
    clonedModel.slanguage='';
    clonedModel.Url='';
    clonedModel.news='';
    clonedModel.showSpinnerDiv=false
    clonedModel.SpinnerMoodId=0
    //10, 9, 6 ,2
    clonedModel.SpinnercatelogueId=0;
    clonedModel.SpinnerproductId=0
    clonedModel.SpinnervarientId=0;
    clonedModel.newarray=[];
    clonedModel.cancelCount=+localStorage.getItem("CancelCount")
    clonedModel.recent=[];
    clonedModel.iconCategory=[];
    return clonedModel;
  }
}