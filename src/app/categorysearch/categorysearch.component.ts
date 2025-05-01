import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categorysearch',
  imports: [CommonModule, RouterLink],
  templateUrl: './categorysearch.component.html',
  styleUrl: './categorysearch.component.css'
})
export class CategorysearchComponent implements OnInit {
  categoryName: string = '';
  blogs: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // Get category parameter from route
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.categoryName = this.formatCategoryName(category);
        this.fetchCategoryBlogs(category);
      }
    });
  }

  formatCategoryName(category: string): string {
    // Convert kebab-case or other formats to a readable name
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  fetchCategoryBlogs(category: string): void {
    this.loading = true;
    this.apiService.getCategoryBlogs(category).subscribe({
      next: (response: any) => {
        this.blogs = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching category blogs:', error);
        this.loading = false;
      }
    });
  }
}
