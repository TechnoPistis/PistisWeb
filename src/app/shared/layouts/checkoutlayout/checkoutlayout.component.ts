import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkoutlayout',
  templateUrl: './checkoutlayout.component.html',
  styleUrls: ['./checkoutlayout.component.css']
})
export class CheckoutlayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //if (window.localStorage.getItem("RoleId") != "3")
//this._route.navigate(["/"]);
  }
  ngAfterViewInit() {
    $('[name="admin-style"]').attr('disabled', 'disabled');
    $('[name="front-style"]').removeAttr('disabled');
  }


}
