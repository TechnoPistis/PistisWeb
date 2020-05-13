import { Category } from '../../../modules/admin/product-category/category';
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