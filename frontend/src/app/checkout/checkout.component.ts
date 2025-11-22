import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../orders/orders.service';
import { NgFor, NgIf } from '@angular/common';
import { CartItem, CartService } from '../cart/cart.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgFor],
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orders = inject(OrdersService);
  private router = inject(Router);
  private cart = inject(CartService);
  private auth = inject(AuthService);

  user = this.auth.getUser();
  items: CartItem[] = [];
  subtotal = 0;
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
    this.subtotal = this.items.reduce((s, it) => s + it.product.price * it.quantity, 0);
    this.total = this.subtotal
  }

  form = this.fb.nonNullable.group({
    customerName: [this.user.name, Validators.required],
    address: [this.user.address, Validators.required],
    phone: [this.user.mobile, Validators.required],
  });

  error = '';

  submit() {
    if (this.form.invalid) return;

    this.orders.checkout(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => (this.error = e.error?.message || 'Checkout failed'),
    });
  }
}
