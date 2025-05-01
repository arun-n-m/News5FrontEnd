import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../authService/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private apiservices: ApiService, private router: Router, private authService: AuthService) { }
  error_msg = ""
  loader_active: boolean = false

  ngOnInit() {
    this.loader_active = true
    if (this.authService.isLoggedIn()) {
      this.loader_active = false
      // this.router.navigate(['/']);
    }
    else {
      this.loader_active = false
    }
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onLogIn() {
    this.loader_active = true
    console.log("loginForm.value:::", this.loginForm.value);

    this.apiservices.postLogin(this.loginForm.value).subscribe((data: any) => {
      this.loader_active = false
      console.log("sending data", data);
      if (data.msg === "success") {
        this.authService.login(data.user);
        this.router.navigateByUrl("/")
      }
      else if (data.msg != "success") {
        alert(this.error_msg = data.msg)
      }
    })
  }

  SignUp() {
    this.router.navigateByUrl("/signup")
  }
}
