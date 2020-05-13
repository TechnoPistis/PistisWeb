import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonHeaderService } from '../header/header.service';
import { Router } from '@angular/router';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.css']
})
export class AllNotificationsComponent implements OnInit {
  Notifications: any;
  spanish: boolean;
  description:string
  Action:string
  PageUrl:string
  RequestUrl:string
  Guid: string;
  constructor(
    private toastr: ToastrService,
    public Router: Router,
    public commonHeaderService: CommonHeaderService,
    public tracklog:Tracklog
  ) { }

  customerId: any;

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl=  this.Router.url.replace("/","")
    this.checklanguage()
    this.customerId = window.localStorage.getItem("UserId");
    this.getAllNotifications();
  }
  checklanguage(){
    var lang = localStorage.getItem("browseLang");
    if (lang == "english") {
          //this.toastr.info("Kindly,register to try luck in future.");
          this.spanish=false
       } else {
         this.spanish=true
         //   this.toastr.info("Por favor, regístrese para probar suerte en el futuro.");
      }
  }
  getAllNotifications() {
    if (+this.customerId) {
      this.RequestUrl='notification/getUsersNotifications?userId='
      this.tracklog.handleSuccess1(this.description="get Users Notifications",this.Action="All notification","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.commonHeaderService.getUserNotification(this.customerId, "all").subscribe((data: any) => {

        this.Notifications = data;
      },
      error => this.tracklog.handleError1(error,this.Action="All notification",this.RequestUrl,this.PageUrl,this.Guid)


      )
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
          this.goToDetails(notification);
          break;
        default:
          console.log("No such data exists!");
          break;
      }
    }
  }

  readNotification(notification, typeId) {
    if (notification && notification.Id) {
      this.commonHeaderService.readUserNotification(notification.Id).subscribe((data: any) => {

        if (data) {
          switch (typeId) {
            case 2:
              this.goToOrder(notification);
              break;
            case 7:
              this.goToDetails(notification);
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
        this.RequestUrl="/MyOrders"
        this.tracklog.handleSuccess1(this.description="Clicked on my orders",this.Action="My orders","Request",this.RequestUrl,this.PageUrl,this.Guid)

        this.Router.navigate(['/MyOrders'], { queryParams: { orderID: orderID } });
      }
    }
  }


  goToDetails(notification) {
    var url = notification.TargetURL;
    if (url) {
      var categoryId = url.split('?')[1].split('=')[1];
      // var ProductId = url.split('?')[2].split('=')[1];
      if (+categoryId) {
        this.Router.navigate(['/All-deals'], { queryParams: { Id: categoryId } });
      }
    }
  }

  removeNotification(id) {
    if (+id) {
      this.RequestUrl='notification/removeUserNotification?id=' + id
      this.tracklog.handleSuccess1(this.description="Remove notification by user",this.Action="User Remove  Notification","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.commonHeaderService.removeUserNotification(id).subscribe((data: any) => {

        if (data) {
          console.log('notification removed');
          this.ngOnInit();
        }
      }
      ,
      error => this.tracklog.handleError1(error,this.Action="User Remove  Notification",this.RequestUrl,this.PageUrl,this.Guid)


      )
    }
  }

  //ondelete
  onDelete(id: number) {
    this.RequestUrl='notification/delete?id=' + id
      this.tracklog.handleSuccess1(this.description="Delete  notification by user",this.Action="Delete Remove  Notification","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.commonHeaderService.delete(id).subscribe(res => {
        this.getAllNotifications();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success('Deleted successfully');

           } else {
            this.toastr.success('Eliminado correctamente')
          }
      }
      ,
      error => this.tracklog.handleError1(error,this.Action="Notifications",this.RequestUrl,this.PageUrl,this.Guid)

      );
  }
}
