import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./register.service";
import { ToastrService } from 'ngx-toastr';
import { GlobalErrorHandlerService } from 'src/app/shared/services/global-error-handler-service.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { Tracklog } from 'src/app/shared/services/Tracklog.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  Url: string;
  productId: any=0;
  description:string
  Action:string
TermCond:boolean=false
PageUrl:string
  RequestUrl:string
  Guid: string;
  constructor(private toaster:ToastrService
    , private error: GlobalErrorHandlerService,public translate:TranslateService,
    public service:RegisterService, private route: ActivatedRoute,private router: Router,private userLog:UserLogService,
    public tracklog:Tracklog) { }

  ngOnInit() {
    this.Guid=this.tracklog.newGuid()
    this.PageUrl=  this.router.url.replace("/","");
    this.service.formModel.reset();
    this.Url = this.router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  onSubmit(){
    // if(this.TermCond=true){
    //   return false
    // }
    this.RequestUrl='user/registerCustomer'
    this.tracklog.handleSuccess1(this.description="New UserCreated",this.Action="User registered","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.register().subscribe(
      (res:any)=>{
        if(res.ReturnCode==0){
          this.tracklog.handleSuccess1(this.description="New UserCreated",this.Action="User registered","added",this.RequestUrl,this.PageUrl,this.Guid)

     //    this.tracklog.handleSuccess(this.description="New UserCreated",this.Action="User registered",JSON.stringify(res))
          var lang = localStorage.getItem('browseLang')
          if(lang == 'english'){
            this.toaster.success(res.ReturnMessage,"New UserCreated");
          }else{
            this.toaster.success(res.ReturnMessage,"Nuevo usuario creado");
          }

          this.router.navigate(['/customer/UserLogin'])
          this.service.formModel.reset();
        }
        else{
          var lang = localStorage.getItem('browseLang')
          this.tracklog.handleError2("Registered User",this.Action="Login",this.RequestUrl,this.PageUrl,this.Guid)

         // this.tracklog.handleSuccess(this.description="User already registered",this.Action="Registered User",JSON.stringify(res))

          if(lang == 'english'){
            this.toaster.error(res.ReturnMessage,"Registered User");
          }else{
            this.toaster.error(res.ReturnMessage,"Usuario Registrado");
          }

        }
        },
        (error) => {

      //    this.error.handleError(error);
          this.tracklog.handleError1(error,this.Action="Registered User",this.RequestUrl,this.PageUrl,this.Guid)


            }
    )
  }
  toggleVisibility(e){
    if(e.target.checked){
this.TermCond=false
    }else{
      this.TermCond=true
    }

  }
  ngAfterViewInit() {
    $('[name="front-style"]').attr('disabled', 'disabled');
    $('[name="admin-style"]').removeAttr('disabled');
    }
}
