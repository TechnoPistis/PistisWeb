import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  VariantsModel, ProductCatalogue } from '../../../modules/admin/products/product.model';
import { CommonService } from "../../../shared/services/common.service";

import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomelistService {
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


  getVariants(Id)
  {
    return this.http.get<VariantsModel[]>(this.baseuri+'products/getVariants?Id='+Id);

  }

  getFilterProducts(filter,page,pagesize){
    return this.http.post<ProductCatalogue[]>(this.baseuri+'homelists/getFilterProducts?page='+page+"&pagesize="+pagesize,filter);
  }
  public openNav() {
    this.appDrawer.open();
  }

}
