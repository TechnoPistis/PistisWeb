import { shippingModel } from '../manage-address/shippingModel';
import { MyCart, GetCart } from '../mycart/mycartModel';
import { CheckoutComponent } from './checkout1.component';
import { Usermodel } from '../user/usermodel';
export class LoginCheckout {
    
    CustomerId: number;
    IpAddress: string;
    SelectedShippingId: number;
    BillingAddressId:any;
    ShippingType:any;
    ShippingPrice:any;
    DeliveryDate:Date;
    Shipping: shippingModel;
    Cart: GetCart[];
    Status:string;
    PaymentId:string;
    CardData:CardData;
    OrderId:any;
    TotalPrice:any
}
export class RegisterCheckout {
    IpAddress: string;
    SelectedShippingId: string;

    User: Usermodel;
    Shipping: shippingModel;
    Cart: MyCart;
}

export class shipping{
    Id:number;
    UserId:number;
    IpAddress:string;
    Address:string;
    Name:string;
    PhoneNo:string;
    Pincode:string;
    City:string;
    StateId:number;
    StateName:string;
    LandMark:string;
    CountryId:number;
    CountryName:string;
    AddressType:string;
    IsActive:boolean;
    IsDefault:boolean;
    Street:string;
    Street1:string;
    Street2:string;
    Colony :string;
    Email:string;
    OutsideNumber:any;
    InteriorNumber:any;

}
export class CardData{
    cardNumber:string;
    cardholderName:string;
    email:string;
    securityCode:string;
    cardExpirationYear:string
    Amount:number
    cardExpirationMonth:number
    ProductName:string
    //payment info
    token:string;
    installments:number;
    installmentRate:number;
    paymentMethodId:string;
    installmentamount:number;
    userId:number;
    IssuerId:string;
    Description:string;
    CartId: any;
}
