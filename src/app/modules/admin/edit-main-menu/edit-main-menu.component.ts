import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from "../../../shared/services/common.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from "./menu.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-main-menu',
  templateUrl: './edit-main-menu.component.html',
  styleUrls: ['./edit-main-menu.component.css']
})
export class EditMainMenuComponent implements OnInit {
  id: number;
  data=new CommonService();
  private url=this.data.getUri();
  mainMenuName:string=""
  SpanishmainMenuName:string=""
  ActualIcon:string=""
  Icon:string=""
  res: any;
  fileToUpload: File = null;
  constructor(private route: ActivatedRoute,private http:HttpClient,private toastr : ToastrService
    ,private service:MenuService , private Router: Router) { }


  ngOnInit() {
      
    this.route.queryParams.subscribe(params => {
      this.id = +params['Id'];
      if(this.id){
          
        this.getProduct(this.id)
      }
    })
  }
IsAdult:boolean=false

  handleSelected(event:any){
    debugger
    //var val =event.target.value
  if(this.IsAdult){
    this.IsAdult=false
  }else{
    this.IsAdult=true
  }
  }
  getProduct(id : number){
    
    return this.http.get(this.url + 'category/getProductCategory?Id='+id).subscribe((x:any)=>{
      this.res=x
      this.mainMenuName=this.res.Name
      this.SpanishmainMenuName=this.res.SpanishName
      this.ActualIcon=this.res.ActualIcon
      this.Icon=this.res.Icon
      this.IsAdult=this.res.IsAdult;

    });
   }
   save(){
    var menu:any={
      Id:this.id,
     Name:this.mainMenuName,
     spanishName:this.SpanishmainMenuName,
     ActualIcon:this.ActualIcon,
     Icon:this.Icon,
     IsAdult:this.IsAdult
    }

   this.service.save(menu).subscribe(x=>{
     this.toastr.info("update successfully")
     this.Router.navigate(['/admin/MenuList'])
   })

   
  
  }
  Open(){
    $('#fileDialog').trigger('click');
  }
  onSelectFile(event) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.ActualIcon=event.target.result;
        }
        this.fileToUpload = event.target.files[i]
        reader.readAsDataURL(this.fileToUpload);
      }
    
    }}else{
      this.toastr.error('Please select valid Image !');
    }
  
  }

  Open1(){
    $('#fileDialog1').trigger('click');
  }
  onSelectFile1(event) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.Icon=event.target.result;
        }
        this.fileToUpload = event.target.files[i]
        reader.readAsDataURL(this.fileToUpload);
      }
    
    }}else{
      this.toastr.error('Please select valid Image !');
    }
  
  }
}
