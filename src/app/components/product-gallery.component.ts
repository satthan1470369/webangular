import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-gallery">
      <h2>Tất Cả Sản Phẩm</h2>
      <div class="gallery-grid">
        <div class="product-card" *ngFor="let product of products">
          <div class="discount" *ngIf="product.Discount">Giảm giá</div>
          <img [src]="product.ImageUrl" alt="{{ product.Name }}" />
          <h3>{{ product.Name }}</h3>
          <p *ngIf="product.Discount" class="old-price">
            {{ product.Price | number }} VND
          </p>
          <p class="price">
            {{ product.Price - (product.Price * (product.Discount || 0) / 100) | number }} VND
          </p>
          <div class="actions">
            <button (click)="addToCart(product)">Thêm vào giỏ</button>
            <button>Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    // Lấy dữ liệu sản phẩm từ service
    this.productService.get_Products().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    // Tạo đối tượng CartItem với số lượng mặc định là 1
    const cartItem: CartItem = {
      ProductID: product.ProductID,
      Name: product.Name,
      ImageUrl: product.ImageUrl,
      Price: product.Price,
      Discount: product.Discount,
      quantity: 1
    };

    this.cartService.addToCart(cartItem);
    alert(`${product.Name} đã được thêm vào giỏ hàng!`);
  }
}
