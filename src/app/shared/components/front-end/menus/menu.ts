export class Menu {
    Id:number;
    Name:string;
    SpanishName:string;
    ShipmentVendor:boolean
    ShipmentTime:number
    ShipmentCost:number
    ParentId:number|null;
    Icon:string;
    IsActive:boolean;
    Parent:Menu
    ProductCategory1:Menu[]
}
