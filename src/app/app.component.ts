import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'angular-node';
  // apiPath = "http://localhost:3000/products/";

  // constructor(private http:HttpClient){}
  // ngOnInit(){
  //   this.http.get(this.apiPath).subscribe(
  //     (res)=>{
  //       console.log(res);
  //     }
  //   )
  // }
}
