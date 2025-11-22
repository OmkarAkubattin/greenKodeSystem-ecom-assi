import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);

  checkout(payload: { customerName: string; address: string; phone: string }) {
    return this.http.post(`${environment.apiUrl}/orders/checkout`, payload);
  }

  myOrders() {
    return this.http.get(`${environment.apiUrl}/orders`);
  }
}
