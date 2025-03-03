import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly APIUrl = 'https://apiqlbanhang.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  // GET:lấy dữ liệu từ API
  get_Data(endpoint: string): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/${endpoint}`);
  }
  get_Products(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Products');
  }

  add_Products(value: any){
    return this.http.post(this.APIUrl + '/Products', value);
  }

  update_Products(value: any){
    return this.http.put(this.APIUrl + '/Products/' + value.ProductID, value);
  }
  delete_Products(value: any) {
    return this.http.delete(this.APIUrl + '/Products/' + value);
  }
  upload_Image(value: any){
    return this.http.post(this.APIUrl + '/Products/UploadFile', value);
  }
}
