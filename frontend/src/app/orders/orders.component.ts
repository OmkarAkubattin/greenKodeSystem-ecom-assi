import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from './orders.service';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
})
export class OrdersComponent {
  private orders = inject(OrdersService);

  // expose observable to template and use async pipe there
  items$: Observable<any[]> = this.orders.myOrders() as Observable<any[]>;
}
