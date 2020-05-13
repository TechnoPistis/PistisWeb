import { ProductlistComponent } from './productlist.component';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/modules/admin/product-category/category.service';
import { ProductlistService } from './productlist.service';
import { MycartService } from '../mycart/mycart.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchTermService } from '../searchterm/search-term.service';
import { UserLogService } from '../../services/user-log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';

@Component({
  selector: 'app-productlist-mobile',
  templateUrl: './productlist.component.mobile.html',
  styleUrls: ['./productlist.component.css']
})


export class ProductlistMobileComponent extends ProductlistComponent implements OnInit,AfterViewInit{
    constructor( 
         datepipe: DatePipe,
         http: HttpClient,
         spinner: NgxSpinnerService,
         service: CategoryService, 
         myservice: ProductlistService,
         cartservice: MycartService, 
         route: ActivatedRoute, 
         Router: Router, 
         toastr: ToastrService, 
         serviceTerm: SearchTermService,
         userLog:UserLogService,
         sanitizer:DomSanitizer,
         applicationStateService:ApplicationStateServiceService,
       tracklog:Tracklog,
      ) 
        {
          super(datepipe,http,spinner,service,myservice,cartservice,route,Router,toastr,serviceTerm,userLog,sanitizer,applicationStateService,tracklog)
         }
  @ViewChild('appDrawer',{static:false}) appDrawer: ElementRef;
         ngOnInit(){
           super.loadView()
         }
         ngAfterViewInit() {
          
          this.myservice.appDrawer = this.appDrawer;
        } 
}