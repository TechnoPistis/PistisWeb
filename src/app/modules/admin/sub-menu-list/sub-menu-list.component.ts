import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "../../../shared/services/common.service";
@Component({
  selector: 'app-sub-menu-list',
  templateUrl: './sub-menu-list.component.html',
  styleUrls: ['./sub-menu-list.component.css']
})
export class SubMenuListComponent implements OnInit {
  List: any=[];
  id: any;
  count:number
hasChild:boolean
  dataList: any;
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient,private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.id = params['Id'];
      if(this.id>0){
        return  this.http.get(this.url+"category/getChildCategory?Id="+this.id).subscribe(data => {
          ;
          this.List = data as []
          
          if(this.List.length >0){
    this.hasChild=true;
          }else{
            this.hasChild=false
          }
        })
      }
    })
  }

  GetData(Id: number){
    return  this.http.get(this.url+"category/getChildCategory?Id="+Id).subscribe(data => {
      ;
      this.List = data as []
      
      if(this.List.length >0){
this.hasChild=true;
      }else{
        this.hasChild=false
      }
    })
  }
    //delete
    onDelete(id: number) {
      if (confirm('Are you sure you want to delete this record?')) {
  
        this.deleteCategory(id).subscribe(res => {
          this.ngOnInit()
          this.toastr.warning('Deleted successfully', 'Category !');
        });
      }
    }
      
    onClick() {
      this.Router.navigate(['/admin/category']);
    } 
  deleteCategory(id : number){
    return this.http.get(this.url + 'CategoryDelete?id='+id);
   }
}
