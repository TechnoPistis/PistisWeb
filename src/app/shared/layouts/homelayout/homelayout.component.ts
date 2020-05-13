import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";
@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent implements OnInit {

  constructor(public translate: TranslateService, ) {

    translate.addLangs(['espanol', 'english']);
    let languageValue = localStorage.getItem("browseLang");
    if (languageValue == null) {
      this.language('espanol')
    }
    else {
      this.language(languageValue)
    }
  }

  language(val: string) {
      
    this.translate.setDefaultLang('espanol');
    localStorage.setItem("browseLang", val)
    let language = localStorage.getItem("browseLang")
    this.translate.use(language);
  }
  ngOnInit() {
  }
  
  // ngAfterViewInit() {
  //   $('[name="admin-style"]').attr('disabled', 'disabled');
  //   $('[name="front-style"]').removeAttr('disabled');
  // }
}
