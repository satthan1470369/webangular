import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductTypeListComponent } from './producttype-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductTypeListComponent],
  template: `
    <div class="nav">
      <button (click)="selectTab('products')" [class.active]="selectedTab === 'products'">
        Sản phẩm
      </button>
      <button (click)="selectTab('types')" [class.active]="selectedTab === 'types'">
        Chủng loại
      </button>
    </div>
    <div class="content">
      <app-product-list *ngIf="selectedTab === 'products'"></app-product-list>
      <app-producttype-list *ngIf="selectedTab === 'types'"></app-producttype-list>
    </div>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  selectedTab: string = 'products';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}