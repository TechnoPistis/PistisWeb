import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogService } from '../../services/user-log.service';
import { TrackService } from '../track-order/track.service';

@Component({
    selector: 'app-track-order-guest',
    templateUrl: './track-order-guest.component.html',
    //styleUrls: ['./track-order.component.css']
})
export class TrackOrderGuestComponent implements OnInit {
   
orderid:any;
notExists:boolean=false;
isEng:boolean=false;
    required: boolean=false;
    constructor(
        public toastr: ToastrService,
        public router: Router,
        private route: ActivatedRoute,
        public _service: TrackService,private userLog:UserLogService
    ) { }
    ngOnInit(){
        
        var lang = localStorage.getItem('browseLang')
            if (lang == 'english') {
                this.isEng=true;
            } else {
                this.isEng=false;
            }
    }
    trackorder(no){
        if(no=="")
        {
            this.required=true;
        }
        else{
this._service.getbytrackno(no).subscribe(x=>{
this.orderid=x;
if(this.orderid>0)
this.router.navigate(['/trackorder'], { queryParams: { orderId: this.orderid } });
else
this.notExists=true;
})
    }
}
}
