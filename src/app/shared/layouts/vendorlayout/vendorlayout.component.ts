import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { VendorLayoutService } from './vendorlayout.service';

@Component({
  selector: 'app-vendorlayout',
  templateUrl: './vendorlayout.component.html',
  styleUrls: ['./vendorlayout.component.css']
})
export class VendorlayoutComponent implements OnInit {
  languageValue: string;
  UserId: number;
  name:any
  constructor(public translate: TranslateService,
    public _route: Router,
    private _service:VendorLayoutService) {
      translate.addLangs(['espanol', 'english']);
    this.languageValue = localStorage.getItem("browseLang");
    if (this.languageValue == null) {
      this.language('espanol')
    }
    else {
      this.language(this.languageValue)
    }

    this.name=localStorage.getItem("UserName")
  }
  language(val: string) {

    this.translate.setDefaultLang('espanol');
    localStorage.setItem("browseLang", val)
    let language = localStorage.getItem("browseLang")
    this.translate.use(language);
  }
  ngOnInit() {
    if (window.localStorage.getItem("RoleId") != "2")
this._route.navigate(["/"]);
else
this.UserId=+window.localStorage.getItem("UserId")
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

  //notification Start
  NotificationLength: any = 0;
  Notifications: any[] = [];
Count:any;
  getNotifications() {
    if (+this.UserId) {
      this._service.Count(this.UserId).subscribe(c=>{
        this.Count=c;
      })
      this._service.getUserNotification(this.UserId, null).subscribe((data: any) => {

        this.NotificationLength = data.length;
        this.Notifications = [];
        this.Notifications = data;
      })
    }
  }

  async watchNotification(Id: any) {

    var notification = this.Notifications.filter(b => b.Id == Id)[0];
    if (notification) {
      var typeId = notification.NotificationTypeId;
      if (!typeId)
        return false;
      switch (typeId) {
        case 2:
          await this.readNotification(notification, typeId);
          break;
        case 7:
          await this.readNotification(notification, typeId);
         // this.goToDetails(notification);
          break;
        default:
         // console.log("No such data exists!");
          break;
      }
    }
  }

  readNotification(notification, typeId) {
    if (notification && notification.Id) {
      this._service.readUserNotification(notification.Id).subscribe((data: any) => {

        if (data) {
          switch (typeId) {
            case 2:
              this.goToOrder(notification);
              break;
            case 7:
              //this.goToDetails(notification);
              break;
            default:
              console.log("No such data exists!");
              break;
          }
          console.log('notification seen');
        }
      })
    }
  }


  goToOrder(notification) {
    var url = notification.TargetURL;
    if (url) {
      var orderID = url.split('?')[1].split('=')[1];
      var fullUrl = window.location.href;
      var cUrl = fullUrl.split('/')[1];
      if (+orderID) {
        this._route.navigate(['/MyOrders'], { queryParams: { orderID: orderID } });
        this.ngOnInit();
      }
    }
  }
//End of notification

}
