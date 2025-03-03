import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  readonly APIUrl = 'https://apiqlbanhang.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  // GET: Lấy dữ liệu danh sách loại sản phẩm
  get_ProductTypes(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/ProductType');
  }

  // POST: Thêm mới loại sản phẩm
  add_ProductType(value: any): Observable<any> {
    return this.http.post(this.APIUrl + '/ProductType', value);
  }

  // PUT: Cập nhật loại sản phẩm theo TypeId
  update_ProductType(value: any): Observable<any> {
    return this.http.put(this.APIUrl + '/ProductType/' + value.TypeId, value);
  }

  // DELETE: Xóa loại sản phẩm theo TypeId
  delete_ProductType(id: any): Observable<any> {
    return this.http.delete(this.APIUrl + '/ProductType/' + id);
  }
}
