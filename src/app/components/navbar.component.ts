import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <button class="navbar-toggler" type="button" data-toggle="collapse" 
              data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" 
               routerLink="/"
               [ngStyle]="{ opacity: isAdmin ? 0.5 : 1, 'pointer-events': isAdmin ? 'none' : 'auto' }">
              Trang chủ<span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               routerLink="/cart"
               [ngStyle]="{ opacity: isAdmin ? 0.5 : 1, 'pointer-events': isAdmin ? 'none' : 'auto' }">
              Giỏ hàng
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">| Kết nối</a>
          </li>
          <li class="nav-item">
            <div class="facebook-container">
              <a href="https://www.facebook.com/tai.leminh.315" target="_blank" rel="noopener noreferrer" title="Kết nối Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#fff" d="M12 2.04c-5.5 0-10 4.5-10 10 0 5 3.7 9.1 8.5 9.9v-7H7v-3h3.5v-2.5c0-3.4 2-5.3 5.1-5.3 1.5 0 3.2.3 3.2.3v3.5H16c-1.5 0-2 .8-2 1.8V12h3.5l-.5 3h-3v7c4.8-.8 8.5-4.9 8.5-9.9 0-5.5-4.5-10-10-10z"/>
                </svg>
              </a>
            </div>
          </li>
        </ul>
    
        <!-- Nếu chưa đăng nhập thì hiển thị liên kết Đăng nhập/Đăng ký -->
        <div *ngIf="!isLoggedIn" class="d-flex align-items-center">
          <a class="btn btn-link text-white" routerLink="/login">Đăng nhập</a>
          <a class="btn btn-link text-white" routerLink="/register">Đăng ký</a>
        </div>
    
        <!-- Nếu đã đăng nhập, hiển thị tên user và nút đăng xuất -->
        <div *ngIf="isLoggedIn" class="d-flex align-items-center">
          <span class="text-white mr-2">Chào, {{ username }}</span>
          <button class="btn btn-link text-white" (click)="logout()">Đăng xuất</button>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.checkIfAdmin();
  }

  checkLoginStatus(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        this.username = localStorage.getItem('username') || 'User';
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  checkIfAdmin(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token) as any;
          const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          if (typeof roleClaim === 'string') {
            this.isAdmin = roleClaim === 'Write';
          } else if (Array.isArray(roleClaim)) {
            this.isAdmin = roleClaim.includes('Write');
          } else {
            this.isAdmin = false;
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          this.isAdmin = false;
        }
      }
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    this.isLoggedIn = false;
    window.location.href = '/';
  }
}
