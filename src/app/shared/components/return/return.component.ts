import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-details/product.service';
import { ReturnService } from './return.service';
import { Returnmodel } from './returnmodel';
import { UserLogService } from '../../services/user-log.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  image: any[] = [];
  config: any;
  validate: boolean;
  ProductvarientDetailId: any;
  id: any;
  varientImage: any;
  UserId: number;
  product: any;
  imgList:any[] = [];
  cartitemId: any=0;
  model=new Returnmodel();
  CheckoutItemId: any;
  Quantity: any;
  dscError: boolean=false;
  imgerror: boolean=false;
  Url: any;
  constructor( private productService: ProductService, private route: ActivatedRoute,public service:ReturnService,private toastr:ToastrService,private router:Router,private userLog:UserLogService) { }
  
  @ViewChild(DropzoneComponent,{static:false}) componentRef?: DropzoneComponent;

  ngOnInit() {
    this.validate=false
   this.route.queryParams.subscribe(params => {
     this.id= params['Id'];
   this.ProductvarientDetailId=  params['ProductVdId'];
     this.CheckoutItemId=params['CheckoutItemId'];
     this.Quantity=params['Quantity'];
     this.productService.getProductDetails(this.id,  this.ProductvarientDetailId).subscribe(res => {
        
       this.product = res;
       this.varientImage = this.product.LandingImage;
     })
     let User:any= localStorage.getItem('UserId') 
  this.UserId =  User as number
   })
   this.Url = this.router.url;
      this.userLog.UserLog(this.product.Id, 1, this.Url, 1);
  }
  onUploadSuccess(event: any) {
    if (event[0].dataURL) {
      this.image.push(event[0].dataURL);
      this.imgList.push(event[0].dataURL);
    }
  }
  setdscmsg(){
    this.dscError=false;
  }
  setimgmsg(){
    this.imgerror=false;
  }
  SaveData(description:string){
      
    if(!description)
    {
    this.dscError=true;
    
    }
    if(this.imgList.length==0)
    {
      this.imgerror=true;
    }
   if(description && this.imgList.length>0){

    this.model.description=description;
    this.model.images=this.imgList;
    this.product.VariantDetailId=this.ProductvarientDetailId;
    this.model.product=this.product;
    this.model.CheckoutItemId=this.CheckoutItemId;
    this.model.Quantity=this.Quantity;
    this.service.saveData(this.model).subscribe(data=>{
      if(data==true)
      {
        var lang = localStorage.getItem("browseLang");
    if (lang == "english") {
      this.toastr.success("return accepted.")
    } else {
      this.toastr.success("Devolución aceptada.")
    }
      
      this.router.navigate(['/MyOrders'])
      }
    })
  }
  }
  ImageDelete(i) {
    this.imgList.splice(i, 1);
    this.resetDropzoneUploads();
  }
  public resetDropzoneUploads(): void {
    this.image=[];
    this.componentRef.directiveRef.reset();
  }
}
