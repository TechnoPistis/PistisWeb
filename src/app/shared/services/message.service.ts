import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  sendMessage(message: any) {
      
      this.subject.next({ text: message });
      this.messageSource.next(message);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      
      return this.subject.asObservable();
  }
}
