import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [NgFor, NgIf, RouterLink],
})
export class CartComponent implements OnInit {
  private cart = inject(CartService);

  items: CartItem[] = [];
  total = 0;

  ngOnInit() {
    this.load();
  }

  load() {
    this.cart.getCart().subscribe({
      next: (res: any) => {
        this.items = res;
        this.recalc();
      },
    });
  }

  recalc() {
    this.total = this.items.reduce((s, it) => s + it.product.price * it.quantity, 0);
  }

  update(item: CartItem, qty: number) {
    if (qty < 1) {
      this.remove(item);
      return;
    }
    this.cart.update(item.id, qty).subscribe(() => this.load());
  }

  remove(item: CartItem) {
    this.cart.remove(item.id).subscribe(() => this.load());
  }
}
