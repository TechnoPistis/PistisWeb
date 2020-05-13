import { Component, OnInit } from '@angular/core';
import { MenuService } from "./menu.service";
import { Menu } from './menu';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  dataList: Menu[];
  menus: Promise<Menu[]>;
  ProductList: boolean[];
  child: boolean;
 
  

  constructor( public service: MenuService) { }

  ngOnInit() {
    
    
 return this.service.getproducts().subscribe(res =>{
  this.dataList = res as Menu[]
 
 this.ProductList=this.dataList.map(x=>x.ProductCategory1!==null)
 
 for(var i of this.dataList){
   for(var child of i.ProductCategory1){
     if(child.ProductCategory1!=null){
       this.child=true;
     }else{
       this.child=false;
     }
   }
 }
 }
  
   );

  }

}

