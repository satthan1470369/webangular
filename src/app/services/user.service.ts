import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl = 'https://apiqlbanhang.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  // Đăng ký
  register(value: any) {
    return this.http.post(this.APIUrl + '/User/Register', value, { responseType: 'text' });
  }
  

  // Đăng nhập
  login(value: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/User/Login`, value);
  }
}
