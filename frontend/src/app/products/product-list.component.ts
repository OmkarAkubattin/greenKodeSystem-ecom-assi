import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService, Product } from './product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [NgFor, NgIf],
})
export class ProductListComponent implements OnInit {
  private ps = inject(ProductService);
  private cart = inject(CartService);

  products: Product[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.ps.list().subscribe({
      next: (p) => {
        this.products = p;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  addToCart(productId: number) {
    this.cart.add(productId, 1).subscribe({
      next: () => alert('Added to cart'),
      error: (e) => alert(e.error?.message || 'Failed to add to cart'),
    });
  }
}
