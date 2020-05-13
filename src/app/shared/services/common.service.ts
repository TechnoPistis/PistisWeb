import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseuri = "";
  getUri() {
    if (window.location.href.includes("pistis")) {
      this.baseuri = "https://psapsolutions.com/api/";
    }
    else if (window.location.href.includes("localhost")) {
     this.baseuri = "https://localhost:44343/api/";
    
     //this.baseuri = "http://api.sathfere.com/api/"

      //this.baseuri = "https://psapsolutions.com/api/";

    }
    else {
      this.baseuri = "http://api.sathfere.com/api/"
    }
    return this.baseuri;
  }
  constructor() {
  }
}
