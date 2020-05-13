import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { VariantOption } from '../../../modules/admin/products/product.model';
import { DomSanitizer } from '@angular/platform-browser';

export class MyCartModel{
    customerId: number;
    ipAddress: string;
    description:string
    Action:string
    cartItem: GetCart[] = [];
    disablebtn: boolean = false;
    Url: any;
  slanguage:any;

   
    constructor(private sanitizer:DomSanitizer) {
       this.Action=""
       this.Url=""
       this.cartItem=[]
       this.customerId=0
       this.description=""
       this.disablebtn=false
        this.ipAddress="" 
        this.slanguage=""       
    }
    public clone(): MyCartModel {
        let clonedModel: MyCartModel = new MyCartModel(this.sanitizer);
        clonedModel.Action=""
        clonedModel.Url=""
        clonedModel.cartItem=[]
        clonedModel.customerId=0
        clonedModel.description=""
        clonedModel.disablebtn=false
        clonedModel.ipAddress=""
        clonedModel.slanguage=""
        return clonedModel
    }
}



export class MyCart {
    Id:number;
     OrderNumber :string;
    AdditionalCost:number;
        UserId :number;
       IpAddress :string;
        OrderDate :Date;
       TotalAmount :number;
       IsConvertToCheckout :boolean;
       CartItems:CartItem[]=[];
       
}
export class CartItem{
    Id:number;
    CartId :number;
    ProductVariantDetailId:number;
    UnitId :number;
    VendorId:number;
    VendorName:string;
     Quantity :number;
    UnitPrice :number;
     Discount :number;
     Amount :number;
     ShipmentVendor:boolean
     ShipmentCost:number
     ShipmentTime:number
}

export class GetCart{
     Id :number;
     OrderNumber:string;
     VendorId:number;
     UserId:number;
    IpAddress:string;
    OrderDate:Date;
     AdditionalCost:number;
    TotalAmount:number;
    IsConvertToCheckout:boolean;
    //From product
     Image :string;
     Name :string;
     ShipmentVendor:boolean
     ShipmentCost:number
     ShipmentTime:number
    Vendor:string;
    ProductId:any;
    //cartitem
     SellingPrice:number;
    PriceAfterDiscount:any;
    Discount:number;
    DealDiscount:number;
    DealQty:number;
    Quantity:number;
    Amount:number;  
    ProductVariantDetailId:number;
    CartItemId:number;
    VendorName:string;

    VariantOptions:VariantOption[];
    CartItems :CartItem[];
    InStock:number;
}
