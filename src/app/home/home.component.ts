import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private apiservices: ApiService, private router: Router) { }
  erorr_message = ''
  all_Blogs: any
  ngOnInit(): void {
    this.apiservices.getHome().subscribe((data: any) => {
      this.all_Blogs = data.data
    })
  }

  blogView(id: any) {
    console.log("viewwwwwwwwwwid", id);
    this.router.navigateByUrl(`/view/${id}`)

  }
}
