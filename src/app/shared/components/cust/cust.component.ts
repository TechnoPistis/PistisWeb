import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-cust',
  templateUrl: './cust.component.html',
  styleUrls: ['./cust.component.css']
})
export class CustComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    //  alert()
      $('[name="front-style"]').attr('disabled', 'disabled');
      $('[name="admin-style"]').removeAttr('disabled');
      }
}
