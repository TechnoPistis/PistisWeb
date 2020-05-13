import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../services/common.service';
import { HttpClient } from '@angular/common/http';
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.css']
})
export class FooterContentComponent implements OnInit {
  dataList: any;
  id:number;
  description:string
  Action:string
  data=new CommonService();
  private url=this.data.getUri();
  content: any;
  val: any;
  Url: string;
  productId: any;
  guid: string;
  PageUrl:string
  RequestUrl:string
  constructor(private Router: Router,private route: ActivatedRoute,
    private http:HttpClient,private userLog:UserLogService
    ,public tracklog:Tracklog) { }

  ngOnInit() {
    this.guid=this.tracklog.newGuid()
    this.route.queryParams.subscribe(params => {
      this.id = params['Id'];
      this.val=params['Name']
      if(this.id>0){
        this.RequestUrl='FooterUrlData/getOneFooterUrlData?Id='+this.id
this.refreshList(this.id).subscribe(res =>
   {this.content =res
    this.tracklog.handleSuccess1(this.description="Footer data  rendering on footer content page",this.Action="Footer data  rendering",JSON.stringify(res),this.RequestUrl,this.PageUrl,this.guid)
  },
  error => this.tracklog.handleError1(error,this.Action="Footer data  rendering",this.RequestUrl,this.PageUrl,this.guid)

  )

                    }
          }

          )
          this.Url = this.Router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
   }

refreshList(Id:number){
  return this.http.get(this.url+'FooterUrlData/getOneFooterUrlData?Id='+Id)

                    }
}
