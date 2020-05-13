import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class CommonPrintService {


    print(printContent: any) {
        
        // var originalContents = document.body.innerHTML;

        // document.body.innerHTML = printContent;
        // window.print();

        // document.body.innerHTML = originalContents;
        // document.close();


        var divContents =printContent; 
        var a = window.open('', '', 'height=900, width=900'); 
        a.document.body.innerHTML=divContents;
        a.print();
        a.close();
        // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
       
   
        // WindowPrt.document.write(printContent.innerHTML);
        // WindowPrt.document.close();
        // WindowPrt.focus();
        // WindowPrt.print();
        // WindowPrt.close();
    }
}