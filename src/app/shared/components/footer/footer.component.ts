import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from "../../services/common.service";
import { Newsletter } from "src/app/modules/admin/add-to-newsletter/newsletter";
import { UserLogService } from '../../services/user-log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterFrontComponent implements OnInit {
  footer:[]
  formData1:Newsletter
  data=new CommonService();
  url=this.data.getUri();
  ipAddress: any;
  searchValue: string;
  Url: string;
  productId: any=0;
  description:string
  Action:string
  isMobileResolution: boolean=false;
  pageUrl: string;
  requestUrl:string
  Guid: string;
  constructor(private toastr:ToastrService
    ,private Router: Router,private http:HttpClient,private userLog:UserLogService,
    private sanitizer:DomSanitizer, private applicationStateService: ApplicationStateServiceService
    ,public tracklog:Tracklog
    ) {
      this.isMobileResolution=applicationStateService.getIsMobileResolution()
     }

  ngOnInit() {
    this.searchValue=""
    this.getFooter().subscribe(
      res=>{
        this.footer =res as []
        this.tracklog.handleSuccess1(this.description="Footer options rending on footer",this.Action="Footer options rendering",JSON.stringify(res),this.requestUrl,this.pageUrl,this.Guid)
      }
      ,
    error => this.tracklog.handleError1(error,this.Action="Footer options rendering",this.requestUrl,this.pageUrl,this.Guid)
    );
    this.Url = this.Router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  getFooter(){
    let x= this.http.get(this.url+'footer/getFooter',);
    console.log(JSON.stringify(x))
    return x;
  }
  onActivate(event) {
    window.scroll(0,0);
}
  getFooterData(Id:number,val:string,eve:any){
    this.requestUrl="FooterContent"
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.requestUrl,this.pageUrl,this.Guid)

    this.onActivate(eve)

    if(val.includes("Testimonios"))
    {
      if(localStorage.getItem('UserId')!=null)
        this.Router.navigate(['/testimonial']);
      else{
        var lang = localStorage.getItem('browseLang')
        if(lang == 'english'){
          this.toastr.warning("Kindly login to write testimonial");
        }
        else
          this.toastr.warning("Ingrese amablemente para escribir un testimonio");
      }
    }
    else if(val.includes("BLOG"))
    {
      const url = 'http://blog.pistis.com.mx/';
    window.open(url, '_blank');
    }
 else
  this.Router.navigate(['/FooterContent'], { queryParams: { Id: Id ,Name:val} });
  }
  getEmail(email:string){
     let result:boolean
     let UserId:any
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result=  re.test(String(email).toLowerCase());
    if(result){
      UserId=localStorage.getItem('validUser');
     this.http.get('https://api.ipify.org/?format=json').subscribe(data=>
       {
         this.formData1=new Newsletter();
         this.ipAddress=data['ip'];
         this.formData1.IpAddress=this.ipAddress;
         this.formData1.Email=email;
       this.formData1.UserId=UserId as number;
       this.sendata(this.formData1)
       this.searchValue=""
    } )
   }else{
    var lang = localStorage.getItem('browseLang')
    if(lang == 'english'){
      this.toastr.success("Please enter valid Email")
    }else{
      this.toastr.success("Por favor introduzca un correo electrónico válido")
    }
   }
   this.searchValue=""
   }



   sendata(formData:Newsletter){
    if(formData.Id==null){
    formData.UserId=0;
    }
   this.tracklog.handleSuccess1(this.description="Subscribing for newsletter ",this.Action="Newsletter subscribe","Request",this.requestUrl='NewsLetter/addNewsLetter',this.pageUrl,this.Guid)

    return this.http.post(this.url+'NewsLetter/addNewsLetter', formData).subscribe(
      res=>{
        var lang = localStorage.getItem('browseLang')
        if(lang == 'english')
          this.toastr.success("Successfully Subscribed.")
        else
          this.toastr.success("Suscrito exitosamente.")
   this.tracklog.handleSuccess1(this.description="Subscribing for newsletter ",this.Action="Newsletter subscribe",JSON.stringify(res),this.requestUrl='NewsLetter/addNewsLetter',this.pageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Newsletter subscribe",this.requestUrl,this.pageUrl,this.Guid)
    );
  }
}
