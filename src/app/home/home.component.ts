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
  loader_active: boolean = false
  erorr_message = ''
  all_Blogs: any
  ngOnInit(): void {
    this.loader_active = true
    this.apiservices.getHome().subscribe((data: any) => {
      this.all_Blogs = data.data
      this.loader_active = false
    })
  }

  blogView(id: any) {
    console.log("viewwwwwwwwwwid", id);
    this.router.navigateByUrl(`/view/${id}`)

  }
}
