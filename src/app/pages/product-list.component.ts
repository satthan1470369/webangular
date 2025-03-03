import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-product-list",
  template: `
  <!-- Nút Thêm sản phẩm, luôn hiển thị -->
  <div class="mb-3">
    <button type="button" class="btn btn-success" (click)="openAddForm()">Thêm sản phẩm</button>
  </div>

  <table class="table table-stripe">
    <thead>
      <tr>
        <th>ProductID</th>
        <th>Name</th>
        <th>TypeID</th>
        <th>Importday</th>
        <th>ImageUrl</th>
        <th>Price</th>
        <th>Discount</th>
        <th>HotTrend</th>
        <th>Tùy chọn</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let product of products">
        <td>{{ product.ProductID }}</td>
        <td>{{ product.Name }}</td>
        <td>{{ product.TypeId }}</td>
        <td>{{ product.Importday }}</td>
        <td>{{ product.ImageUrl }}</td>
        <td>{{ product.Price }}</td>
        <td>{{ product.Discount }}</td>
        <td>{{ product.HotTrend ? 'Yes' : 'No' }}</td>
        <td>
          <button type="button" class="btn btn-light mr-1" (click)="openUpdateForm(product)">Sửa</button>
          <button type="button" class="btn btn-light" (click)="deleteProduct(product.ProductID)">Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Form Thêm sản phẩm mới, hiển thị khi isAdding === true -->
  <div class="mt-4" *ngIf="isAdding">
    <h3>Thêm sản phẩm mới</h3>
    <form #addForm="ngForm" (ngSubmit)="submitAdd()">
      <div class="form-group">
        <label>Tên sản phẩm:</label>
        <input type="text" class="form-control" name="Name" [(ngModel)]="newProduct.Name" required>
      </div>
      <div class="form-group">
        <label>TypeID:</label>
        <input type="number" class="form-control" name="TypeId" [(ngModel)]="newProduct.TypeId" required>
      </div>
      <div class="form-group">
        <label>Importday:</label>
        <input type="date" class="form-control" name="Importday" [(ngModel)]="newProduct.Importday" required>
      </div>
      <div class="form-group">
        <label>ImageUrl:</label>
        <input type="text" class="form-control" name="ImageUrl" [(ngModel)]="newProduct.ImageUrl">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="number" class="form-control" name="Price" [(ngModel)]="newProduct.Price" required>
      </div>
      <div class="form-group">
        <label>Discount (%):</label>
        <input type="number" class="form-control" name="Discount" [(ngModel)]="newProduct.Discount" required>
      </div>
      <div class="form-group">
        <label>HotTrend:</label>
        <select class="form-control" name="HotTrend" [(ngModel)]="newProduct.HotTrend" required>
          <option [ngValue]="true">Yes</option>
          <option [ngValue]="false">No</option>
        </select>
      </div>
      <div class="form-group">
        <label>Chọn ảnh sản phẩm:</label>
        <input type="file" class="form-control" (change)="onFileSelectedAdd($event)">
      </div>
      <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
      <button type="button" class="btn btn-secondary ml-2" (click)="cancelAdd()">Hủy</button>
    </form>
  </div>

  <!-- Form cập nhật sản phẩm, hiển thị khi isEditing === true -->
  <div *ngIf="isEditing" class="mt-4">
    <h3>Cập nhật sản phẩm</h3>
    <form #updateForm="ngForm" (ngSubmit)="submitUpdate()">
      <div class="form-group">
        <label>Tên sản phẩm:</label>
        <input type="text" class="form-control" name="Name" [(ngModel)]="editingProduct.Name" required>
      </div>
      <div class="form-group">
        <label>TypeID:</label>
        <input type="number" class="form-control" name="TypeId" [(ngModel)]="editingProduct.TypeId" required>
      </div>
      <div class="form-group">
        <label>Importday:</label>
        <input type="date" class="form-control" name="Importday" [(ngModel)]="editingProduct.Importday" required>
      </div>
      <div class="form-group">
        <label>ImageUrl:</label>
        <input type="text" class="form-control" name="ImageUrl" [(ngModel)]="editingProduct.ImageUrl">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="number" class="form-control" name="Price" [(ngModel)]="editingProduct.Price" required>
      </div>
      <div class="form-group">
        <label>Discount (%):</label>
        <input type="number" class="form-control" name="Discount" [(ngModel)]="editingProduct.Discount" required>
      </div>
      <div class="form-group">
        <label>HotTrend:</label>
        <select class="form-control" name="HotTrend" [(ngModel)]="editingProduct.HotTrend" required>
          <option [ngValue]="true">Yes</option>
          <option [ngValue]="false">No</option>
        </select>
      </div>
      <div class="form-group">
        <label>Chọn ảnh sản phẩm mới:</label>
        <input type="file" class="form-control" (change)="onFileSelectedUpdate($event)">
      </div>
      <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
      <button type="button" class="btn btn-secondary ml-2" (click)="cancelEdit()">Hủy</button>
    </form>
  </div>
  `,
  styleUrls: ["./product-list.component.scss"],
  imports: [CommonModule, FormsModule],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    constructor(private service: ProductService) { }
    products: any[] = [];

    // Biến điều khiển hiển thị form thêm/sửa
    isAdding: boolean = false;
    isEditing: boolean = false;

    newProduct: any = {
      Name: '',
      TypeId: null,
      Importday: '',
      ImageUrl: '',
      Price: 0,
      Discount: 0,
      HotTrend: false
    };
    editingProduct: any = null;

    ngOnInit(): void {
        this.getProducts();
    }
    getProducts() {
        this.service.get_Products().subscribe(res => {
            this.products = res;
        });
    }
    // Xóa sản phẩm
    deleteProduct(id: any) {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
            this.service.delete_Products(id).subscribe(() => {
                alert("Sản phẩm đã được xóa thành công!");
                this.getProducts();
            });
        }
    }
    // Mở form sửa sản phẩm
    updateProduct(product: any) {
      // Nếu form thêm đang mở thì ẩn nó
      this.isAdding = false;
      // Clone dữ liệu sản phẩm để tránh thay đổi trực tiếp danh sách
      this.editingProduct = { ...product };
      this.isEditing = true;
    }
    // Hàm alias mở form sửa
    openUpdateForm(product: any) {
      this.updateProduct(product);
    }
    
    // Hàm xử lý upload file ảnh khi sửa
    onFileSelectedUpdate(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        // Gọi API upload ảnh
        this.service.upload_Image(formData).subscribe((res: any) => {
            this.editingProduct.ImageUrl = res.url;
            console.log("Upload thành công, URL:", res.url);
        }, error => {
            console.error("Lỗi upload ảnh:", error);
        });
      }
    }
  
    submitUpdate() {
      this.service.update_Products(this.editingProduct).subscribe(() => {
        alert("Cập nhật sản phẩm thành công!");
        this.isEditing = false;
        this.editingProduct = null;
        this.getProducts();
      });
    }
  
    cancelEdit() {
      this.isEditing = false;
      this.editingProduct = null;
    }
    
    // Mở form thêm sản phẩm
    openAddForm() {
      // Nếu form sửa đang mở thì ẩn nó
      this.isEditing = false;
      this.isAdding = true;
      // Reset newProduct
      this.newProduct = {
        Name: '',
        TypeId: null,
        Importday: '',
        ImageUrl: '',
        Price: 0,
        Discount: 0,
        HotTrend: false
      };
    }
    
    // Hàm xử lý upload file ảnh khi thêm
    onFileSelectedAdd(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        // Gọi API upload ảnh
        this.service.upload_Image(formData).subscribe((res: any) => {
            this.newProduct.ImageUrl = res.url;
            console.log("Upload add thành công, URL:", res.url);
        }, error => {
            console.error("Lỗi upload ảnh add:", error);
        });
      }
    }
    
    submitAdd() {
      this.service.add_Products(this.newProduct).subscribe(() => {
        alert("Thêm sản phẩm thành công!");
        this.newProduct = {
          Name: '',
          TypeId: null,
          Importday: '',
          ImageUrl: '',
          Price: 0,
          Discount: 0,
          HotTrend: false
        };
        this.isAdding = false;
        this.getProducts();
      });
    }
    
    cancelAdd() {
      this.isAdding = false;
      this.newProduct = {
        Name: '',
        TypeId: null,
        Importday: '',
        ImageUrl: '',
        Price: 0,
        Discount: 0,
        HotTrend: false
      };
    }
}
