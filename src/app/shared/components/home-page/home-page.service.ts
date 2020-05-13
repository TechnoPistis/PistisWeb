import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Slider } from 'src/app/modules/admin/sliders/slider';
import { Home } from './home';
import { CommonService } from "../../services/common.service";
import { CommonModule } from '@angular/common';
@Injectable({
providedIn: 'root'
})
export class HomePageService {
data:Home[]
list:Slider[];
private commonUrl=new CommonService().getUri();
constructor(private http:HttpClient) { }

sliderImages(){
return this.http.get(this.commonUrl+'sliders/getsliderImages1')
}
checkNewsLetterSubscribe(IpAddress:any){
    return this.http.get(this.commonUrl+'NewsLetter/checkIsSubscribed?IpAddress='+IpAddress)

}
getcategory(){
return this.http.get( this.commonUrl+'category/getAllCategory');
}
getCategoryProdcuts(Id:number){
return this.http.get(this.commonUrl+'products/filterProducts/'+Id);
}
getBannerImages(){
return this.http.get(this.commonUrl+'banner/getBannerImages1');
}
getallProdcuts(){
return this.http.get(this.commonUrl+'products/allProducts');
}
filterProducts(Id:Number){

return this.http.get(this.commonUrl+'products/filterProducts?ProductCategoryId='+Id);
}
getFeatureProducts(){
// alert('in')
return this.http.get(this.commonUrl+'FeatureProduct/getFeatureProduct1')
}
getFooter(){

let x= this.http.get(this.commonUrl+'footer/getFooter');
// alert(JSON.stringify(x));
console.log(JSON.stringify(x))
return x;
}

getMenu(){

return this.http.get(this.commonUrl+'category/getAllCategory');
}
getLists(){
    return this.http.get(this.commonUrl+'homeCategory/getLists')
}
getMobileLists(){
    return this.http.get(this.commonUrl+'homeCategory/getMobileLists')

}
getDealLists(){

    return this.http.get(this.commonUrl+'homeCategory/getDealsProducts')

}
getMobileDealLists(){
    return this.http.get(this.commonUrl+'homeCategory/getMobileDealsProducts')

}

checkRegisterSubscribeUser(UserId:any){
    return this.http.get(this.commonUrl+'NewsLetter/checkRegisterIsSubscribed?UserId='+UserId)
}
checkCancelCounter(UserId:number,IpAddress:string,cancelClick:number){
    return this.http.get(this.commonUrl+'NewsLetter/cancelCounter?userId='+UserId+'&IpAddress='+IpAddress+'&cancelClick='+cancelClick)

}
getSpinnerOptions(){
    return this.http.get(this.commonUrl+'Spinner/SpinnerOptionsFront')
  }
  saveSpinnerData(model:any){
    return this.http.post(this.commonUrl+"Spinner/SaveSpinUserData",model)
  }
getNewsletterData(){
    return this.http.get(this.commonUrl+'NewsLetter/getNewsletterImage')

}
getSpinnervarientId(Id:any){
    return this.http.get(this.commonUrl+"Spinner/getproductId?Id="+Id)

  }
  getSpinChance(UserId:number){
    return this.http.get(this.commonUrl+'spinner/CheckSpinChance?UserId='+UserId)
}
checkSpinnerCancelCounter(UserId:number,cancelClick:number){
    return this.http.get(this.commonUrl+'spinner/cancelCounter?userId='+UserId+'&cancelClick='+cancelClick)
}
CheckSpinnerToDisplay(UserId:number)
{
    return this.http.get(this.commonUrl+'spinner/CheckSpinnerToDisplay?userId='+UserId)

}
getRecentlyViewed(UserId:number,IpAddress:string){
    return this.http.get(this.commonUrl+'UserLog/getRecentlyViewed?UserId='+UserId+'&IpAddress='+IpAddress)

}
getRecentlyViewedMobile(UserId:number,IpAddress:string){
    return this.http.get(this.commonUrl+'UserLog/getRecentlyViewedMobile?UserId='+UserId+'&IpAddress='+IpAddress)

}
getIconCategory(){
    return this.http.get(this.commonUrl+'category/getIconCategory')

}
getLikeProducts(){
    var UserId=+localStorage.getItem('UserId')
    var IpAddress=localStorage.getItem('IpAddress')

    return this.http.get(this.commonUrl+'home/getLikeProducts?UserId='+UserId+'&IpAddress='+IpAddress)
}

}
