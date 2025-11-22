import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/cart">Cart</a>
      <a routerLink="/orders" *ngIf="auth.isLoggedIn()">Orders</a>
      <a routerLink="/profile" *ngIf="auth.isLoggedIn()">Profile</a>
      <a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
      <a (click)="logout()" *ngIf="auth.isLoggedIn()">Logout</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, NgIf],
})
export class AppComponent {
  auth = inject(AuthService);

  logout() {
    this.auth.logout();
    window.location.href = '/';
  }
}
