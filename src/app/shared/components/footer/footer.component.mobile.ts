import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from "src/app/modules/admin/add-to-newsletter/newsletter";
import { DomSanitizer } from '@angular/platform-browser';
import { FooterFrontComponent } from './footer.component';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { ApplicationStateServiceService } from 'src/app/shared/services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer.component.mobile.html',
  //styleUrls: ['./footer.component.css']
})
export class FooterFrontMobileComponent  extends FooterFrontComponent {
  footer:[]
  formData1:Newsletter
  data=new CommonService();
  url=this.data.getUri();
  ipAddress: any;
  searchValue: string;
  Url: string;
  productId: any=0;
  constructor( toastr:ToastrService
    , Router: Router, http:HttpClient, userLog:UserLogService,
     sanitizer:DomSanitizer,  applicationStateService: ApplicationStateServiceService
     ,public tracklog:Tracklog
    ) {super(toastr,Router,http,userLog,sanitizer,applicationStateService, tracklog)}
  }