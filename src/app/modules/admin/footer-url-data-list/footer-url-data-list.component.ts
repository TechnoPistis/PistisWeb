import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Footer } from "./footer";
import {CommonService  } from "../../../shared/services/common.service";
@Component({
  selector: 'app-footer-url-data-list',
  templateUrl: './footer-url-data-list.component.html',
  styleUrls: ['./footer-url-data-list.component.css']
})
export class FooterUrlDataListComponent implements OnInit {
  formData:Footer
  
  editor:string;
  public dataList:any=[];
  selectedVal: string;
  Id:number
  data:Footer
  list:[]
  uri=new CommonService();
  private url=this.uri.getUri();
  constructor(private toastr:ToastrService,private http:HttpClient,private Router: Router,private route: ActivatedRoute
    ) { }

  ngOnInit() {
    
    this.refreshList().subscribe(res=>{
        
      this.list= res as []
      

      }
      )
  }

  refreshList(){
    
    return  this.http.get(this.url+"FooterUrlData/getFooterUrlDatas")
    
  }

  deleteCategory(Id:number){
   // alert(Id)
    return  this.http.get(this.url+"FooterUrlData/deleteFooterUrlData?Id="+Id)
  }
 //delete
 onDelete(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
  
    this.deleteCategory(id).subscribe(res => {
      this.refreshList().toPromise().then(res=>this.list= res as [])
      this.toastr.warning('Deleted successfully', 'Category !');
    });
  }
}
onEdit(FooterUrl:number,Id:number){
 //  alert(FooterUrl+''+Id)
  this.Router.navigate(['/admin/footerUrlData/'],{ queryParams: { FooterUrl:FooterUrl,Id:Id }});
}
onClick(){
  this.Router.navigate(['/admin/footerUrlData']);
}

}
