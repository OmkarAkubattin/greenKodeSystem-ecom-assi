import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink, CommonModule],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    mobile: [''],
  });

  error = '';

  submit() {
    if (this.form.invalid) return;

    this.auth.signup(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (e) => (this.error = e.error?.message || 'Signup failed'),
    });
  }
}
