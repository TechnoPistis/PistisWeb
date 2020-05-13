import { Component, OnInit, ViewChild } from "@angular/core";
import { MycartService } from "./mycart.service";
import { GetCart, MyCartModel } from "./mycartModel";
import { ToastrService } from "ngx-toastr";
//import { HeaderComponent } from "../header/header.component";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogService } from '../../services/user-log.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Tracklog } from '../../services/Tracklog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { MycartComponent } from './mycart.component';

@Component({
selector: "app-mycart-desktop",
templateUrl: "./mycart.component.desktop.html",
styleUrls: ["./mycart.component.css"]
})
export class MyCartDesktopComponent extends MycartComponent implements OnInit{
 
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  isMobileResolution: boolean=false;
  model: MyCartModel;
  myViewModel: MyCartModel;
  constructor(
     service: MycartService,
     toastr: ToastrService,
     shipService: ShippingGatewayService,
     spinner: NgxSpinnerService,
     userLog:UserLogService,
     Router:Router,
     tracklog:Tracklog,
     sanitizer:DomSanitizer,
     applicationStateService:ApplicationStateServiceService,
  ) {
      super(service,toastr,shipService,spinner,userLog,Router,tracklog,sanitizer,applicationStateService)
   }
   ngOnInit(){
      super.loadView()
   }
   }