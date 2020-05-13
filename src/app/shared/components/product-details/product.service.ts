import { Injectable } from '@angular/core';
import { CommonService } from "./../../services/common.service";
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private url = new CommonService().getUri();
  constructor(private http: HttpClient,
    private title: Title, private meta: Meta  ) {

  }
  getProducttags(productId:any){
    return this.http.get(this.url + "tag/getTagsFront?productId="+productId)
    }
    getImages(Id:number,variantId:number)
    {
      return this.http.get(this.url+"productdetail/getImages?Id=" + Id + "&variantId=" + variantId)
    }
    getDetails(Id:number,variantId:number)
    {
      return this.http.get(this.url+"productdetail/getDetails?Id=" + Id + "&variantId=" + variantId)
    }
    getVariants(Id:number,variantId:number)
    {
      return this.http.get(this.url+"productdetail/getVariants?Id=" + Id + "&variantId=" + variantId)
    }
    getReviews(Id:number,variantId:number)
    {
      return this.http.get(this.url+"productdetail/getReviews?Id=" + Id + "&variantId=" + variantId)
    }
    getSpecifications(variantId:number)
    {
      return this.http.get(this.url+"productdetail/getSpecifications?variantId=" + variantId)

    }
  getProductDetails(Id: number, variantId: number) {
    return this.http.get(this.url + "category/getProductDetails?Id=" + Id + "&variantId=" + variantId)
  }
  getProductDetails2(model:any) {
    return this.http.post(this.url + 'category/getProductReview',model)
  }

  getVariantDetails(Id: number, productId: number) {
    
    return this.http.get(this.url + "category/getImages?Id=" + Id + "&productId=" + productId)
  }

  filterVariantDetails(productID:any,optionId:any){
    return this.http.get(this.url + "category/filterVariantDetails?productID=" + productID + "&optionId=" + optionId)
  }
addtags(productId:any,val:string){

    return this.http.get(this.url + "tag/AddTag?productId=" + productId + "&tagname=" + val)

}
  
  getCompareProducts() {
      
    let UserId:any= localStorage.getItem('UserId')
  if(UserId==null){
    UserId =0
   }
    var IpAddress = localStorage.getItem("IpAddress")
    return this.http.get(this.url + "compare/getCompareProducts?UserId=" + UserId + "&IpAddress=" + IpAddress)
  }
  
  getProductDetails1( variantId: number) {
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
     let IpAddress=localStorage.getItem('IpAddress')
    return this.http.get(this.url + "category/AddWishListProduct?variantId=" + variantId +"&UserId=" + UserId +"&IpAddress=" + IpAddress)
  }
  deleteproduct(VarientId:number){
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
    var IpAddress=localStorage.getItem("IpAddress")
    return this.http.get(this.url+"category/deleteWishProduct?VarientId="+VarientId+"&UserId=" + UserId +"&IpAddress=" + IpAddress)
  }
  checkWishlist(VarientId:number){
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
    var IpAddress=localStorage.getItem("IpAddress")

    return this.http.get(this.url+"category/checkWishList?VarientId="+VarientId+"&UserId=" + UserId +"&IpAddress=" + IpAddress)
  }
  SaveCompareProduct(VarientId:number){
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
       
    var IpAddress=localStorage.getItem("IpAddress")
    return this.http.get(this.url + "compare/SaveCompareProduct?variantId=" + VarientId+ "&UserId=" + UserId +"&IpAddress=" + IpAddress)
 
  }
  deleteCompareproduct(VarientId:number){
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
    var IpAddress=localStorage.getItem("IpAddress")
    return this.http.get(this.url + "compare/DeleteCompare?variantId="+VarientId + "&UserId=" + UserId +"&IpAddress=" + IpAddress)
  }
  getLikeProducts(Id){
    return this.http.get(this.url+'products/getLikeProducts?ProductId='+Id)
}
getRecentlyBoughtItem(Id){
  return this.http.get(this.url+'home/getRecentlyBoughtItem?UserId='+Id)

}
getRelatedItems(Id){
  return this.http.get(this.url+'home/getRelatedItems?ProductId='+Id)
}

  updateTitle(title: string) {
      
    this.title.setTitle(title);
  }
  
  updateOgUrl(url: string) {
      
    this.meta.updateTag({ name: 'og:url', content: url })
  }
  
  updateDescription(desc: string) {
      
    this.meta.updateTag({ name: 'description', content: desc })
  }
  
  

}
