import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule,DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query: string = '';
  searchResults: any[] = [];
  searching: boolean = false;

  constructor(private apiService: ApiService) { }

  onSearch() {
    if (this.query.trim().length === 0) {
      this.searchResults = [];
      return;
    }
    
    this.searching = true;
    
    this.apiService.searchBlogs(this.query).subscribe({
      next: (res: any) => {
        this.searchResults = res.blogs || [];
        this.searching = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.searching = false;
      }
    });
  }
  
  navigateToBlog(blogId: string) {
    window.location.href = `/view/${blogId}`;
  }
}
