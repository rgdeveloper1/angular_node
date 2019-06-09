import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public sendToken = new BehaviorSubject('');
gettoken = this.sendToken.asObservable(); 
  constructor() { }

  sendingTokenToAnother(token: any){
    this.sendToken.next(token);
  }
}
