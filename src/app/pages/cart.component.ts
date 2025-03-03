import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cart-container">
      <h1>Giỏ hàng của bạn</h1>
      <div *ngIf="cartItems.length === 0">
        <p>Chưa có sản phẩm nào trong giỏ hàng!</p>
      </div>
      <div *ngIf="cartItems.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of cartItems">
              <td>
                <img [src]="item.ImageUrl" alt="{{ item.Name }}" class="cart-img" />
                {{ item.Name }}
              </td>
              <td>
                {{ item.Price - (item.Price * item.Discount / 100) | number }} VND
              </td>
              <td>
                <input type="number" [(ngModel)]="item.quantity" (change)="updateItem(item)" min="1" />
              </td>
              <td>
                {{ (item.Price - (item.Price * item.Discount / 100)) * item.quantity | number }} VND
              </td>
              <td>
                <button class="btn btn-danger btn-sm" (click)="removeItem(item.ProductID)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="cart-summary">
          <h3>Tổng tiền: {{ total | number }} VND</h3>
          <button class="btn btn-warning" (click)="clearCart()">Xoá giỏ hàng</button>
        </div>

        <!-- Thêm form thông tin người nhận -->
        <div class="shipping-info mt-4">
          <h3>Thông tin người nhận</h3>
          <form #shippingForm="ngForm" (ngSubmit)="onSubmitOrder()">
            <div class="form-group mb-2">
              <label>Họ và tên</label>
              <input type="text" class="form-control" [(ngModel)]="orderData.fullName" name="fullName" required />
            </div>
            <div class="form-group mb-2">
              <label>Số điện thoại</label>
              <input type="text" class="form-control" [(ngModel)]="orderData.phone" name="phone" required />
            </div>
            <div class="form-group mb-3">
              <label>Địa chỉ</label>
              <input type="text" class="form-control" [(ngModel)]="orderData.address" name="address" required />
            </div>
            <button class="btn btn-primary" [disabled]="shippingForm.invalid">Đặt hàng</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  // Thông tin người nhận
  orderData = {
    fullName: '',
    phone: '',
    address: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateItem(item: CartItem): void {
    this.cartService.updateQuantity(item.ProductID, item.quantity);
    this.calculateTotal();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }

// Hàm gọi khi nhấn "Đặt hàng"
onSubmitOrder(): void {
  // Kiểm tra nếu chưa đăng nhập (dựa vào localStorage)
  if (!localStorage.getItem('token')) {
    alert('Bạn cần đăng nhập trước khi đặt hàng.');
    this.router.navigate(['/login']);
    return;
  }
  
  // Tạo orderId tạm (ví dụ dùng timestamp)
  const orderId = Date.now();
  const amount = this.total;

  // Chuyển sang trang Payment kèm queryParams
  this.router.navigate(['/cart/payment'], {
    queryParams: {
      amount: amount,
      orderId: orderId
    }
  }).then(() => {
    // Sau khi chuyển hướng, xoá giỏ hàng
    this.clearCart();
  });
}

}
