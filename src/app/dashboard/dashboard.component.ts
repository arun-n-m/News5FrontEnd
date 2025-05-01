import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authService/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  userdata: any
  blogs: any
  curentuser: any
  constructor(private authService: AuthService, private router: Router, private apiservice: ApiService) {
    this.userdata = this.authService.currentUserValue;
    if (!this.userdata) {
      console.warn("User not logged in");
      return;
    }
  }

  ngOnInit(): void {
    if (this.userdata) {
      this.apiservice.getdashboard({ email: this.userdata }).subscribe(
        (res: any) => {
          console.log("Dashboard data:", res);
          this.curentuser = res.userdata
          this.blogs = res.blogs
        });
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  deleteBlog(blogId: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.apiservice.deleteBlog(blogId).subscribe(
        (res: any) => {
          console.log("Blog deleted successfully:", res);
          this.blogs = this.blogs.filter((blog: any) => blog._id !== blogId);
        },
        (error) => {
          console.error("Error deleting blog:", error);
          alert("Failed to delete blog. Please try again.");
        }
      );
    }
  }
}
