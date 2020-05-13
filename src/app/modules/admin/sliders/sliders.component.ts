import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule, NgForm } from '@angular/forms';
import { SliderService } from "../sliders/slider.service";
import { DatePipe } from "@angular/common";
import { Slider } from './slider';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../product-category/category.service';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'src/app/modules/admin/image-cropper/interfaces/index';
@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {
  fileToUpload: File;
  data1 = new CommonService();
  private url = this.data1.getUri();
  imageUrl: string = "/assets/1234.png";
  formGroup: FormGroup;
  status: any;
  dataList: Slider[];
  cat: Slider;
  data: string;
  today = new Date();
  validDate: boolean
  todaydate: Date = new Date();
  FormValid: boolean = false;
  Id = null
  sliderUrl: boolean = true
  Url: any = ''
  showbutton=false
  constructor(public service: SliderService,
    private toastr: ToastrService, private Router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private http: HttpClient) { }

  ngOnInit() {
      
    this.FormValid == false
    this.resetForm()
    this.service.refreshList1().then((data: any) => {
      this.dataList = data
      this.route.queryParams.subscribe(params => {
        const id = params['Id'];
        this.Id = params['Id'];
        this.cat = this.service.getProduct(id);
        if (id > 0) {
          this.getProduct(id).subscribe(x => {
            this.sliderUrl = false
            this.cat = x as Slider
              
            //this.Url=this.cat.Url
          })
        }
          
        this.imageUrl = this.cat.Image;
        this.croppedImage=    this.imageUrl
        this.data = this.datePipe.transform(new Date(this.cat.FromDateTime), "EEEE, MMMM d, y, h:mm:ss a zzzz");
        this.cat.FromDateTime = new Date(this.data)
        this.data = this.datePipe.transform(new Date(this.cat.ToDateTime), "EEEE, MMMM d, y, h:mm:ss a zzzz");
        this.cat.ToDateTime = new Date(this.data)

        // alert(JSON.stringify(data));
        //  this.populateForm(this.cat);
        this.service.formData.Image = this.cat.Image
        this.service.formData.FromDateTime = this.cat.FromDateTime
        this.service.formData.ToDateTime = this.cat.ToDateTime
        if (this.cat.Url == null)
          this.cat.Url = ''
        this.service.formData.Url = this.cat.Url
      });

    }
    );
  }
  // focusOutFunction(date:Date){
  //   
  //   this.today=new Date();
  //   if(this.today<=date){
  //     this.validDate=false;
  //   }else{
  //     this.validDate=true;
  //   }
  // }
  getProduct(id: number) {
    return this.http.get(this.url + 'sliders/getsliderImagesForBackend?Id=' + id)
  }
  onClick() {
    this.Router.navigate(['/admin/sliderImages']);
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      FromDateTime: null,
      ToDateTime: null,
      Image: "/assets/123.jpg",
      Url: null
    }
    this.Url = ''
  }
  clickEvent() {
    this.status = !this.status;
  }
  onSubmit(form: NgForm) {
    
    var abc=form.value
      if( ! form.value.Image){
        this.toastr.info("Please enter the image")
        return false;
      }
      if( ! form.value.ToDateTime){
        this.toastr.info("Please enter  Date and Time")
        return false;
      }
      if( ! form.value.FromDateTime){
        this.toastr.info("Please enter  Date and Time")
        return false;
      }
      if( ! form.value.Url){
        this.toastr.info("Please enter  Url")
        return false;
      }
      
      form.value.Image = this.imageUrl;
    if(this.Id!=null){
      form.value.Id=this.Id
    }
    if (form.value.Id == null || form.value.Id == 0) {
      form.value.Image = this.imageUrl;
      form.value.Id = 0;
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }
  updateRecord(form: NgForm) {
    
    if( ! form.value.Image){
      this.toastr.info("Please enter the image")
      return false;
    }
    if( ! form.value.ToDateTime){
      this.toastr.info("Please enter  Date and Time")
      return false;
    }
    if( ! form.value.FromDateTime){
      this.toastr.info("Please enter  Date and Time")
      return false;
    }
    if( ! form.value.Url){
      this.toastr.info("Please enter  Url")
      return false;
    }

  //  form.value.Url = this.Url
    form.value.Image = this.imageUrl;
    this.service.updateCategory(form.value)
      .subscribe(res => {
        this.toastr.info('Updated successfully', 'Category !');
        this.resetForm(form);
        this.service.refreshList();
        this.Router.navigate(['/admin/sliderImages']);
      });
  }
  populateForm(cat: Slider) {
      
    if (cat.Url == null)
      cat.Url = 'ahfbjh'
      
    this.service.formData = Object.assign({}, cat);
  


    //this.service.formData.Url=cat.Url;
  }


  insertRecord(form: NgForm) {
      
    // alert(JSON.stringify(form.value))

    this.service.postCategory(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Slider Image !');
      this.resetForm(form);
      this.service.refreshList();
      this.Router.navigate(['/admin/sliderImages']);
    });
  }

  handleFileInput(event) {
    
    this.FormValid = true;
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
            this.croppedImage=event.target.result;
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

  // handleFileInput(file: FileList) {
  //   
  //   this.fileToUpload = file.item(0);

  //   //Show image preview
  //   var reader = new FileReader();
  //   reader.onload = (event:any) => {

  //     this.imageUrl = event.target.result;

  //   }
  //   alert(this.fileToUpload.name)
  //   reader.readAsDataURL(this.fileToUpload);
  // }


  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {

      this.service.deleteCategory(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Slider Image !');
      });
    }
  }



  // export const DateTimeValidator=(fc:FormControl)=>{
  //   const date=new Date(fc.value);
  //   const isValid=!isNaN(date.valueOf());
  //   return isValid ? null :{
  //     isValid:{
  //       isValid:false
  //     }
  //   }
  ///////CROPPERRR////
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
    this.showbutton=true
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    
      this.croppedImage = event.base64;
      this.imageUrl  = event.base64;
      console.log(event);
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



}
