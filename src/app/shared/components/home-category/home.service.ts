import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  getOrderNumberCount(){
   return this.http.get(this.url+'homeCategory/orderNumberCount')
  }
getListDetails(listDetails:any){
  return this.http.post(this.url+'homeCategory/SaveListName',listDetails)
}
deactivateCustomer(id : number){
     
  return this.http.get(this.url + 'homeCategory/deactivate?Id='+id);
 }
 getAllList(){
  return this.http.get(this.url+'homeCategory/getAllLists')
}
getProducts(Id:any){
  return this.http.get(this.url+'homeCategory/getProducts?Id='+Id)
}
saveProducts(model:any){
  return this.http.post(this.url+'homeCategory/saveproducts',model)
}
getHomeCategoryProducts(homeCategoryId:number){
return this.http.get(this.url+'homeCategory/getHomelist?Id='+homeCategoryId)
}
getDeleteProduct(homeCategoryId:number,ProductId:number){
  return this.http.get(this.url+'homeCategory/Deleteproducts?homeCategoryId='+homeCategoryId+'&ProductId='+ProductId)
}
checklistName(name:string){
  return this.http.get(this.url+'homeCategory/checkListName?name='+name)

}
getSearchedData(name:any){
  return this.http.get(this.url+'homeCategory/searchedlist?name='+name)

}
}
