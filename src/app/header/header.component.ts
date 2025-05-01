import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../authService/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  loader_active:boolean=false
  isScrolled = false;
  threshold =100;
  // 150 1st 
  // then 100
  // 50 is better
  isIconsVisible = false;
  private ticking = false;
  private isBrowser: boolean;
  

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Check initial scroll position
      this.checkScrollPosition();
      
      // Add smooth scroll event listener
      window.addEventListener('scroll', this.smoothScrollCheck.bind(this), { passive: true });
    }
  }
  
  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.smoothScrollCheck.bind(this));
    }
  }
  
  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  onLoginClick(): void {
    this.loader_active=true
    // console.log('Login Clicked, user logged in:', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      this.loader_active=false
      this.router.navigate(['/dashboard']);

    } else {
      this.loader_active=false
      this.router.navigate(['/login']);
    }
  }
  
  smoothScrollCheck(): void {
    if (!this.ticking && this.isBrowser) {
      window.requestAnimationFrame(() => {
        this.checkScrollPosition();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
  
  private checkScrollPosition(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > this.threshold;
    }
  }

  // toggleMobileMenu(): void {
  //   if (this.isBrowser) {
  //     const categoriesNav = document.querySelector('.categories-nav');
  //     categoriesNav?.classList.toggle('show-mobile');
  //   }
  // }

    // Toggle visibility of mobile icons
    toggleMobileIcons(): void {
      this.isIconsVisible = !this.isIconsVisible;
    }

  // Close icons menu when clicking elsewhere
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Don't close if clicking the toggle button itself
    if (!target.closest('.menu-toggle') && !target.closest('.mobile-icons') && this.isIconsVisible) {
      this.isIconsVisible = false;
    }
  }
}
