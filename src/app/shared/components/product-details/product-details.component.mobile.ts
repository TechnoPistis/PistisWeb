import {Component, OnInit} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserLogService } from "src/app/shared/services/user-log.service";
import { ProductService } from "./product.service";
import { MycartService } from "../mycart/mycart.service";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { ProductlistService } from "../productlist/productlist.service";
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { DatePipe } from '@angular/common';
import { Tracklog } from '../../services/Tracklog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { ProductDetailsComponent } from './product-details.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: "app-product-details-mobile",
  templateUrl: "./product-details.component.mobile.html",
  styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsMobileComponent extends ProductDetailsComponent implements OnInit {
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
    super.loadView();
  }
}