import { SideCategoryModel, Filter } from '../productlist/productlist.model';
import { Menu } from '../front-end/menus/menu';
import { DomSanitizer, VERSION } from '@angular/platform-browser';

export class DealModel{
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
    slanguage: any
    Variant = {
      init: function (CategoryId, VariantId, VariantOptionId) {
        this.CategoryId = CategoryId;
        this.VariantId = VariantId;
        this.VariantOptionId = VariantOptionId;
      },
    }
    IsGrid: boolean;
    IsList: Boolean = true;
    selectedVariants = [];
    searchData: string = "";
    SortData: string = "NewArrival";
    maincat: SideCategoryModel = new SideCategoryModel();
    abovecat: SideCategoryModel = new SideCategoryModel();
    model: any;
    Url: string;
    productId: any=0;
    ipAddress: any;
    description:string
    Action:string

    constructor(private sanitizer:DomSanitizer)
    {
      this.version = VERSION;
    this.filter = new Filter();
    this.selectedItem="";
  this.selectedSize=0;
  this.selectedReview=0;
        this.selectedCategory=0;
        this.selectedSizeArray = [];
        this.minPriceBox="";
        this.maxPriceBox="";
        this.list=[];
        this. ProductList=[];
        this.child=false;
        this.count = 0; 
        this.page = 1; 
        this.perPage = 10; 
        this.pagesToShow = 10;
        this.pricelist= [];
        this.Products = [];
        this.subCat= "";
        this.Cat="";
        this.CatId=0;
        this.catvalue=0;
        this.isChecked=false;
        this.Variants = [];
        this.slanguage=""
        this.Variant = {
          init: function (CategoryId, VariantId, VariantOptionId) {
            this.CategoryId = CategoryId;
            this.VariantId = VariantId;
            this.VariantOptionId = VariantOptionId;
          },
        }
        this.IsGrid=true;
        this.IsList = true;
        this.selectedVariants = [];
        this.searchData= "";
        this.SortData = "NewArrival";
        this.maincat = new SideCategoryModel();
        this.abovecat = new SideCategoryModel();
        this.model="";
        this.Url="";
        this.productId=0;
        this.ipAddress="";
        this.description=""
        this.Action=""
    }
    public clone(): DealModel {
        let clonedModel: DealModel = new DealModel(this.sanitizer);
       
        clonedModel.version = VERSION;
        clonedModel.filter = new Filter();
        clonedModel.selectedItem="";
        clonedModel.selectedSize=0;
        clonedModel.selectedReview=0;
        clonedModel.selectedCategory=0;
        clonedModel.selectedSizeArray = [];
        clonedModel.minPriceBox="";
        clonedModel.maxPriceBox="";
        clonedModel.list=[];
        clonedModel. ProductList=[];
        clonedModel.child=false;
        clonedModel.count = 0; 
        clonedModel.page = 1; 
        clonedModel.perPage = 10; 
        clonedModel.pagesToShow = 10;
        clonedModel.pricelist= [];
        clonedModel.Products = [];
        clonedModel.subCat= "";
        clonedModel.Cat="";
        clonedModel.CatId=0;
        clonedModel.catvalue=0;
        clonedModel.isChecked=false;
        clonedModel.Variants = [];
        clonedModel.slanguage=""
        clonedModel.Variant = {
          init: function (CategoryId, VariantId, VariantOptionId) {
            this.CategoryId = CategoryId;
            this.VariantId = VariantId;
            this.VariantOptionId = VariantOptionId;
          },
        }
        clonedModel.IsGrid=true;
        clonedModel.IsList = true;
        clonedModel.selectedVariants = [];
        clonedModel.searchData= "";
        clonedModel.SortData = "NewArrival";
        clonedModel.maincat = new SideCategoryModel();
        clonedModel.abovecat = new SideCategoryModel();
        clonedModel.model="";
        clonedModel.Url="";
        clonedModel.productId=0;
        clonedModel.ipAddress="";
        clonedModel.description=""
        clonedModel.Action=""
        return clonedModel;
    }

}