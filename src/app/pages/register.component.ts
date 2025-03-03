import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Đăng ký</h2>
    <form (ngSubmit)="register()">
      <div>
        <label>Email:</label>
        <input type="email" [(ngModel)]="registerData.Username" name="Username" required>
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input type="password" [(ngModel)]="registerData.Password" name="Password" required>
      </div>
      <!-- Đã bỏ phần nhập Roles, vì mặc định role = "Read" -->
      <button type="submit">Đăng ký</button>
    </form>
  `,
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  // Định nghĩa DTO phù hợp với backend (Username, Password, Roles)
  // Mặc định Roles = ["Read"]
  registerData: {
    Username: string;
    Password: string;
    Roles: string[];
  } = {
    Username: '',
    Password: '',
    Roles: ['Read']
  };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    // Không cần tách chuỗi rolesInput, vì mặc định là ["Read"]
    this.userService.register(this.registerData).subscribe(
      (res: string) => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Error:', err);
        alert('Đăng ký thất bại!');
      }
    );
  }
}
