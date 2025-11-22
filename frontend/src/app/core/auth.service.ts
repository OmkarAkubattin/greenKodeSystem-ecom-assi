import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'GK_TOKEN';

  signup(payload: { name: string; email: string; password: string; mobile?: string }) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, payload);
  }

  login(payload: { email: string; password: string }) {
    return this.http
      .post<{ access_token: string; user: any }>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(
        tap((res) => {
          if (res?.access_token) {
            localStorage.setItem(this.tokenKey, res.access_token);
            localStorage.setItem('GK_USER', JSON.stringify(res.user));
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('GK_USER');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser() {
    const raw = localStorage.getItem('GK_USER');
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
