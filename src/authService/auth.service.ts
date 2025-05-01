import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public userData: Observable<any>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const user = this.isBrowser ? this.getUser() : null;
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.userData = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(user: any): void {
    if (this.isBrowser) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('userData');
    }
    this.currentUserSubject.next(null);
  }

  private getUser(): any {
    if (!this.isBrowser) return null;
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

}
