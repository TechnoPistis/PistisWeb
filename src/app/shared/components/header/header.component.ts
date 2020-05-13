import { Component, OnInit, HostListener } from '@angular/core';
import { Menu } from '../front-end/menus/menu';
import { HttpClient } from '@angular/common/http';
import { CommonService } from "../../services/common.service";
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { GetCart } from '../mycart/mycartModel';
import { Service } from '../../../modules/admin/sub-category/service';
import { MycartService } from '../mycart/mycart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonHeaderService } from './header.service';
import { TrackService } from '../track-order/track.service';
import { OrdersService } from '../my-orders/orders.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, pairwise } from 'rxjs/operators';
import { Newsletter } from 'src/app/modules/admin/add-to-newsletter/newsletter';
import { HomePageService } from '../home-page/home-page.service';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { filter } from 'rxjs/operators';
import { Tracklog } from '../../services/Tracklog.service';
@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  description:string
  Action:string
 // keyword = 'name';
//////////
 myControl = new FormControl();
 options: string[] = [];
 filteredOptions: Observable<string[]>;
 NewsletterHeading:any="to our newsletter"
 Newsletterdescription:any="Get the latest news, updates and special offers."
////////
ModalImage = 'assets/img/newsletter-img.jpg';
ModalImageMobile= 'assets/img/newsletter-img-m.jpg';
 keyword = 'name';
  onMain: Boolean;
  menus: Promise<Menu[]>;
  clickedValue: string;
  ProductList: boolean[];
  child: boolean;
  public dataList: any = [];
  category: any = [];
  list: Menu[];
  url = new CommonService().getUri();
  serachValue: string = "";
  CompareItems: [] = []
  CompareItemLength: number
  countCompare: any
  loginCheck: boolean
  hidemainDiv: boolean = false;
  UserName: string
  searchData: string = ''
  mainSelected: any;
  english = 1;
  Spanish = 2;
  slanguage: any;
  CurrentUrl: string = "";
  selectedlang = "espanol"
  UserId =+ localStorage.getItem('UserId');
  Count: any;
  spanish:boolean;
  display = 'none';
  formData1: Newsletter;
cartCheck:boolean=true
serachedItems:[]=[]
searchValue: string="";
subribe:string="Subscribe  to our newsletter"
showNewsletter:boolean=false
  isMobileResolution: boolean=false;
  previousUrl: string="";
  currentUrl: string;
  Guid: string;
  RequestUrl: string;
  PageUrl: string;
//countries:any
  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private Router: Router,
    public service: MycartService,
    private _srevice: HomePageService,
    private toastr: ToastrService,
    public commonHeaderService: CommonHeaderService,
    private route: ActivatedRoute,
    public _service: TrackService,
    private order_service: OrdersService,
    public applicationStateService:ApplicationStateServiceService,
    public tracklog:Tracklog,
  ) {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl= "header"
    this.currentUrl = this.Router.url;
    this.Router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
    //translate.addLangs(['espanol', 'english']);
    translate.addLangs(['espanol', 'english']);
    let languageValue = localStorage.getItem("browseLang");
    if (languageValue == null) {
      this.translate.setDefaultLang('espanol');
      languageValue = 'espanol';
    }
    else
      this.translate.setDefaultLang(languageValue);
    this.language(languageValue)
    if(languageValue== 'espanol'){
      this.subribe="Suscríbete"
      this.NewsletterHeading="a nuestro boletín de noticias"
      this.Newsletterdescription="Recibe las últimas noticias, actualizaciones y ofertas especiales."
    }else{
      this.subribe="Subscribe"

      this.NewsletterHeading="to our newsletter"
      this.Newsletterdescription="Get the latest news, updates and special offers."
    }
    this.getNewsletterdata()
  }

  handleclick(email:string){
    this.RequestUrl=this.PageUrl
    this.tracklog.handleSuccess1(this.description="Open newsletter",this.Action="newsletter","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.display='block'
    this.tracklog.handleSuccess1(this.description="Opened newsletter",this.Action="newsletter","Opened",this.RequestUrl,this.PageUrl,this.Guid)

  }
  getEmail(email: string) {

    let result: boolean;
    let UserId: any;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (result) {

      UserId = +localStorage.getItem("UserId");
      this.http.get("https://api.ipify.org/?format=json").subscribe(data => {
        this.formData1 = new Newsletter();
        this.ipAddress = data["ip"];
        this.formData1.IpAddress = this.ipAddress;
        this.formData1.Email = email;
        this.formData1.UserId = UserId;
        this.sendata(this.formData1);

        this.searchValue = "";
        this.display = 'none'
      });
    } else {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.info("Please enter valid Email");
      } else {
        this.toastr.info("Por favor introduzca un correo electrónico válido");
      }
    }
  }
  sendata(formData: Newsletter) {
    this.searchValue = "";
      if (formData.UserId == null) {
        formData.UserId = 0;
      }
      var lang = localStorage.getItem("browseLang");
      this.RequestUrl="NewsLetter/addNewsLetter"
      this.tracklog.handleSuccess1(this.description="Subscribe for newsletter",this.Action="Newsletter","Request",this.RequestUrl,this.PageUrl,this.Guid)

      return this.http
        .post(this.url + "NewsLetter/addNewsLetter", formData)
        .subscribe(res => {

          this.searchValue = "";
          this.display = 'none'
          if(res==0){
            if (lang == "english") {
              this.toastr.info("Already subscribed.");
            } else {
              this.toastr.info("Ya suscrito .");
            }
          }else{
          if (lang == "english") {
            this.toastr.info("Successfully Subscribed.");
          } else {
            this.toastr.info("Suscrito con éxito.");
          }
          }
      this.tracklog.handleSuccess1(this.description="Subscribed for newsletter ",this.Action="Newsletter","Subcribed",this.RequestUrl,this.PageUrl,this.Guid)

        }
        ,
      error => this.tracklog.handleError1(error,this.Action="Newsletter",this.RequestUrl,this.PageUrl,this.Guid)


        );
    }
  onCloseHandled(email:any) {

    this.searchValue=""
    this.display = 'none';
    ///this.http.get("https://api.ipify.org/?format=json").subscribe(data => {
     // this.ipAddress = data["ip"];
   // })
  //  let UserId = +localStorage.getItem("UserId");
   // this._srevice.checkCancelCounter(UserId, this.ipAddress, 1).subscribe()

  }
  language(val: string) {
    //this.translate.setDefaultLang('espanol');
    localStorage.setItem("browseLang", val)
    this.slanguage = localStorage.getItem("browseLang")
    this.translate.use(this.slanguage);
    this.selectedlang = this.slanguage
  }

  languageChangeOnce(val: string) {
    //this.translate.setDefaultLang('espanol');
    localStorage.setItem("browseLang", val)
    this.slanguage = localStorage.getItem("browseLang")
    this.translate.use(this.slanguage);
    window.location.reload()
  }
  appitems: any[] = [];

  ngOnInit() {


    if(this.previousUrl.includes("productcatalogue"))
    {
      this.previousUrl="/"
      window.location.reload();
    }
    this.isMobileResolution = this.applicationStateService.getIsMobileResolution();
    if( $("#menuId").hasClass('hide')  ){
      $("#menuId").removeClass('hide')
    }
    this.http.get("https://api.ipify.org/?format=json").subscribe(data => {
      localStorage.setItem("IpAddress", data["ip"]);
  })
    this.checklanguage()
    if(window.location.href.includes("checkout"))
    {
      this.cartCheck=false
    }
    const UserId =+ localStorage.getItem('UserId');
    if (UserId == undefined || UserId == null||UserId==0) {
      this.hidemainDiv = false
    } else {
      this.hidemainDiv = true
    }
    this.loginCheck = false
    this.logincheck()
    this.RequestUrl="compare/getCompareProducts"
    this.getCompareProducts().subscribe(res => {

      //alert(JSON.stringify(res))
      this.countCompare = localStorage.getItem("compareCount")
      this.CompareItems = res as []
     // console.table(this.CompareItems)
      this.CompareItemLength = this.CompareItems.length

      this.tracklog.handleSuccess1(this.description="getting compare products",this.Action="Compare products",JSON.stringify(res),this.RequestUrl,this.PageUrl,this.Guid)

    },
    error => this.tracklog.handleError1(error,this.Action="Compare products",this.RequestUrl,this.PageUrl,this.Guid)


    )
    //menu

    this.getcart();
    this.serachValue = localStorage.getItem("searchData");
    localStorage.setItem("searchData", "")

    this.getMenu().subscribe(res => {

      this.list = res as Menu[]
      this.ProductList = this.list.map(x => x.ProductCategory1 !== null)
      var c = 0;
      var lc = 0;
      for (var i of this.list) {
        for (var child of i.ProductCategory1) {
          if (this.slanguage == 'english') {
            if (child.ProductCategory1 != null) {
              for (var lastchild of child.ProductCategory1) {
                if (lc == 0) {
                  var index = this.appitems.findIndex(x => x.label == i.Name);
                  if (index > -1) {
                    this.appitems[index].items.push({ label: child.Name, Id: child.Id, items: [{ label: lastchild.Name, Id: lastchild.Id }] })
                  } else {
                    c = 0;
                    this.appitems.push({ label: i.Name, items: [{ label: child.Name, Id: child.Id, items: [{ label: lastchild.Name, Id: lastchild.Id }] }] })
                  }
                }
                else {
                  var index = this.appitems.findIndex(x => x.label == i.Name);

                  this.appitems[index].items[c].items.push({ label: lastchild.Name, Id: lastchild.Id })
                }
                lc++;
              }
              this.child = true;
              c++;
              lc = 0;
            } else {
              this.child = false;
              this.appitems.push({ label: i.Name, Id: i.Id })
            }
          }

          else {

            if (child.ProductCategory1 != null) {
              for (var lastchild of child.ProductCategory1) {
                if (lc == 0) {
                  var index = this.appitems.findIndex(x => x.label == i.SpanishName);
                  if (index > -1) {
                    this.appitems[index].items.push({ label: child.SpanishName, Id: child.Id, items: [{ label: lastchild.SpanishName, Id: lastchild.Id }] })
                  } else {
                    c = 0;
                    this.appitems.push({ label: i.SpanishName, items: [{ label: child.SpanishName, Id: child.Id, items: [{ label: lastchild.SpanishName, Id: lastchild.Id }] }] })
                  }
                }
                else {
                  var index = this.appitems.findIndex(x => x.label == i.SpanishName);

                  this.appitems[index].items[c].items.push({ label: lastchild.SpanishName, Id: lastchild.Id })
                }
                lc++;
              }
              this.child = true;
              c++;
              lc = 0;
            } else {
              this.child = false;
              this.appitems.push({ label: i.SpanishName, Id: i.Id })
            }


          }
        }
      }
    });
    this.getcategory().toPromise().then(
      res => {

        this.category = res as []

      }
    );

    //Notifications-----get
    this.getNotifications();
    this.commonHeaderService.getSearchTerms().subscribe((x:any)=>{

//this.countries=JSON.stringify(x)
this.serachedItems=x as []
this.serachedItems.forEach((element:any) => {

  this.options.push(element.name)
});
    })

    //////////
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    ///////

  }
  //////////

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  ////////////


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
  NotificationLength: any = 0;
  Notifications: any[] = [];

  getNotifications() {
    if (+this.customerId) {
      this.commonHeaderService.Count(this.customerId).subscribe(c=>{
        this.Count=c;
      })
      this.RequestUrl="notification/getUsersNotifications?userId="+this.customerId
      this.tracklog.handleSuccess1(this.description="getting user notifictions",this.Action="Notifications","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.commonHeaderService.getUserNotification(this.customerId, null).subscribe((data: any) => {

        this.NotificationLength = data.length;
        this.Notifications = [];
        this.Notifications = data;
        this.tracklog.handleSuccess1(this.description="user notifictions",this.Action="Notifications","added",this.RequestUrl,this.PageUrl,this.Guid)

      },
    error => this.tracklog.handleError1(error,this.Action="Notifications",this.RequestUrl,this.PageUrl,this.Guid)

      )
    }
  }
  seeAllNotification() {

    if (+this.customerId) {
      this.RequestUrl="/AllNotifications"
      this.tracklog.handleSuccess1(this.description="Clicked on my orders",this.Action="My orders","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.Router.navigate(['/AllNotifications']);
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
         // console.log("No such data exists!");
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
        this.ngOnInit();
      }
    }
  }


  goToDetails(notification) {
    var url = notification.TargetURL;
    if (url) {
      var id = url.split('?')[1].split('=')[1];
      if (+id) {
        this.Router.navigate(['/All-deals'], { queryParams: { Id: id } });
        this.ngOnInit();
      }
    }
  }

  removeNotification(id) {
    if (+id) {
      this.commonHeaderService.removeUserNotification(id).subscribe((data: any) => {

        if (data) {
          console.log('notification removed');
          this.ngOnInit();
        }
      })
    }
  }


  compareProduct() {
    this.RequestUrl="Compare products"
    this.tracklog.handleSuccess1(this.description="Clicked on compare products",this.Action="Compare product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    if (this.CompareItemLength >= 2) {
      this.Router.navigate(['/CompareProducts/'])
    }
  }
  ngAfterViewInit() {
    $('[name="admin-style"]').attr('disabled', 'disabled');
    $('[name="front-style"]').removeAttr('disabled');
  }



  productDetail(Id: number, variantId: number) {
    this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
  }
  getMenu() {
    return this.http.get(this.url + 'category/getAllCategory');
  }
  getcategory() {
    return this.http.get(this.url + 'category/getAllCategory');
  }
  getId(id: number) {
$("#menuId").removeClass('hide')
   this.Router.navigate(['/productcatalogue/'], { queryParams: { Id: id } });
    //event.preventDefault();
  }
  mainSearch(CategoryId: number, searchData: string) {

    if ((searchData == "" || searchData == null || searchData == undefined) && (CategoryId==0 || !CategoryId)) {
      this.Router.navigate(['/'])
     // return false;
    }else if(CategoryId>0 &&(searchData == "" || searchData == null || searchData == undefined)){
    localStorage.setItem("searchData", searchData);
    this.searchData = '';
    this.Router.navigate(['/productcatalogue/'], { queryParams: { Id: CategoryId, searchData: searchData } });
  }
  else{
    localStorage.setItem("searchData", searchData);
    this.searchData = '';
    this.Router.navigate(['/productcatalogue/'], { queryParams: { Id: CategoryId, searchData: searchData } });

  }
}
  //MyCart
  customerId: any;
  ipAddress: string;
  cartItem: GetCart[] = [];
  getcart() {
    this.RequestUrl='cart/getCartByCustomer?CustomerId='+this.customerId
    this.tracklog.handleSuccess1(this.description="getting user cart",this.Action="MyCart","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.customerId = parseInt(localStorage.getItem("UserId") == null ? "0" : localStorage.getItem("UserId"))

    this.ipAddress = localStorage.getItem("IpAddress");

    this.service.getCart(this.customerId, this.ipAddress).subscribe(data => {
      var allcart = data as GetCart[];
      var i=allcart.findIndex(x=>x.ShipmentVendor==true)
      this.cartItem=[];
      if(window.location.href.indexOf("checkout") > -1)
      {

        if(i>-1)
       this.cartItem.push(allcart[i])
        else
        this.cartItem=allcart
      }
      else
      {
        if(i>-1)
        {
          this.service.removeItem(allcart[i].CartItemId).subscribe(data => {
            allcart.splice(i,1);
            this.cartItem=allcart
          })

        }
        else
        this.cartItem=allcart
      }
      this.cartItem.forEach(e => {

        e.PriceAfterDiscount=+(e.SellingPrice-(e.SellingPrice*e.Discount/100)).toFixed(2)
        e.TotalAmount=+e.TotalAmount.toFixed(2)
      });
      //  console.table(this.cartItem)
      // alert()
      //this.ngOnInit();
      this.tracklog.handleSuccess1(this.description="getting user cart",this.Action="MyCart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

    })
  }
  update() {
    //
    // this.getCompareProducts().subscribe(res => {
    //
    //   this.countCompare= localStorage.getItem("compareCount")
    //   this.CompareItems = res as []
    //   this.CompareItemLength = this.CompareItems.length

    // })
  }
  removeItem(CartItemId: number) {
    this.RequestUrl='cart/removeItem?id='+CartItemId
    this.tracklog.handleSuccess1(this.description="getting user cart",this.Action="MyCart","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.removeItem(CartItemId).subscribe(data => {

      let url = this.Router.url;
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.success("Removed item successfully.");
      } else {
        this.toastr.success("Se eliminó el elemento correctamente.");
      }
      if (url == "/mycart") {
        window.location.reload();
        //this.Router.navigate(['/mycart'])
        //this.Router.onSameUrlNavigation='reload';
      }
      else {
        this.getcart();
        this.ngOnInit();
      }

    })
  }
  PlaceOrder(){
    debugger
    this.service.placeOrderChecking( this.cartItem[0].Id ).subscribe((data:any)=>{
      debugger

      if(data.some(function(obj){return obj.IsStockAvailable===false}))
      {
        var lang = localStorage.getItem("browseLang");
        data.forEach(e => {
          if(!e.IsStockAvailable)
          {
            if (lang == "english") {
              this.toastr.warning(
                "currently " +
                e.MaxStock +
                " units is available in stock."
              );
            } else {
              this.toastr.warning(
                "actualmente " +
                e.MaxStock +
                " unidades Está disponible en stock."
              );
            }
          }
        });
      }
      else
      {
        if(this.UserId>0)
        this.Router.navigate(['/checkout-process/checkout']);
        else
        this.Router.navigate(['/checkout-process/checkout-login'])
      }
    })
  }
  //End MyCart
  getCompareProducts() {
    let UserId: any = +localStorage.getItem("UserId");
    var IpAddress = localStorage.getItem("IpAddress")
    if (UserId == null) {
      UserId = 0
    }
    return this.http.get(this.url + "compare/getCompareProducts?UserId=" + UserId + "&IpAddress=" + IpAddress)
  }
  getProductDetails1(variantId: number) {
    let UserId =+ localStorage.getItem('UserId')
    let IpAddress = localStorage.getItem('IpAddress')
    return this.http.get(this.url + "category/AddWishListProduct?variantId=" + variantId + "&UserId=" + UserId + "&IpAddress=" + IpAddress)
  }
  //   @HostListener('document:mouseout', ['$event'])
  //   mouseout(event: MouseEvent) {
  //
  //     var target = event.target || event.srcElement;
  //     var id = target['id']
  //   if(id=='btnCompare'){
  //     this.getCompareProducts().subscribe( async res => {

  //       this.countCompare= localStorage.getItem("compareCount");
  //       this.CompareItems = res as [];
  //       this.CompareItemLength = await this.CompareItems.length;
  //   //    this.ngOnInit();
  //     })
  //    }
  // //
  //   }
  logincheck() {

    this.UserName = localStorage.getItem('UserName')
    let userCheck = localStorage.getItem('UserId');
    if (userCheck == null) {
      this.loginCheck = false
    } else {
      if(this.UserName){
      this.loginCheck = true
      }else{

        localStorage.removeItem('UserName')
        localStorage.removeItem('UserId')
        localStorage.removeItem('RoleId')
      }
    }
  }

  deleteCompareproduct(Id: number, index) {
    this.RequestUrl="compare/DeleteCompare?Id=" + Id
    this.tracklog.handleSuccess1(this.description="Delete product from cart",this.Action="Remove cart product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    return this.http.get(this.url + "compare/DeleteCompare?Id=" + Id).subscribe(x => {
      if (x == 1) {

        this.CompareItems.splice(index, 1);
        this.CompareItemLength = this.CompareItems.length
        this.ngOnInit()
        var lang = localStorage.getItem('browseLang')
        if (lang == 'english') {
          this.toastr.success("Product removed.")
        } else {
          this.toastr.success("Producto eliminado.")
        }

      }
      this.tracklog.handleSuccess1(this.description="Delete product from cart",this.Action="Remove cart product","deleted",this.RequestUrl,this.PageUrl,this.Guid)

    }
    ,
    error => this.tracklog.handleError1(error,this.Action="Remove cart product",this.RequestUrl,this.PageUrl,this.Guid)



    )
  }
  logout() {
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    localStorage.removeItem('RoleId')

    this.Router.navigate(['/customer/UserLogin'])
  }
  selectedItem(event) {

    var data = event;
    $('#tab_default_1').toggleClass('active');
    $('#menuId').addClass('hide');
    this.getId(event.Id);
  }

  ToggleMobileMenu(Id: string) {


    for(let i=1;i<9;i++){
      if("tab_default_"+i==Id)
      {
      $('#' + Id).toggleClass('active');
      } else{
      $('#' + "tab_default_"+i).removeClass('active');
      }
    }
  }
  ///////////santosh sir/////////////////////
  OrderId: any = 143;
  TopData: any;
  OrderDeattails: any[] = [];
  checkoutItems: any[] = [];
  Preparing: any;
  Packed: any;
  Shipped: any;
  Delivered: any;
  TotalAmount: any;

  trackOrder() {

    this.order_service.getOrders().subscribe((response: any[]) => {

      var orders = response;
    });

    if (+this.OrderId) {
      this._service.track(this.OrderId).subscribe((data: any) => {

        var model = {
          Name: data.OrderDetail.User.FirstName + " " + data.OrderDetail.User.LastName,
          Address: data.DeliveryAddress.Address + "," + data.DeliveryAddress.City + "," +
            data.DeliveryAddress.Pincode,
          Phone: data.DeliveryAddress.PhoneNo,
          Coins: data.OrderDetail.DiscountForLoyalityPoints,
          TotalAmount: data.OrderDetail.TotalAmount,
          DeliveryDate: data.OrderDetail.DeliveryDate
        };
        this.TopData = model;

        this.OrderDeattails = [];

        if (data.checkoutItems.length > 0) {
          this.checkoutItems = data.checkoutItems;
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
      })
    }

  }
  keyDownFunction(event, CategoryId: number, searchData: string) {
    if (event.keyCode == 13) {
      this.mainSearch(CategoryId, searchData)
    }
  }


  getDealId(dealId:number){

    if(dealId==0)
    window.location.href="/dealscatalogue?Id=0"

    this.Router.navigate(["/dealscatalogue"], { queryParams: { Id: dealId} });
  }
  goToProfile(){
    this.RequestUrl='/MyProfile'
    this.tracklog.handleSuccess1(this.description="Clicked on my profile",this.Action="Myprofile","Request",this.RequestUrl,this.PageUrl,this.Guid)
    localStorage.setItem("reqLink","/MyProfile" )
  }
  goToOrders(){
    this.RequestUrl='/MyOrders'
    this.tracklog.handleSuccess1(this.description="Clicked on my orders",this.Action="Myorders","Request",this.RequestUrl,this.PageUrl,this.Guid)

    localStorage.setItem("reqLink","/MyOrders" )
  }
  goToWishlist(){
    this.RequestUrl='/wishlist'
    this.tracklog.handleSuccess1(this.description="Clicked on my wishlist",this.Action="Mywishlist","Request",this.RequestUrl,this.PageUrl,this.Guid)

    localStorage.setItem("reqLink","/wishlist" )
  }


  //auto complete

  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
    selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
  getNewsletterdata(){
    //this.RequestUrl='NewsLetter/getNewsletterImage'
  //this.tracklog.handleSuccess1(this.description="Newsletterdata rendering on homepage",this.Action="Newsletterdata rendering","Request",this.RequestUrl=this.PageUrl,this.PageUrl)

    this.commonHeaderService.getNewsletterData().subscribe((x:any)=>{
      debugger
     // this.myViewModel.news=x
     if(x){
      this.ModalImage=x.Image
  this.Newsletterdescription=x.Description
  this.NewsletterHeading=x.HeaderName
     }else{
      this.ModalImage = 'assets/img/newsletter-img.jpg';
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.subribe="Suscríbete"
        this.NewsletterHeading="a nuestro boletín de noticias"
        this.Newsletterdescription="Recibe las últimas noticias, actualizaciones y ofertas especiales."
      }else{
        this.subribe="Subscribe"

        this.NewsletterHeading="to our newsletter"
        this.Newsletterdescription="Get the latest news, updates and special offers."
      }
     }
  //this.tracklog.handleSuccess1(this.description="Newsletterdata rendering on homepage",this.Action="Newsletterdata rendering",JSON.stringify(x),this.RequestUrl=this.PageUrl,this.PageUrl)

    }
    //,
    //error => this.tracklog.handleError1(error,this.Action="Newsletterdata list rendering",this.RequestUrl=this.PageUrl,this.PageUrl)
    )
  }

}
