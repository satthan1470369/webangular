import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGalleryComponent } from '../components/product-gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductGalleryComponent],
  template: `
    <app-product-gallery></app-product-gallery>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
