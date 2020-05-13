import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalErrorHandlerService } from 'src/app/shared/services/global-error-handler-service.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit,AfterViewInit {

  constructor(public service:UserService,private toaster:ToastrService
    , private error: GlobalErrorHandlerService,public translate:TranslateService) { }

  ngOnInit() {
    this.service.formModel.reset();

  }
onSubmit(){
  this.service.register().subscribe(
    (res:any)=>{
      if(res.ReturnCode==0){
      //  alert(res.ReturnMessage);
        this.toaster.success(res.ReturnMessage,"New UserCreated");
        this.service.formModel.reset();
      }
      else{
        this.toaster.error(res.ReturnMessage,"User registered");
      }
      },
      (error) => {
        
        this.error.handleError(error);
       
          }
  )
}
ngAfterViewInit() {
  $('[name="front-style"]').attr('disabled', 'disabled');
  $('[name="admin-style"]').removeAttr('disabled');
  }
}
