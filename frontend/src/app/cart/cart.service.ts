import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

export interface CartItem {
  id: number;
  product: any;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);

  getCart() {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart`);
  }

  add(productId: number, quantity = 1) {
    return this.http.post(`${environment.apiUrl}/cart/add`, { productId, quantity });
  }

  update(cartItemId: number, quantity: number) {
    return this.http.put(`${environment.apiUrl}/cart/${cartItemId}`, { quantity });
  }

  remove(cartItemId: number) {
    return this.http.delete(`${environment.apiUrl}/cart/${cartItemId}`);
  }
}
