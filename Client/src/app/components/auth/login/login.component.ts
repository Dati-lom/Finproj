import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { RouterModule, Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {  UserService} from '../../../services/user.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone:true,
  template: `
     <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h1>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
            <input type="text" id="username" [(ngModel)]="username" name="username"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password"
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>
          <button type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">Don't have an account?
          <a routerLink="/register" class="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private authService = inject(AuthService);
  private userService = inject(UserService)
  private router = inject(Router)

  async onSubmit() {
    try {
      await this.authService.login(this.username, this.password);
      await this.userService.getUser();


      this.router.navigate(['/profile']);
    } catch (error) {
      console.log('Login failed:', error);
    }
  }
}
