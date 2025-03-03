import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  template: `
    <h1>Chi tiết sản phẩm</h1>
    <p>Sản phẩm ID: {{ productId }}</p>
  `,
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productId: number;

  constructor(private route: ActivatedRoute) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
