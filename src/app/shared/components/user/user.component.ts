import { Component, OnInit, AfterViewInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as $ from "jquery";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit,AfterViewInit  {

  constructor(){}


  ngOnInit() {
  }
  ngAfterViewInit() {
  //  alert()
    $('[name="front-style"]').attr('disabled', 'disabled');
    $('[name="admin-style"]').removeAttr('disabled');
    }
}
