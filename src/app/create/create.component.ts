import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private apiservices: ApiService, private fb: FormBuilder,private authService: AuthService,private router:Router) { }
  formdata = new FormData()
  creationForm = {
    title: '',
    image: '',
    content: '',
    tags: '',

  }

  upload(event: any) {
    this.formdata.delete("blog_image")
    const file = event.target.files[0]
    this.formdata.append("blog_image", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let img: any = reader.result
      this.creationForm.image = img
    }
  }
  onTagSelect(tag: string) {
    this.creationForm.tags = tag;
  }
  
  
  onSubmit() {
    const user = this.authService.currentUserValue;
    if (!user || !user) {
      console.warn("User not logged in or missing user ID");
      return;
    }
    this.formdata.append("title", this.creationForm.title);
    this.formdata.append("content", this.creationForm.content);
    this.formdata.append("tags", this.creationForm.tags)
    this.formdata.append("author", user);
    console.log("myform",this.formdata);

    this.apiservices.postCreation(this.formdata).subscribe((data: any) => {
      console.log("res.data", data);
      this.router.navigateByUrl("/")


    })
    // window.location.reload()
  }
}
