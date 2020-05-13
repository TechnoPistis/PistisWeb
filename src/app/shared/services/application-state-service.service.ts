import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateServiceService {

  private isMobileResolution: boolean;

  constructor() {
    //768 px is ipad resolution
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    return this.isMobileResolution;
  }
}
