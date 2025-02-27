import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { RouterModule, Router } from '@angular/router';
import { AuthResponse } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule],
  template: `
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h1>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
            <input type="text" id="username" [(ngModel)]="username" name="username"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input type="text" id="name" [(ngModel)]="name" name="name"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <div>
            <label for="surname" class="block text-sm font-medium text-gray-600">Surname</label>
            <input type="text" id="surname" [(ngModel)]="surname" name="surname"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input type="password" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <button type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Register
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">Already have an account?
          <a routerLink="/login" class="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  surname: string = '';
  name: string = '';
  confirmPassword: string = '';
  authService = inject(AuthService)
  router = inject(Router)

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    this.authService.register(this.username,this.password,this.name, this.surname)
    this.router.navigate(["/login"])
    console.log('Registered:', this.username);
  }
}
