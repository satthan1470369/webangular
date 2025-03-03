import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [UserService],
  template: `
    <h2>Đăng nhập</h2>
    <form (ngSubmit)="login()">
      <div>
        <label>Email hoặc Username:</label>
        <input type="email" [(ngModel)]="loginData.username" name="username" required>
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input type="password" [(ngModel)]="loginData.password" name="password" required>
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  `,
  styles: []
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.loginData).subscribe(
      (res: any) => {
        if (res && res.JwtToken) {
          // Lưu token và username vào localStorage
          localStorage.setItem('token', res.JwtToken);
          localStorage.setItem('username', this.loginData.username);
          
          // Giải mã token để lấy thông tin role
          const decoded = jwtDecode(res.JwtToken) as any;
          // Role được lưu ở claim với key này theo mặc định Identity:
          const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          // Dựa vào role, chuyển hướng
          if (roleClaim) {
            if (typeof roleClaim === 'string') {
              if (roleClaim === 'Write') {
                // Nếu có role Write thì chuyển hướng tới trang admin
                window.location.href = '/admin';
                return;
              }
            } else if (Array.isArray(roleClaim)) {
              if (roleClaim.includes('Write')) {
                window.location.href = '/admin';
                return;
              }
            }
          }
          // Nếu không có role Write, chuyển hướng về trang home
          window.location.href = '/';
        } else {
          alert('Đăng nhập thất bại!');
        }
      },
      err => {
        alert('Đăng nhập thất bại do lỗi!');
      }
    );
  }
}
