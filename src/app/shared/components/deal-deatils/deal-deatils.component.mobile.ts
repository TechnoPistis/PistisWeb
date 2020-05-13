import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from 'src/app/shared/services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';
import { DealDeatilsComponent } from './deal-deatils.component';
import { DatePipe } from '@angular/common';
import { CategoryService } from 'src/app/modules/admin/product-category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealService } from './deal.service';
import { MycartService } from '../mycart/mycart.service';
import { SearchTermService } from '../searchterm/search-term.service';
import { UserLogService } from '../../services/user-log.service';
@Component({
  selector: 'app-deal-mobile',
  templateUrl: './deal-deatils.component.mobile.html',
  styleUrls: ['./deal-deatils.component.css']
})
export class DealDetailsMobileComponent  extends DealDeatilsComponent implements AfterViewInit {
  
  constructor( datepipe: DatePipe,
     http: HttpClient,
     spinner: NgxSpinnerService,
     service: CategoryService,  myservice: DealService,  cartservice: MycartService,  route: ActivatedRoute,  Router: Router,  toastr: ToastrService,  serviceTerm: SearchTermService, userLog:UserLogService
    ,   tracklog:Tracklog,
    sanitizer:DomSanitizer,  applicationStateService: ApplicationStateServiceService,
    ){
super(datepipe,http,spinner,service,myservice,cartservice,route,Router,toastr,serviceTerm,userLog,tracklog,sanitizer,applicationStateService)
    }
    ngAfterViewInit() {
      this.myservice.appDrawer = this.appDrawer;
    } 
  }