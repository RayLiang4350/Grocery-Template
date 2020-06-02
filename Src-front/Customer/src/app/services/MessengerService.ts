import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMSg(object)
  {
      this.subject.next(object);
  }

  getMsg(){
      return this.subject.asObservable();
  }
}
