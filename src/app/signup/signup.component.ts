import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../authService/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  signup_img: string = "profile.jpg";
  error_msg: string = "";
  loader_active: boolean = false

  fb = new FormBuilder();
  signup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  formdata = new FormData();

  triggerUpload() {
    this.fileInput.nativeElement.click();
  }

  upload(event: any) {
    this.formdata.delete("profile");
    const file = event.target.files[0];
    if (file) {
      this.formdata.append("profile", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signup_img = reader.result as string;
      };
    }
  }

  onSignup() {
    this.loader_active = true
    const { username, email, password } = this.signup.value;
    this.formdata.append("username", username as string);
    this.formdata.append("email", email as string);
    this.formdata.append("password", password as string);

    this.apiservices.postSignup(this.formdata).subscribe((data: any) => {
      if (data.msg === "success") {
        this.loader_active = false
        this.authService.login(data.user);
        this.router.navigateByUrl("/");
      } else {
        alert(this.error_msg = data.msg);
      }
    });
  }

  loginClick() {
    this.router.navigateByUrl("/login");
  }

  constructor(private apiservices: ApiService, private router: Router, private authService: AuthService) { }
}
