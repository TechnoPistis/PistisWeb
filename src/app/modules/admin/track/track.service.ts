import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  data = new CommonService();
  baseuri = this.data.getUri();
  constructor(private http: HttpClient) { }
  getCategories6() {
    return this.http.get(this.baseuri + 'UserLog/productDetailPageTrack');
  }

   getBestSellers(pageName) {
    return this.http.get(this.baseuri + "newdash/getHomeActions?PageName="+pageName);
  }
  getHomeMobileActions(pageName) {
    return this.http.get(this.baseuri + "newdash/getHomeMobileActions?PageName="+pageName);
  }

  getCategories() {
    return this.http.get(this.baseuri + 'UserLog/trackwishProd');
  }
  getCategories2() {
    return this.http.get(this.baseuri + 'UserLog/trackCompareProducts');
  }
  getCategories3() {
    return this.http.get(this.baseuri + 'UserLog/trackHeader');
  }
  getCategories4() {
    return this.http.get(this.baseuri + 'UserLog/trackfooter');
  }
  getCategories5() {
    return this.http.get(this.baseuri + 'UserLog/trackMyProfile');
  }
  getCategories1(val:number) {
    return this.http.get(this.baseuri + 'UserLog/getById?Id='+val);
  }
  getFailedTransactions(){
    return this.http.get(this.baseuri + "newdash/getFailedTransactions");
  }
  getFailedMobileTransactions(){
    return this.http.get(this.baseuri + "newdash/getFailedMobileTransactions");
  }
  getUserIds(){
    return this.http.get(this.baseuri+'UserLog/filterUser')
  }
  enable()
  {
    return this.http.get(this.baseuri+'UserLog/Enable')

  }
  getCustomerLogin(){
    return this.http.get(this.baseuri+'UserLog/trackUserLogin')

  }
  trackUserRegistration(){
    return this.http.get(this.baseuri+'UserLog/trackUserRegistration')

  }
  trackAllnotification(){
    return this.http.get(this.baseuri+'UserLog/trackAllnotification')

  }
  trackallreviews(){
    return this.http.get(this.baseuri+'UserLog/trackallreviews')

  }
  //trackdealscatalogue
  trackdealscatalogue(){
    return this.http.get(this.baseuri+'UserLog/trackdealscatalogue')

  }
  trackconfirmation(){
    return this.http.get(this.baseuri+'UserLog/trackconfirmation')

  }
  //MyOrders
  trackMyOrders(){
    return this.http.get(this.baseuri+'UserLog/trackMyOrders')

  }
  ErrorsTacking(){
    return this.http.get(this.baseuri+'UserLog/ErrorsTacking')

  }
  getFilterAccordingDate(val:any,pageName=""){
    return this.http.get(this.baseuri+'UserLog/getFilterDate?Date='+val+"&pageName="+pageName)
  }
  getFilterAccordingDateanduser(val:any,UserId){
    return this.http.get(this.baseuri+'newdash/getFilterFailedTransactions?date='+val+"&UserId="+UserId)
  }
  getMObileFailedTransactions(val:any,UserId){
    return this.http.get(this.baseuri+'newdash/getMObileFailedTransactions?date='+val+"&UserId="+UserId)
  }
  getFilterUserDate(val:any){
    return this.http.get(this.baseuri+'UserLog/filterUser?Date='+val)


  }
  getFilterAccordingRequest(req){
    return this.http.get(this.baseuri+'newdash/getFilterAccordingRequest?req='+req)
  }

  getFilterAccordingRequestMobile(req){
    return this.http.get(this.baseuri+'newdash/getFilterAccordingRequestMobile?req='+req)
  }

  getFilterAccordingRequestandpage(req,pageName){
    return this.http.get(this.baseuri+'newdash/getFilterAccordingRequestandpage?req='+req+'&PageName='+pageName)

  }
  getFilterAccordingRequestandpageMobile(req,pageName){
    return this.http.get(this.baseuri+'newdash/getFilterAccordingRequestandpageMobile?req='+req+'&PageName='+pageName)

  }
getOneActionFilter(action:string){
  return this.http.get(this.baseuri+'newdash/getOneActionFilter?Action='+action)

}
getPageDateFilter(val:any,UserId,pageName){
  return this.http.get(this.baseuri+'newdash/getPageDateFilter?date='+val+"&UserId="+UserId+"&PageName="+pageName)
}
getPageDateMobileFilter(val:any,UserId,pageName){
  return this.http.get(this.baseuri+'newdash/getPageDateMobileFilter?date='+val+"&UserId="+UserId+"&PageName="+pageName)
}

getPageDateFilter1(){
  return this.http.get(this.baseuri+'UserLog/getPageDateFilter1')
}
getPageDateFilter2(val:string){
  return this.http.get(this.baseuri+'UserLog/getPageDateFilter2?date='+val)
}

getOneActionFilterData(pageName:string,actionName:string){
  return this.http.get(this.baseuri+'newdash/getActionData?Pagename='+pageName+'&ActionName='+actionName)

}
getMobileActionData(pageName:string,actionName:string){
  return this.http.get(this.baseuri+'newdash/getMobileActionData?Pagename='+pageName+'&ActionName='+actionName)

}
getThridFilter(val:string,actionName:string,date:any,UserId){
  return this.http.get(this.baseuri+'newdash/filterUserLogs?val='+val+"&actionName="+actionName+"&date="+date+"&UserId="+UserId)

}
filterMObileUserLogs(val:string,actionName:string,date:any,UserId){
  return this.http.get(this.baseuri+'newdash/filterMObileUserLogs?val='+val+"&actionName="+actionName+"&date="+date+"&UserId="+UserId)

}
getFilter(){
  return this.http.get(this.baseuri+'UserLog/getFilterData')
}
getLiveDataFilter(date:any,userId){
  return this.http.get(this.baseuri+'UserLog/liveDateFilter?date='+date+'&date2='+userId)
}
getCountry(){
  debugger
  return this.http.get(this.baseuri+'UserLog/getCountriesss')
}
getmostVistedpage(val){
  return this.http.get(this.baseuri+'UserLog/getmostVistedpage?val='+val)
}
getmostVisitedProduct(val){
  return this.http.get(this.baseuri+'UserLog/getmostVisitedProduct?val='+val)
}
getSubNreg(val:string){
  return this.http.get(this.baseuri+'UserLog/getSubNregval?val='+val)
}
getSales(val:string){
  return this.http.get(this.baseuri+'UserLog/getSales?val='+val)
}
getOrders(val:string){
  return this.http.get(this.baseuri+'UserLog/getOrders?val='+val)
}
}
