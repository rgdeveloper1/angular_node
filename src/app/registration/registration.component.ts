import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registration_form: FormGroup;
  registerPath = "http://localhost:3000/user/signup";
  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.registration_form = this.fb.group({
      email: [null],
      password: [null]
    });
  }

  onRegisteration(form: NgForm) {
    const requestBody = {
      email: this.registration_form.get('email').value,
      password: this.registration_form.get('password').value
    }
    this.authService.register(requestBody).subscribe(
      (res) => {
        console.log(res);
        this.registration_form.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
