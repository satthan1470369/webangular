import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-container">
      <h1>Thanh toán đơn hàng</h1>
      <p>Quét mã QR bằng ứng dụng ngân hàng để thanh toán</p>

      <div class="qr-wrapper" *ngIf="qrImageUrl">
        <img [src]="qrImageUrl" alt="QR code thanh toán" />
      </div>

      <div class="actions">
        <button (click)="goBackToCart()">Quay lại giỏ hàng</button>
        <button (click)="goHome()">Về trang chủ</button>
      </div>
    </div>
  `,
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // Đường dẫn QR được lưu trong database và truyền qua query parameter hoặc lấy từ API
  qrImageUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Lấy qrImageUrl từ query parameters (ví dụ: ?qrLink=...)
    this.route.queryParams.subscribe(params => {
      this.qrImageUrl = params['qrLink'] || 'https://firebasestorage.googleapis.com/v0/b/banhang-e9c0b.firebasestorage.app/o/images%2F566d2932-5be3-4af4-8880-f5a67163e546.jpg?alt=media&token=836533f7-96d8-44dd-ae69-b417fa00ebbe';
    });
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
