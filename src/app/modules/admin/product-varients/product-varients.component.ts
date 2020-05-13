import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VarientsService } from './varients.service';
import { ToastrService } from 'ngx-toastr';
import { Varients } from './varients';
@Component({
  selector: 'app-product-varients',
  templateUrl: './product-varients.component.html',
  styleUrls: ['./product-varients.component.css']
})
export class ProductVarientsComponent implements OnInit {
  public dataList: any = [];
  public List: any = [];
  selectedVal: string;
  Edit:any[]=[];
  EditId: any;
  obj= new Varients();
  count: number = 0;
  page: number = 1;
  perPage: number = 10;
  pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;
  OpenAll:boolean=false
  vendors:any[]=[]
  vendorId:any=0
  constructor(private srevice: VarientsService, private toastr: ToastrService
    , private Router: Router) { }

 
  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
   this.getproducts()
   this.getVendorS();
  }
  getproducts(){
    this.srevice.getproducts(this.page, this.pageSize, this.SearchName,this.vendorId).subscribe((data:any) => {
      
      this.Edit=[];
     // this.dataList = data as [];
     if(data.count==0 ){
       if(!data.count)
     {  this.toastr.info("No result found!")
     this.dataList=null
       return false}
       else{
        this.toastr.info("No result found!")
     this.dataList=null

        return false
       }

     }
      this.dataList = data.data as [];
      this.count = data.count;
      
//alert(this.dataList)
    }
    );
  }
  onEdit(id,i) {
    this.Edit[i]=true;
    this.EditId=id;
  }
  onClick(){
this.OpenAll=true
  }
  onClick1(){
    
this.OpenAll=false
if(this. obj)
this.srevice.saveProductPrice(  this. obj).subscribe(x=>{
  this.toastr.success("Data saved successfully.")
  this.getproducts()
  this.obj= new Varients()
})
  }
  getprice(ProductVarientdetailId,price){
    
  
  this.obj.productVarientDetailId.push(+ProductVarientdetailId)
  this. obj.price.push(+price)

   

  }
  Save(){
    
    if(this. obj.price.length<=0)
    return false;
this.srevice.saveProductPrice(  this. obj).subscribe(x=>{
  this.toastr.success("Data saved successfully.")
  this.getproducts()
})
  }
  prevPage() {
    this.page = this.page - 1;
    this.getproducts();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getproducts();
  }
  goToPage(event) {
    this.page = event;
    this.getproducts();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getproducts();
  }
  getVendorS(){
    
    this.srevice.vendors().subscribe(x=>{
      
this.vendors=x as []
    })
  }
  search(){
    
    this.vendorId
    this.SearchName
    if(this.vendorId>0 || this.SearchName!=""){
      this.getproducts()
    }else {
      return false
    }
  }

}
