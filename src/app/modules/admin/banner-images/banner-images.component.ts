import { Component, OnInit } from '@angular/core';
import { BannerService } from "./banner.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BannerImage } from './BannerImage.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.css']
})
export class BannerImagesComponent implements OnInit {
  beforClick: boolean = true;
  afterClick: boolean = false;
  fileToUpload: File = null;
  
  images: []
  length:number;
notValid:boolean
  constructor(public service: BannerService,
    private toastr: ToastrService, private Router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.service.refreshList().then(res => {
 
      console.log(res)
      this.images = res as [];
     this.length= this.images.length
       
     if( this.length>=7){
      this.notValid=true
     }else{
      this.notValid=false
     }
      this.urls = null;

    });
  }
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  name = 'Angular 4';
  urls = [];
  imageUrl: string = "";
model:BannerImage={
  Id:null,
      Image:'',
      Url:'',
};

  onSelectFile(event) {
      
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          ;
          this.imageUrl = event.target.result;
          this.model.Image=this.imageUrl;
          this.model.Id=0;
          //this.urls.push(event.target.result); 
          if( this.length<=6){
            this.notValid=true
          this.service.postCategory(this.model).subscribe(res => {
            this.toastr.success('Inserted successfully', 'Banner Image !');
            this.ngOnInit();
            
          })
        }else{
          this.notValid=false;
        }
        }
        this.fileToUpload = event.target.files[i]
        reader.readAsDataURL(this.fileToUpload);
        
        

      }




    }}else{
      this.toastr.error('Please select valid Image !');
    }

  }
  //   onSelectFile(event) {
  //    this.beforClick=false
  //  this.afterClick=true;
  //     if (event.target.files && event.target.files[0]) {

  //         var filesAmount = event.target.files.length;
  //         for (let i = 0; i < filesAmount; i++) {
  //                 var reader = new FileReader();

  //                 reader.onload = (event:any) => {
  //                   console.log(event.target.result);
  //                    this.urls.push(event.target.result); 
  //                 }
  //                       this.fileToUpload=event.target.files[i]
  //                         
  //                       this.service.postCategory(this.fileToUpload).subscribe(res => {
  //                         this.toastr.success('Inserted successfully', 'Category !');                                   
  //                     this.ngOnInit();
  //                 reader.readAsDataURL(this.fileToUpload);
  //         })
  //     }

  //   }}
  onClick(id: number) {
   // alert(id);
  }
  onDelete(id: number) {

    this.service.deleteCategory(id).subscribe(
      res=>{this.ngOnInit()
        this.toastr.success('Deleted successfully', 'Banner Image !');
      }
    );

  }
}
