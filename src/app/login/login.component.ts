import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth-service.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  registerPath = "http://localhost:3000/user/login";
  token;
  private tokenTimer: NodeJS.Timer;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.login_form = this.fb.group({
      email: [null],
      password: [null]
    });
  }

  onLogin(form: NgForm) {
    const requestBody = {
      email: this.login_form.get('email').value,
      password: this.login_form.get('password').value
    }
    this.authService.login(requestBody).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.token = res['token'];
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/product'])
          this.login_form.reset();
          // if (this.token) {
          //   const expiresInDuration: number = res['expiresIn'];
          //   this.tokenTimer = setTimeout(() => {
          //     this.authService.logoutUser();
          //   }, expiresInDuration * 1000);
          //   console.log(this.tokenTimer);
          // }
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
