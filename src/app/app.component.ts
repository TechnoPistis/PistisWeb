import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
//import { Gtag } from 'angular-gtag';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag:Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PISTIS';
 
 
constructor(public translate:TranslateService,config: NgbCarouselConfig,public router:Router,
 ){
     
  this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd){
        gtag('config', 'UA-152870542-1', 
              {
                'page_path': event.urlAfterRedirects
              }
             );
     }
  }
)
  // const navEndEvent$ = router.events.pipe(
  //   filter(e => e instanceof NavigationEnd)
  // );
  // navEndEvent$.subscribe((e: NavigationEnd) => {
  //   gtag('config', 'UA-152870542-1', {'page_path':e.urlAfterRedirects});
  // });
  //gtag.pageview();
  config.interval= 2000;
  config.wrap=true;
  config.keyboard= true;
  config.pauseOnHover= true;
  config.showNavigationArrows=true;
  config.showNavigationIndicators=true;
  translate.addLangs(['espanol', 'english']);
  let languageValue=localStorage.getItem("browseLang");
  if(languageValue==null){
  this.language('espanol')
  }
  else{
  this.language(languageValue)
  }
  }
  
  language(val:string){
    
  this.translate.setDefaultLang('espanol');
  
 
  localStorage.setItem("browseLang",val)
  let language = localStorage.getItem("browseLang")
  
  this.translate.use(language);
  
  }
  onActivate(event:any) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
   
}
}
