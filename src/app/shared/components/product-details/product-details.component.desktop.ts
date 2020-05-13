import {Component,OnInit,HostListener,ViewChild} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, Data, NavigationEnd } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserLogService } from "src/app/shared/services/user-log.service";
import { ProductService } from "./product.service";
//import { Product } from "./product";
//import { } from "node_modules/ng-drift/lib/ng-drift.js";
import { CartItem, MyCart } from "../mycart/mycartModel";
import { MycartService } from "../mycart/mycart.service";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { SideCategoryModel } from "../productlist/productlist.model";
import { ProductlistService } from "../productlist/productlist.service";
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Tracklog } from '../../services/Tracklog.service';
import { ProductDetailsModel } from './product-details.component.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { ProductDetailsComponent } from './product-details.component';

@Component({
  selector: "app-product-details-desktop",
  templateUrl: "./product-details.component.desktop.html",
  styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsDesktopComponent extends ProductDetailsComponent implements OnInit {
 
  constructor(
     tracklog:Tracklog,
     datepipe: DatePipe,
     toastr: ToastrService,
     Router: Router,
     route: ActivatedRoute,
     http: HttpClient,
     userLog: UserLogService,
     productService: ProductService,
     cartservice: MycartService,
     shipService: ShippingGatewayService,
     myservice: ProductlistService,
     googleAnalyticsService:GoogleAnalyticsService,
     sanitizer:DomSanitizer,
     applicationStateService:ApplicationStateServiceService,
  ) {
      super(tracklog,datepipe,toastr,Router,route,http,userLog,productService,cartservice,shipService,myservice,googleAnalyticsService,sanitizer,applicationStateService)
  }
  ngOnInit(){
     debugger
    super.loadView();
  }
}