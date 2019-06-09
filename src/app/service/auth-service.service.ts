import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerURL = 'http://localhost:3000/user/signup';
  private loginURL = "http://localhost:3000/user/login";

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {

  }

  register(userData) {
    return this.http.post<any>(this.registerURL, userData);
  }

  login(loginDetails) {
    return this.http.post(this.loginURL, loginDetails);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/product'])
  }
  getToken() {
    return localStorage.getItem('token');
  }


}
