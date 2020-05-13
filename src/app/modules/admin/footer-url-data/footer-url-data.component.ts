import { Component, OnInit, DebugElement } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Footer } from "./footer";
import { NgForm } from '@angular/forms';
import { CommonService } from "../../../shared/services/common.service";
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'src/app/modules/admin/image-cropper/interfaces/index';

import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-footer-url-data',
  templateUrl: './footer-url-data.component.html',
  styleUrls: ['./footer-url-data.component.css']
})

export class FooterUrlDataComponent implements OnInit {
  formData:Footer
  config: any;
editor:string;
imageUrl: string = "/assets/1234.png";
public dataList:any=[];
selectedVal: string;
Id:number
data:Footer
list:Footer[]
filterFooterData:Footer
uri=new CommonService();
private url=this.uri.getUri();
  FooterUrl: any;
  constructor(private toastr:ToastrService,private http:HttpClient,private Router: Router,private route: ActivatedRoute
    ) { }
 

  ngOnInit() {
    this.resetForm()
    this.refreshList().then(data=>{ 
      
      this.dataList=data;
      this.route.queryParams.subscribe(params => {
          
        this.Id = params['Id'];
        if(this.Id>0){
        this.FooterUrl=params['FooterUrl'];
     this.getFooterurldata(this.Id);
        }
     

  });
  })
}
populateForm(footerData:  Footer) {
 // alert(JSON.stringify(footerData));
  
  this.formData = Object.assign({}, footerData);
  this.formData.FooterUrlId= this.FooterUrl
  
}
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.formData={
        Id:0,
      Data:"",
      FooterUrlId:0,
      FooterUrl:null,
      IsActive:null
      }

  }
  onSubmit(form: NgForm) {
      
    if(this.Id>0 || this.Id!=undefined)
    form.value.Id=this.Id
    if (form.value.Id == null || form.value.Id == 0)
      this.saveData(form.value);
    else
     this.updateData(form.value);
  }

  refreshList(){
    
    return  this.http.get(this.url+'FooterUrl/getFooterUrlData')
    .toPromise().then(res=>this.list= res as Footer[])
  }
  public onChange( event: CKEditor4.EventInfo ) {
    
    this.editor=event.editor.getData() 
    
    this.data.Data=event.editor.getData() 
    console.log(this.data.Data);

}
saveData(formData:Footer){
 
 formData.Id=0

   
 this.checkIdData(formData.FooterUrlId).then((res:any)=>{
    
   if(res==1){
      
return this.http.post(this.url+'FooterUrlData/saveFooterUrlData', formData).toPromise().then(
    res=>
        {
   // alert(this.editor)
            this.toastr.info('Data successfully', 'Saved !'),
            this.Router.navigate(['/admin/footerUrlDataList/'])
         }
);
   }else{
      
    this.toastr.info('Already Saved data for this footer!')
   }
})
 

}
checkIdData(Id:number){
  return this.http.get(this.url+'FooterUrlData/FooterUrlData?Id='+Id).toPromise()
}
updateData(formData:Footer){
  
 return this.http.post(this.url+'FooterUrlData/saveFooterUrlData', formData).toPromise().then(
   res=>
   {
    // alert(this.editor)
     this.toastr.info('Data successfully', 'Updated !'),
     this.Router.navigate(['/admin/footerUrlDataList/'])
   }
 );
 }
getFooterurldata(Id:number){

   this.http.get(this.url+'FooterUrlData/getOneFooterUrlData1?Id='+Id).subscribe(res=>{
      
    this.filterFooterData=res as Footer
    
    console.log(this.filterFooterData.Data)
    
    this.formData = Object.assign({}, this.filterFooterData);
  }
 )
}
onClick(){
  this.Router.navigate(['/admin/footerUrlDataList']);
}

///
imageChangedEvent: any = '';
croppedImage: any = '';
canvasRotation = 0;
rotation = 0;
scale = 1;
showCropper = false;
containWithinAspectRatio = false;
transform: ImageTransform = {};
showbutton=false
imageUrl1=""
linkCol:boolean=false
enableCrop:boolean=false
image:ImageCroppedEvent
fileToUpload: File = null;
handleSelected($event) {

  if ($event.target.checked === true) {
  // Handle your code
  this.enableCrop=true
  }else{
    this.enableCrop=false
  }
}

fileChangeEvent(event: any): void {
   
 this.linkCol=false

  this.showbutton=true
    this.imageChangedEvent = event;
  
}
onProfilePicUpload(event: any) {
   
 // this.showbutton=true
 this.linkCol=false
  if (event[0].dataURL) {
    this.imageUrl = event[0].dataURL;
     
  }
 // this.imageChangedEvent = event;

}
imageCropped(event: ImageCroppedEvent) {
  
    this.croppedImage = event.base64;
    this.imageUrl  = event.base64;
    console.log(event);
}
getImageUrl(){
   
 var obj= new img()
 obj.imageUrl=this.imageUrl

   this.http.post(this.url+'FooterUrlData/getLink',obj).subscribe((x:any)=>{
      
     this.imageUrl1=x.imageUrl
     this.linkCol=true
   })
}
imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
}

loadImageFailed() {
    console.log('Load failed');
}

rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
}

rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
}

private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
}


flipHorizontal() {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
}

flipVertical() {
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
}

// resetImage() {
//     this.scale = 1;
//     this.rotation = 0;
//     this.canvasRotation = 0;
//     this.transform = {};
// }
resetImage() {
  
  this.scale = 1;
  this.rotation = 0;
  this.canvasRotation = 0;
  this.transform = {};
}


zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation(id:any) {
  
  this.rotation=+id
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
}
shape:any=true
Filter(event:any){
  var val=event.target.value
  if(val==1)
  {
this.shape=true
  }else{
this.shape=false
  }
}

}
export class img{
  imageUrl:string;
}
