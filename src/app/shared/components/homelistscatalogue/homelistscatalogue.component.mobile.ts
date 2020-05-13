import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/modules/admin/product-category/category.service';
import { MycartService } from '../mycart/mycart.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchTermService } from '../searchterm/search-term.service';
import { UserLogService } from '../../services/user-log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';
import { HomelistscatalogueComponent } from './homelistscatalogue.component';
import { HomelistService } from './homelist.service';

@Component({
  selector: 'app-homelist-mobile',
  templateUrl: './homelistscatalogue.component.mobile.html',
  styleUrls: ['./homelistscatalogue.component.css']
})


export class HomelistMobileComponent extends HomelistscatalogueComponent implements OnInit,AfterViewInit{
    constructor( 
         datepipe: DatePipe,
         http: HttpClient,
         spinner: NgxSpinnerService,
         service: CategoryService, 
         myservice: HomelistService,
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