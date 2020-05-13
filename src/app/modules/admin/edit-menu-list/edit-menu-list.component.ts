import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { EditListService } from './edit-list.service';
import { Service } from './service';


@Component({
  selector: 'app-edit-menu-list',
  templateUrl: './edit-menu-list.component.html',
  styleUrls: ['./edit-menu-list.component.css']
})

export class EditMenuListComponent implements OnInit {
  datalist:Service[]
  list:Service[]
  filter:any
  data:Service
  fileToUpload: File;
  parentLIst:any
  imageUrl: string = "/assets/1234.png";
  menulistId:number
    constructor(public service:EditListService,private toastr: ToastrService, private Router: Router, private route: ActivatedRoute) { }
  
    menListData:any
  
    ngOnInit() {
        
      this.service.getParentList().subscribe((x:any)=>{
this.parentLIst=x as []
      })
      this.resetForm()
// this.menListData=JSON.parse(localStorage.getItem('MenuList'))
// this.data.SeconedLevelName=this.menListData.MenuName
// this.data.SeconedLevelId=this.menListData.subCategoryId
this.route.queryParams.subscribe(params => {
this.menulistId = params['Id'];

 })
   
this.service.getMenuDetails(this.menulistId).subscribe((x:any)=>{
    
  
this.data.FirstLevelId=x.FirstLevelId;
this.data.SeconedLevelId=x.SeconedLevelId;
this.data.FirstLevelSpanishName=x.FirstLevelSpanishName
this.data.SeconedLevelSpanishName=x.SeconedLevelSpanishName
this.data.ThridLevelSpanishName=x.ThridLevelSpanishName
this.data.ThridLevelId=x.ThridLevelId;
this.data.FirstLevelName=x.FirstLevelName
this.data.SeconedLevelName=x.SeconedLevelName
this.data.ThridLevelName=x.ThridLevelName
//this.data.FirstLevlList=x.FirstLevlList
this.data.SeconedLevelparentId=x.SeconedLevelparentId
this.data.ThridLevelparentId=x.ThridLevelparentId
this.data.Image=x.Image
this.imageUrl=x.Image

})
     
      this.service.getMenulist().then(x=>
        {this.datalist=x as Service[]
      // 
     
     // console.log(this.datalist)
      }
  
      )
   //   console.log(this.filter)
    }
    //reset
    resetForm(form?: NgForm) {
      if (form != null)
        form.resetForm();
        this.data={
          Id:0,
    FirstLevelName:'',
  ///  FirstLevlList:[],
    SeconedLevelName:'',
    Image:'',
  //  SeconedLevlList:[],
    ThridLevelName:'',
    FirstLevelId:0,
    SeconedLevelId:0,
    ThridLevelId:0,
    SeconedLevelparentId:0,
    ThridLevelparentId:0,
    FirstLevelSpanishName:"",
    SeconedLevelSpanishName:"",
    ThridLevelSpanishName:""

        }
    }
    // onChange(subId:number){
    //   alert(subId)
    // }
  insertRecord(form: NgForm) {
      
    if(this.imageUrl!=undefined || this.imageUrl!='' ||this.imageUrl!=null)
    form.value.Image=this.imageUrl

    form.value.FirstLevelId=this.data.FirstLevelId
    form.value.SeconedLevelId=this.data.SeconedLevelId
    form.value.ThridLevelId=this.data.ThridLevelId
    this.service.saveCategory(form.value).subscribe(res => {
  
      this.toastr.success('Menu Inserted successfully');
  
     this.Router.navigate(['/admin/MenuList']);
    });
  }
  onSubmit(form: NgForm) {
     
      this.insertRecord(form);
  }
  handleFileInput(event) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if (typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif') {
      if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event: any) => {
            ;
            //this.urls.push(event.target.result); 
            this.imageUrl = event.target.result;
          }
          this.fileToUpload = event.target.files[i];



          reader.readAsDataURL(this.fileToUpload);
          //})
        }

      }
    } else {
      this.toastr.error('Please select valid Image !');
    }

  }
  
  }
