
export class Product {
  //ptoduct
  Id: number;
  MainCategoryId:any;
  Name: string;
  ProductCategoryId: number;
  VendorId: number;
  UnitId: number;
  //CostPrice: number;
  // CostPrice1: number;
  //SellingPrice: number;
  //Discount: number;
  // Discount1: number;
  //PriceAfterDiscount: number;
  // PriceAfterDiscount1: number;
  Description: string;
  ProductTags: string;
  Barcode: string;
  //unit

  UnitName: string;
  FinalVariants: Variant[];

  VariantModels: VariantModel[];
  VariantImages: VariantImage[];
  FileUploads: [];
  //for list page
  Inventory: string;
  Image: string;
  ProductCategoryName: string;
  SpecificationHeading: string;
  Specification: string;
  ProductSpecifications: ProductSpecification[];

  ProductVariantDetails: ProductVariantDetails[];
  ProductionSpecifications: ProductSpecification[];
  ProductImages:any;
  ShipmentVendor:any
  ShipmentTime:any=0
  ShipmentCost:any
}
export class ProductCatalogue {
  //ptoduct
 // VariantDetailId:number;
  Id: number;
  Name: string;
  ProductCategoryId: number;
  UnitId: number;
  CostPrice: number;
  SellingPrice: number;
  Discount: number;
  PriceAfterDiscount: number;
  Description: string;
  ProductTags: string;
  Barcode: string;
  //unit
  UnitName: string;
  FinalVariants: Variant[];
  
  VariantModels: VariantModel[];
  VariantImages: VariantImage[];
  FileUploads: [];
  //for list page
  Inventory: string;
  Image: string;
  ProductCategoryName: string;
  SpecificationHeading: string;
  Specification: string;
  ProductSpecifications: ProductSpecification[];
  
  ProductVariantDetails: ProductVariantDetails[];
  ProductionSpecifications: ProductSpecification[];
  ProductImages:any;
  VariantOptions:any[];
  PriceList:any[];
  }
  export class VariantOptionModel{
  Id:number;
  VariantId:number;
  Name:string;
  IsActive:boolean;
  Variant:VariantModel[]
  }
  export class Variantmodel{
  Id:number;
  Name:string;
  IsActive:boolean;
  }
export class ProductImages {
  Name: string;
  ImagePath: string;
  IsActive: boolean;
  IsDefault: boolean;
  ProductVariantDetailId:any;
}

export class Variant {
  Variantdata: string;
  VariantOptions: [];
  isdefault: boolean;
  Id: number;
  Name: string;
  VariantOptionsModel: VariantOption[];
  IsActive: boolean;
}
export class VariantOption {
  Id: number;
  VariantId: number;
  Name: string;
  IsActive: boolean;

  varientName: string;
}


export class ProductVariantDetails {
  ProductId: any;
  Id:any;
  InStock: any;
  Price: any;
  IsActive: boolean;
  IsDefault: boolean;
  PriceAfterdiscount:any;
  CostPrice:any;
  Discount:any;
  ProductVariantOptions: ProductVariantOptions[];
  ProductImages: ProductImages[];
  ProductSpecifications: any[];
  ProductSKU:any;
  Weight:any;
  Lenght:any
  Width:any
  Height:any
  
}


export class ProductVariantOptions {
  ProductVariantDetailId: any;
  CategoryVariantId: any;
  VariantOptionId: any;
  IsActive: boolean;
}


export class VariantModel {
  variants: string;
  Price: number;
  quantity: number;
  IsDefault: boolean;
}
export class VariantImage {
  variantValue: string;
  IsDefaultImage: boolean;
  image: string;
  FileUploads: [];
}
export class ProductSpecification {
  SpecificationHeading: string;
  Specification: string;

  HeadingName: string;
  Description: string;
}
export class VariantsModel{
  Id:number;
  Name:string;
  VariantOptions:[];
}
export class searchFilter{
  SearchName:'';
  CategoryId:number=0;
  SubCategoryId:number=0;
  variant_isDefault:boolean=true;
page:number;
pageSize:number;
UserId=0;
RoleId=0;
}
