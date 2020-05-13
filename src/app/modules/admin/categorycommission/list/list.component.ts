import { Component, OnInit } from '@angular/core';
import { CategorycommissionService } from '../categorycommission.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public dataList: any = [];
  selectedVal: string;
  EditId: any;
  EditCommission: any;
  constructor(private service: CategorycommissionService, private toastr: ToastrService
    , private Router: Router) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;
Edit:any[]=[];

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getList();
  }

  getList() {
    this.service.getAll().toPromise().then((data: any) => {
      this.dataList = data;
      for(let i=0;i<=this.dataList.length;i++)
      {
        
        this.Edit[i]=false;}
      
    })
  }

  //ondelete
  onDelete(id: number) {
    if (confirm('Are you sure to delete this commission?')) {
      this.service.delete(id).subscribe(res => {
        this.getList();
        if(res==true)
        {
        this.toastr.success('Deleted successfully');
        }
        else{
          this.toastr.warning('Something went wrong. Please try again')
        }
      });
    }
  }
  onEdit(id,i) {
    this.Edit[i]=true;
    this.EditId=id;
  }
  Save()
{
    
this.service.update(this.EditId,this.EditCommission).subscribe(data=>{
    
  if(data)
  {
    this.getList();
    this.toastr.success("updated successfully")
  }
  else{
    this.toastr.warning('Something went wrong. Please try again')
  }
  this.EditId=0;
})
}
getValue(commission){
  this.EditCommission=+commission
}
}
