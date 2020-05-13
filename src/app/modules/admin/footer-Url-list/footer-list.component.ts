import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer-list',
  templateUrl: './footer-list.component.html',
  styleUrls: ['./footer-list.component.css']
})
export class FooterListComponent implements OnInit {

  public dataList:any=[];
  selectedVal: string;
  constructor(private srevice:ListService,private toastr:ToastrService
    ,private Router: Router) { 
    
  }

  ngOnInit() {
    this.srevice.refreshList().then(data=>{ 
      ;
      this.dataList=data;

  });
  }
  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.srevice.deleteFeatureProduct(id).subscribe(res => {
        this.srevice.refreshList().then(data=>{ 
          ;
          this.dataList=data;
      } );
        this.toastr.warning('Deleted successfully', 'Category !');
      });
    }
  }
  onEdit(id:number){
    this.Router.navigate(['/admin/footer-urls/'],{ queryParams: { Id:id }});
  }
  onClick(){
    this.Router.navigate(['/admin/footer-urls']);
  }
}
