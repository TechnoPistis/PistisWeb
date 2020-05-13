import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneModule, DropzoneConfig, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { BannerUpload } from "./banner-upload";
import { Router, ActivatedRoute } from '@angular/router';
import { BannerUploadService } from "./banner-upload.service";
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'src/app/modules/admin/image-cropper/interfaces/index';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
@Component({
  selector: 'app-banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrls: ['./banner-upload.component.css']
})

export class BannerUploadComponent implements OnInit {
  // firstDiv:boolean;
  // sconedDiv:number;
  // thridDiv:number;
  // fourthDiv:number;
  // fifthDiv:number=5;
  imageCropperOne: boolean = true
  imageCroppertwo: boolean = false
  imageCropperThree: boolean = false
  imageCropperFour: boolean = false
  visibleDiv: string = "Half-Up";
  whichSide: string = "Left"
  image1: any = null
  image2: any = null
  image3: any = null
  image4: any = null
  image1Url: any = null
  image2Url: any = null
  image3Url: any = null
  image4Url: any = null
  currentNumber: number
  model: BannerUpload = new BannerUpload()
  view: string = null
  side: string = null
  fileToUpload: File = null;
  postion: number = 0;
  imageUrl: string[] = [];
  flag: any = 0;
  whichView: string = "Half-Up"

  /////
  image1Button: boolean = false

  /////
  constructor(private toastr: ToastrService, private service: BannerUploadService, private Router: Router) { }

  ngOnInit() {
    //   this.firstDiv=true;
    this.getLeftSide()
   // this.onChange(this.leftSideView, "Left")
    this.resetform()
  }
  leftSideView: any
  CurrentSide:any= "Left"
  getLeftSide() {
     
    this.service.getLeftSideView(this.CurrentSide).subscribe((x:any) => {
       
    //  alert(x)
      this.CurrentSide=x.Side
      this.leftSideView=x.View
      //this.leftSideView = x 
       
this.onChange(this.leftSideView, this.CurrentSide)
    }
    )
  }

  // @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  onChange(val: any, val1: any) {

    this.whichView = val
    this.visibleDiv = val;
    this.model

    this.resetform()
    this.service.editImages(val, val1).subscribe((x: any) => {



      console.table(x)


      if (x.length > 0) {
        x.forEach(element => {

          if (element.Position == 1) {
            this.image1 = element.Image;
            this.image1Url = element.Url
          }
          if (element.Position == 2) {
            this.image2 = element.Image;
            this.image2Url = element.Url

          }

          if (element.Position == 3) {
            this.image3 = element.Image;
            this.image3Url = element.Url

          }
          if (element.Position == 4) {
            this.image4 = element.Image;
            this.image4Url = element.Url

          }

          if (x.length > 0) {
            this.side = x[0].Side
            this.view = x[0].View
          } else {
            this.side = 'Left'
            this.view = 'Half-Up'
          }
          //   if(x.length==1){
          //     if(x[0].Url)
          //   this.image1Url= x[0].Url
          //   }else if(x.length==2){
          //   this.image1Url= x[0].Url
          //   this.image2Url= x[1].Url
          //   }else if(x.length==3){
          //     this.image1Url= x[0].Url
          //     this.image2Url= x[1].Url
          // this.image3Url=x[2].Url
          //   }else if(x.length==4){
          //     this.image1Url= x[0].Url
          //     this.image2Url= x[1].Url
          // this.image3Url=x[2].Url
          // this.image4Url=x[3].Url
          //   }
          // this.resetform()

        });

        // this.image1=x[0].Image
        // this.image2=x[1].Image
        // this.image3=x[2].Image
        // this.image4=x[3].Image
        // this.view=x[0].View
        // this.side=x[0].Side



      } else {
        this.resetform()
        // this.side='Left'
        // this.view='Half-Up'
      }


    })

  }
  resetform() {
    this.image1 = ''
    this.image2 = ''
    this.image3 = ''
    this.image4 = ''
    this.image1Url = ''
    this.image2Url = ''
    this.image3Url = ''
    this.image4Url = ''
    this.image2 = ''
    this.image3 = ''
    this.image4 = ''
    this.model.ImageUrl = []
    this.flag = 0
    // this.side='Left'
    // this.view='Half-Up'
    this.postion = null
    this.model = new BannerUpload()
  }
  openFile(val: number) {

    this.flag++;
    if (this.flag == 1) {
      if (val == 2 || val == 3 || val == 4) {
        this.flag = 0
        this.toastr.info("Please upload image serial wise.")
      }
      else {

        this.postion = val;
        //  $('#fileDialog').trigger('click');
      }
    } else {
      this.postion = val;
      // $('#fileDialog').trigger('click');
    }


  }

  onSelectFile(event, val: string, view: string) {

    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if (typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif') {
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.model.ImageUrl.push(event.target.result);

            this.model.side.push(val)
            this.model.view.push(view)
            this.model.Position.push(this.postion)
            if (this.model.ImageUrl[0] != undefined)
              this.image1 = this.model.ImageUrl[0]
            if (this.model.ImageUrl[1] != undefined)
              this.image2 = this.model.ImageUrl[1]
            if (this.model.ImageUrl[2] != undefined)
              this.image3 = this.model.ImageUrl[2]
            if (this.model.ImageUrl[3] != undefined)
              this.image4 = this.model.ImageUrl[3]
            //this.urls.push(event.target.result); 

          }


          this.model.ImageUrl1 = this.image4Url

          this.fileToUpload = event.target.files[i]
          reader.readAsDataURL(this.fileToUpload);
        }

      }
    } else {
      this.toastr.error('Please select valid Image !');
    }

    console.table(this.model)
  }
  updateOn:boolean=false
  handleSelected(event:any){
if(this.updateOn==false)
this.updateOn=true
else
this.updateOn=false
  }
  onClick() {
   
    if (this.model.ImageUrl.length > 0  &&this.updateOn==false) {

      if (this.image1Url != "")
        this.model.ImageUrl1 = this.image1Url
      //  if( this.model.ImageUrl1)
      // this.model.ImageUrl1=""
      if (this.image2Url != "")
        this.model.ImageUrl2 = this.image2Url
      // if( this.model.ImageUrl2)
      // this.model.ImageUrl2=""
      if (this.image3Url != "")
        this.model.ImageUrl3 = this.image3Url

      // if( this.model.ImageUrl3)
      // this.model.ImageUrl3=""
      if (this.image4Url != "")
        this.model.ImageUrl4 = this.image4Url
      // if( this.model.ImageUrl4)
      //  this.model.ImageUrl4=""

      this.service.postCategory(this.model).subscribe(x => {
        if (x == 1) {
          this.toastr.success('Banner images uploaded successfully');
          
          // this.Router.routeReuseStrategy.shouldReuseRoute = function () {
          //   return false;
          // };
          //this.ngOnInit()
          //this.side='Left'
          //  this.view='Half-Up'
          //    this.resetform()
        }
      })
    }else if (this.updateOn==true && this.model.ImageUrl.length > 0 ){
      if (this.image1Url != "")
      this.model.ImageUrl1 = this.image1Url
    //  if( this.model.ImageUrl1)
    // this.model.ImageUrl1=""
    if (this.image2Url != "")
      this.model.ImageUrl2 = this.image2Url
    // if( this.model.ImageUrl2)
    // this.model.ImageUrl2=""
    if (this.image3Url != "")
      this.model.ImageUrl3 = this.image3Url

    // if( this.model.ImageUrl3)
    // this.model.ImageUrl3=""
    if (this.image4Url != "")
      this.model.ImageUrl4 = this.image4Url
    // if( this.model.ImageUrl4)
    //  this.model.ImageUrl4=""

    this.service.postCategory1(this.model).subscribe(x => {
      if (x == 1) {
        this.toastr.success('Banner images uploaded successfully');
        this.updateOn=false
        // this.Router.routeReuseStrategy.shouldReuseRoute = function () {
        //   return false;
        // };
        //this.ngOnInit()
        //this.side='Left'
        //  this.view='Half-Up'
        //    this.resetform()
      }
    })
    }
    else {

      if (this.image1Url != "")
        this.model.ImageUrl1 = this.image1Url
      if (this.image2Url != "")
        this.model.ImageUrl2 = this.image2Url
      if (this.image3Url != "")
        this.model.ImageUrl3 = this.image3Url
      if (this.image4Url != "")
        this.model.ImageUrl4 = this.image4Url
      this.service.saveurlEdit(this.side, this.view, this.model).subscribe(x => {

        if (x == 1) {
          this.toastr.success('Banner images  url updated successfully');
          //this.ngOnInit()
          //this.side='Left'
          //  this.view='Half-Up'
          //    this.resetform()
        }
      })
    }
  }
  onChangeView(val: string) {

    this.side = val

    this.resetform()
  }
  onEdit(val: string) {

  }


  ///start
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  display = 'none';
  display1 = 'none';
  display2 = 'none';
  display3 = 'none'
  display4 = 'none'
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any, val: string, view: string, numb: any, pos: any): void {

    if (numb == 1) {
      this.imageCropperOne = true
      this.imageCroppertwo = false
      this.imageCropperThree = false
      this.imageCropperFour = false
    } else if (numb == 2) {
      this.imageCropperOne = false
      this.imageCroppertwo = true
      this.imageCropperThree = false
      this.imageCropperFour = false
    } else if (numb == 3) {
      this.imageCropperOne = false
      this.imageCroppertwo = false
      this.imageCropperThree = true
      this.imageCropperFour = false
    } else if (numb == 4) {
      this.imageCropperOne = false
      this.imageCroppertwo = false
      this.imageCropperThree = false
      this.imageCropperFour = true
    }

    this.postion = pos
    this.openFile(pos)
    this.currentNumber = numb
    this.imageChangedEvent = event;
    //start
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if (typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif') {
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;

        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.model.ImageUrl.push(event.target.result);

          this.model.side.push(this.whichSide)
          this.model.view.push(this.whichView)
          this.model.Position.push(this.postion)
          for (let index = 0; index < this.model.Position.length; index++) {
            if (this.model.Position[index] == this.model.Position[index + 1]) {
              this.model.Position.splice(index, 1)
            }

          }

          // if(this.model.ImageUrl[0]!=undefined && number==1)
          //       this.image1=this.model.ImageUrl[0]
          //       if(this.model.ImageUrl[1]!=undefined && number==2 )
          //       this.image2=this.model.ImageUrl[1]
          //       if(this.model.ImageUrl[2]!=undefined && number==3)
          //       this.image3=this.model.ImageUrl[2]
          //       if(this.model.ImageUrl[3]!=undefined && number==4)
          //       this.image4=this.model.ImageUrl[3]

          //this.urls.push(event.target.result); 

        }



        //this.model.ImageUrl1=this.image4Url

        this.fileToUpload = event.target.files[0]
        reader.readAsDataURL(this.fileToUpload);


      }
    } else {
      this.toastr.error('Please select valid Image !');
    }
    console.table(this.model)

  }

  imageCropped(event: ImageCroppedEvent, numb: any) {

    // this.openFile(number)
    if (event.base64) {
      this.currentNumber = numb
      this.croppedImage = event.base64;
      if (this.currentNumber == 1) {
        this.image1Url = this.croppedImage
        this.image1 = this.croppedImage

        this.model.ImageUrl[0] = this.croppedImage
      }

      if (this.currentNumber == 2) {
        this.image2Url = this.croppedImage
        this.image2 = this.croppedImage

        this.model.ImageUrl[1] = this.croppedImage
      }

      if (this.currentNumber == 3) {
        this.image3Url = this.croppedImage
        this.image3 = this.croppedImage

        this.model.ImageUrl[2] = this.croppedImage
      }

      if (this.currentNumber == 4) {
        this.image4Url = this.croppedImage
        this.image4 = this.croppedImage

        this.model.ImageUrl[3] = this.croppedImage
      }

    }
    //this.urls.push(event.target.result); 

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

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  /////////////////////////////
  openModal() {

    this.display = 'block';

  }
  onCloseHandled() {

    this.display = 'none';
    this.display1 = 'none';
    this.display2 = 'none';
    this.display3 = 'none';
    this.display4 = 'none'
  }
  openModal2() {

    this.display1 = 'block';

  }
  openModal3() {

    this.display2 = 'block';

  }
  openmoadal4() {
    this.display4 = 'block'
  }
  ///end

  onChange1(side: string) {
 
    this.whichSide = side
  this.CurrentSide=side
    this.getLeftSide()
  }

}
