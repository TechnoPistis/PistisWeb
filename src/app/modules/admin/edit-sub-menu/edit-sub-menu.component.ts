import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from "../../../shared/services/common.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-sub-menu',
  templateUrl: './edit-sub-menu.component.html',
  styleUrls: ['./edit-sub-menu.component.css']
})
export class EditSubMenuComponent implements OnInit {

  id: number
  data=new CommonService()
  private url=this.data.getUri();
  SubmenuName:any='';
 SpanishSubmenuName:any=""
  res: any;
  constructor(private route: ActivatedRoute,private http:HttpClient,private toastr : ToastrService , private Router: Router) { }

  ngOnInit() {
      
    this.route.queryParams.subscribe(params => {
      this.id = +params['Id'];
      if(this.id){
          
        this.getProduct(this.id)
      }
    })
  }
IsAdult:boolean=false
  getProduct(id : number){
    
    return this.http.get(this.url + 'category/getProductCategory?Id='+id).subscribe(x=>{
      this.res=x
      this.res=x
      this.SubmenuName=this.res.Name
      this.SpanishSubmenuName=this.res.SpanishName
      this.IsAdult=this.res.IsAdult;
    });
   }
   handleSelected(event:any){
    debugger
    //var val =event.target.value
  if(this.IsAdult){
    this.IsAdult=false
  }else{
    this.IsAdult=true
  }
  }
   save(){
     var item:any={
       Id:0,
      Name:'',
      spanishName:'',
      IsAdult:false
     }
     item.Id=this.id
     item.Name=this.SubmenuName
     item.spanishName=this.SpanishSubmenuName
     item.IsAdult=this.IsAdult
debugger
    //  return this.http.get(this.url +'category/UpdateCategory?Id='+this.id+'&EngMenu='+this.SubmenuName+'&SpanMenu='+ this.SpanishSubmenuName ).subscribe(x=>{
    //    this.toastr.success("Updated Successfully.")
    //    this.Router.navigate(['/admin/MenuList'])
    //  })
      return this.http.post(this.url +'category/updateCategory1',item ).subscribe(x=>{
       this.toastr.success("Updated Successfully.")
       this.Router.navigate(['/admin/MenuList'])
     })
   }

}
