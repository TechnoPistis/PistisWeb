import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';

@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.css']
})
export class ConfirmorderComponent implements OnInit {
  subscription: any;
  message: any;
  Url: any;
  productId: number=0;

  constructor(private route: ActivatedRoute,private messageService: MessageService,private router:Router,private userLog:UserLogService,private tracklog:Tracklog) { }
status:any;
Model: any;
UserId:number
noUser:boolean=false
englang:boolean=false
SpanishLanguage=false

PageUrl:string
RequestUrl:string
Guid: string;
description: string;
Action: string;

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl=  this.router.url.replace("/","")
    var lang = localStorage.getItem('browseLang')

    if (lang == 'english') {
      //this.toster.warning("Invalid email!");
this.englang=true
    } else {
this.SpanishLanguage=true
   //   this.toster.warning('invalido email!');
    }

    this.UserId = +localStorage.getItem("UserId");
    if( this.UserId){
this.noUser=true
    }else{
      this.noUser=false
    }

    this.subscription = this.messageService.getMessage().subscribe(message => {

      this.message = message;

    });
    this.RequestUrl='confirmation'
    this.tracklog.handleSuccess1(this.description="Order confirmation page product details",this.Action="Order confimation page","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.messageService.currentMessage.subscribe(message =>{

      this.message = message;
    this.tracklog.handleSuccess1(this.description="Order confirmation page product details",this.Action="Order confimation page","added",this.RequestUrl,this.PageUrl,this.Guid)

    });
    //alert(JSON.stringify(this.message))
    this.Url = this.router.url;
    this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  sendTotrak(){
    this.RequestUrl='/trackorder'
    this.tracklog.handleSuccess1(this.description="User tracking oder",this.Action="User clicked on track user.","Request",this.RequestUrl,this.PageUrl,this.Guid)

    //this.router.navigate(["/trackorder?orderId="+this.message.OrderId]);
    this.router.navigate(['/trackorder'], { queryParams: { orderId: this.message.OrderId } });
  }
//  OrderId
  }


