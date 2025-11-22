import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  user = this.auth.getUser();
  form = this.fb.nonNullable.group({
    name: [this.user?.name || '', Validators.required],
    mobile: [this.user?.mobile || ''],
  });

  msg = '';

  save() {
    const id = this.user?.id;
    if (!id) return;

    this.http.put(`${environment.apiUrl}/users/${id}`, this.form.getRawValue()).subscribe({
      next: (res: any) => {
        this.msg = 'Profile saved successfully';
        localStorage.setItem('GK_USER', JSON.stringify(res));
      },
      error: (e) => (this.msg = e.error?.message || 'Failed to save profile'),
    });
  }
}
