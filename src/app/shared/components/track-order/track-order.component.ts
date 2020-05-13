import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from './track.service';
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  Url: string;
  PageUrl:string
  RequestUrl:string
  Guid: string;
  description: string;
  Action: string;

    constructor(
        public toastr: ToastrService,
        public Router: Router,
        private route: ActivatedRoute,
        public _service: TrackService,private userLog:UserLogService,
        public tracklog:Tracklog
    ) {
      this.Guid= this.tracklog.newGuid()
      this.PageUrl=  this.Router.url.replace("/","")
     }

    OrderId: any;
    TopData: any;
    OrderDeattails: any[] = [];
    checkoutItems: any[] = [];
    Preparing: any;
    Packed: any;
    Shipped: any;
    Delivered: any;
    TotalAmount: any;
    userId: any;

    ngOnInit() {

        this.userId = window.localStorage.getItem('UserId');
        // if (!(+this.userId > 0))
        //     this.Router.navigate(['/']);

        this.route.queryParams.subscribe(params => {
            this.OrderId = params['orderId'];
        });
        // this.OrderId = window.localStorage.getItem("OrderId");
        if (this.OrderId) {
            this.trackOrder();
        }
        else {
            var lang = localStorage.getItem('browseLang')
            if (lang == 'english') {
                this.errMsg = "Order not found. . .";
            } else {
                this.errMsg = "Orden no encontrada. . .";
            }

        }
        this.Url = this.Router.url;
      this.userLog.UserLog(0, 1, this.Url, 1);
    }
    getproductId(id: number, PvdId: number) {
      console.log(id)
      this.RequestUrl='/RatingReview'
          this.tracklog.handleSuccess1(this.description="View product rating",this.Action="Product rating button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.Router.navigate(['/RatingReview'], { queryParams: { Id: id, ProductVdId: PvdId } });
  }


  goToDetail(Id, variantId) {
      if (+Id && +variantId) {

          this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
          this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

          this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
      }
  }

    errMsg: any;
    trackOrder() {
      if (+this.OrderId) {
          let UserId=+localStorage.getItem('UserId')
          if(!UserId){
            UserId=0;
          }
          this.RequestUrl='shippingGateway/TrackOrder?orderId=' + this.OrderId+'&UserId='+this.userId
          this.tracklog.handleSuccess1(this.description="order tracked by user",this.Action="User track order","Request",this.RequestUrl,this.PageUrl,this.Guid)

          this._service.track(+this.OrderId).subscribe((data: any) => {

              console.log(data)
              if (data == "404") {
                  var lang = localStorage.getItem('browseLang')
                  if (lang == 'english') {
                      this.errMsg = "Order not found. . .";
                  } else {
                      this.errMsg = "Orden no encontrada. . .";
                  }

              }

              var name = "";
if(data.OrderDetail.User!=null)
{
              if (data.OrderDetail.User.MiddleName && data.OrderDetail.User.LastName)
                  name = data.OrderDetail.User.FirstName + " " + data.OrderDetail.User.MiddleName + " " + data.OrderDetail.User.LastName;
              if ((!data.OrderDetail.User.MiddleName) && data.OrderDetail.User.LastName)
                  name = data.OrderDetail.User.FirstName + " " + data.OrderDetail.User.LastName;
              if ((!data.OrderDetail.User.MiddleName) && (!data.OrderDetail.User.LastName))
                  name = data.OrderDetail.User.FirstName;
              if ((data.OrderDetail.User.MiddleName) && (!data.OrderDetail.User.LastName))
                  name = data.OrderDetail.User.FirstName + " " + data.OrderDetail.User.MiddleName;
}

              var address = "";
              if (data.DeliveryAddress.Colony && data.DeliveryAddress.Street && data.DeliveryAddress.City && data.DeliveryAddress.StateName
                  && data.DeliveryAddress.Pincode) {
                  address = data.DeliveryAddress.Colony + "," + data.DeliveryAddress.Street + "," + data.DeliveryAddress.City + "," +
                      data.DeliveryAddress.StateName + " - " + data.DeliveryAddress.Pincode;
              }
              if (data.DeliveryAddress.Colony && (!data.DeliveryAddress.Street) && data.DeliveryAddress.City && data.DeliveryAddress.StateName
                  && data.DeliveryAddress.Pincode) {
                  address = data.DeliveryAddress.Colony + "," + data.DeliveryAddress.City + "," +
                      data.DeliveryAddress.StateName + " - " + data.DeliveryAddress.Pincode;
              }

              if (data.DeliveryAddress.Colony && (data.DeliveryAddress.Street) && data.DeliveryAddress.City && data.DeliveryAddress.StateName
                  && data.DeliveryAddress.Pincode) {
                  address = data.DeliveryAddress.Colony + "," + data.DeliveryAddress.City + "," +
                      data.DeliveryAddress.StateName + " - " + data.DeliveryAddress.Pincode;
              }

              var model = {
                  Name: name,
                  Address: address,
                  Phone: data.DeliveryAddress.PhoneNo,
                  Coins: data.OrderDetail.DiscountForLoyalityPoints,
                  TotalAmount: data.OrderDetail.TotalAmount,
                  DeliveryDate: data.OrderDetail.DeliveryDate
              };
              this.TopData = model;

              this.OrderDeattails = [];

              if (data.checkoutItems.length > 0) {
                  this.checkoutItems = data.checkoutItems;
                  this.errMsg = null;
              }

              switch (data.Status) {
                  case "Preparing": {
                      this.Preparing = "progtrckr-done";
                      this.Packed = "progtrckr-todo";
                      this.Shipped = "progtrckr-todo";
                      this.Delivered = "progtrckr-todo";
                      break;
                  }
                  case "Packed": {
                      this.Preparing = "progtrckr-done";
                      this.Packed = "progtrckr-done";
                      this.Shipped = "progtrckr-todo";
                      this.Delivered = "progtrckr-todo";
                      break;
                  }
                  case "Shipped": {
                      this.Preparing = "progtrckr-done";
                      this.Packed = "progtrckr-done";
                      this.Shipped = "progtrckr-done";
                      this.Delivered = "progtrckr-todo";
                      break;
                  }
                  case "Delivered": {
                      this.Preparing = "progtrckr-done";
                      this.Packed = "progtrckr-done";
                      this.Shipped = "progtrckr-done";
                      this.Delivered = "progtrckr-done";
                      break;
                  }
                  default: {
                      this.Preparing = "progtrckr-todo";
                      this.Packed = "progtrckr-todo";
                      this.Shipped = "progtrckr-todo";
                      this.Delivered = "progtrckr-todo";
                      break;
                  }
              }
  this.tracklog.handleSuccess1(this.description="IconCategory rendering on homepage",this.Action="order tracked by user","Request",this.RequestUrl,this.PageUrl,this.Guid)

          },
  error => this.tracklog.handleError1(error,this.Action="order tracked by user",this.RequestUrl,this.PageUrl,this.Guid)

          )
      }
  }
}
