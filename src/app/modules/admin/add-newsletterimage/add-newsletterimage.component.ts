import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';


@Component({
  selector: 'app-add-newsletterimage',
  templateUrl: './add-newsletterimage.component.html',
  styleUrls: ['./add-newsletterimage.component.css']
})
export class    AddNewsletterimageComponent implements OnInit {
  image1:any=null
  image1Url:any=null
  HeaderName:any=""
  Description:any=""
  url=new CommonService().getUri();
  fileToUpload: File = null;
  news: any;
  constructor(private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit() {
    this.getnewsletterImage().subscribe(x=>{
      this.news=x
      this.HeaderName=this.news.HeaderName
      this.Description=this.news.Description
      this.image1=this.news.Image
    })
    
  }
  openFile() {
   
       
        $('#fileDialog').trigger('click');
      }
  
    
      onSelectFile(event) {
        const file = event.target.files[0];
        const typeFile = file.type.split('/');
        if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
        if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                
          this.image1=event.target.result
              
              //this.urls.push(event.target.result); 
    
            }
              
    
            this.fileToUpload = event.target.files[i]
            reader.readAsDataURL(this.fileToUpload);
          }
        
        }}else{
          this.toastr.error('Please select valid Image !');
        }
   
      }
    
    
saveImage(){
  if(this.HeaderName=="" ){
    this.toastr.warning("Please enter newsletter heading")
return false;
  }
  if(this.Description==""){
    this.toastr.warning("Please enter newsletter description")
    return false;
  }
    
  let model={
Image:null,
HeaderName:"",
Description:""
  };
 
  model.Image= this.image1 as string
  //model.Image="data:image/png;base64,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"
 model.Description=this.Description;
 model.HeaderName=this.HeaderName

  return this.http.post(this.url+'NewsLetter/SaveImageNewsLetter',model).subscribe(x=>{
     
      this.toastr.success("Image upload successfully.")
      
    })
   
  
}
getnewsletterImage(){
  return this.http.get(this.url+'NewsLetter/getNewsletterImage')
}

   
  
}
