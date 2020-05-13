import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {
  languageValue: string=null;

  // constructor(public translate: TranslateService,
  //   public _route: Router) {
  //   translate.addLangs(['english', 'español']);
  //   translate.setDefaultLang('english');
  //   const browseLang = translate.getBrowserLang();
  //   translate.use(browseLang.match(/english|español/) ? browseLang : 'english');
  // }

  ngOnInit() {
    if (window.localStorage.getItem("RoleId") != "3")
this._route.navigate(["/"]);
  }
  ngAfterViewInit() {
    $('[name="front-style"]').attr('disabled', 'disabled');
    $('[name="admin-style"]').removeAttr('disabled');
  }

  logout() {
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    localStorage.removeItem('RoleId')
    this._route.navigate(["/"]);
  }

  
  constructor(public translate: TranslateService, 
    public _route: Router) {

    translate.addLangs(['espanol', 'english']);
    this.languageValue = localStorage.getItem("browseLang");
    if (this.languageValue == null) {
      this.language('espanol')
    }
    else {
      this.language(this.languageValue)
    }
  }

  language(val: string) {
      
    this.translate.setDefaultLang('espanol');
    localStorage.setItem("browseLang", val)
    let language = localStorage.getItem("browseLang")
    this.translate.use(language);
  }
  HomeClick(){
    window.location.href="/admin/homeCategory"
  }
  customerReview(){
    window.location.href="/admin/customerReviews"

  }
  ProductReview(){
    window.location.href="/admin/productReviews"

  }
}
