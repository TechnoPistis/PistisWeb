import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  VariantsModel, ProductCatalogue } from '../../../modules/admin/products/product.model';
import { CommonService } from "../../../shared/services/common.service";
import { SideCategoryModel } from './productlist.model';

import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
  formData:ProductCatalogue;
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(
    private http:HttpClient,
    private router: Router
    ) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  readonly baseuri=new CommonService().getUri();

  getproductsByCategory(Id,page,pageSize)
  {
     
    return this.http.get<ProductCatalogue[]>(this.baseuri+'products/getproductsByCategory?Id='+Id+"&page="+page+"&pageSize="+pageSize);
  }
  getproductsByCategoryData(Id,search,page,pageSize)
  {
     
    return this.http.get<ProductCatalogue[]>(this.baseuri+'products/getproductsByCategoryData?Id='+Id+"&search="+search+"&page="+page+"&pageSize="+pageSize);
  }
  getProductsByMainCat(Id)
  {
    return this.http.get<ProductCatalogue[]>(this.baseuri+'products/getproductsByMainCat?Id='+Id);

  }

  getproductsAllCat(id)
  {
    return this.http.get<SideCategoryModel>(this.baseuri+'products/getproductsSideCat?Id='+id);
  }
  getproductsAboveCat(id)
  {
    return this.http.get<SideCategoryModel>(this.baseuri+'products/getproductsAllCat?Id='+id);
  }
  getbreadcrumb(id)
  {
    return this.http.get<SideCategoryModel>(this.baseuri+'products/getbreadcrumb?Id='+id);
  }

  getVariants(Id)
  {
    return this.http.get<VariantsModel[]>(this.baseuri+'products/getVariants?Id='+Id);

  }

  getFilterProducts(filter,page,pagesize){
    return this.http.post<ProductCatalogue[]>(this.baseuri+'products/getFilterProducts?page='+page+"&pagesize="+pagesize,filter);
    // return this.http.post(this.baseuri+'products/getFilterProducts?page='+page+"&pagesize="+pagesize,filter);
  }
 
  getAdultCheck(catid=0,searchData=""){
    debugger
    if(!searchData){
      searchData=""
    }
    return this.http.get(this.baseuri+'products/checkAdult?catid='+catid+"&searchData="+searchData);
    // return this.http.post(this.baseuri+'products/getFilterProducts?page='+page+"&pagesize="+pagesize,filter);
  }

  public closeNav() {
    
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }
}
