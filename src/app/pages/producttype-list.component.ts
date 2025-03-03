import { Component, OnInit } from "@angular/core";
import { ProductTypeService } from "../services/producttype.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-producttype-list",
  template: `
  <!-- Nút Thêm loại sản phẩm, luôn hiển thị -->
  <div class="mb-3">
    <button type="button" class="btn btn-success" (click)="openAddForm()">Thêm loại sản phẩm</button>
  </div>

  <table class="table table-stripe">
    <thead>
      <tr>
        <th>TypeId</th>
        <th>TypeName</th>
        <th>Tùy chọn</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let type of productTypes">
        <td>{{ type.TypeId }}</td>
        <td>{{ type.TypeName }}</td>
        <td>
          <button type="button" class="btn btn-light mr-1" (click)="openUpdateForm(type)">Sửa</button>
          <button type="button" class="btn btn-light" (click)="deleteProductType(type.TypeId)">Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Form Thêm loại sản phẩm mới, hiển thị khi isAdding === true -->
  <div class="mt-4" *ngIf="isAdding">
    <h3>Thêm loại sản phẩm mới</h3>
    <form #addForm="ngForm" (ngSubmit)="submitAdd()">
      <div class="form-group">
        <label>TypeName:</label>
        <input type="text" class="form-control" name="TypeName" [(ngModel)]="newProductType.TypeName" required>
      </div>
      <button type="submit" class="btn btn-primary">Thêm</button>
      <button type="button" class="btn btn-secondary ml-2" (click)="cancelAdd()">Hủy</button>
    </form>
  </div>

  <!-- Form cập nhật loại sản phẩm, hiển thị khi isEditing === true -->
  <div *ngIf="isEditing" class="mt-4">
    <h3>Cập nhật loại sản phẩm</h3>
    <form #updateForm="ngForm" (ngSubmit)="submitUpdate()">
      <div class="form-group">
        <label>TypeName:</label>
        <input type="text" class="form-control" name="TypeName" [(ngModel)]="editingProductType.TypeName" required>
      </div>
      <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
      <button type="button" class="btn btn-secondary ml-2" (click)="cancelEdit()">Hủy</button>
    </form>
  </div>
  `,
  styleUrls: ["./producttype-list.component.scss"],
  imports: [CommonModule, FormsModule],
  providers: [ProductTypeService],
  standalone: true
})
export class ProductTypeListComponent implements OnInit {
  productTypes: any[] = [];
  isAdding: boolean = false;
  isEditing: boolean = false;

  newProductType: any = {
    TypeName: ''
  };

  editingProductType: any = null;

  constructor(private service: ProductTypeService) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes() {
    this.service.get_ProductTypes().subscribe(res => {
      this.productTypes = res;
    });
  }

  deleteProductType(id: any) {
    if (confirm("Bạn có chắc muốn xóa loại sản phẩm này không?")) {
      this.service.delete_ProductType(id).subscribe(() => {
        alert("Loại sản phẩm đã được xóa thành công!");
        this.getProductTypes();
      });
    }
  }

  openUpdateForm(type: any) {
    // Nếu form thêm đang mở thì ẩn nó
    this.isAdding = false;
    this.editingProductType = { ...type };
    this.isEditing = true;
  }

  submitUpdate() {
    this.service.update_ProductType(this.editingProductType).subscribe(() => {
      alert("Cập nhật loại sản phẩm thành công!");
      this.isEditing = false;
      this.editingProductType = null;
      this.getProductTypes();
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingProductType = null;
  }

  openAddForm() {
    // Nếu form sửa đang mở thì ẩn nó
    this.isEditing = false;
    this.isAdding = true;
    this.newProductType = { TypeName: '' };
  }

  submitAdd() {
    this.service.add_ProductType(this.newProductType).subscribe(() => {
      alert("Thêm loại sản phẩm thành công!");
      this.newProductType = { TypeName: '' };
      this.isAdding = false;
      this.getProductTypes();
    });
  }

  cancelAdd() {
    this.isAdding = false;
    this.newProductType = { TypeName: '' };
  }
}
