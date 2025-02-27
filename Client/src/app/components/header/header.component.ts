import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationIndicatorComponent } from '../notification-indicatort/notification-indicatort.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationIndicatorComponent],
  template: `
  <header class="bg-black shadow-md">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a routerLink="/" class="text-xl font-bold text-blue-400">MyApp</a>

    <app-notification-indicator></app-notification-indicator>
    <nav>
      <ul class="flex space-x-6">
      @if (getUser()) {
        <li>
        <a routerLink="/profile" class="text-white hover:text-blue-400">
            {{getUser()}}
          </a>

      </li>
      <li>
          <button (click)="logout()" class="text-white hover:text-blue-400">
            Logout
          </button>
        </li>
      }@else{
        <li>
            <a routerLink="/login" class="text-white hover:text-blue-400">Login</a>
          </li>
          <li>
            <a routerLink="/register" class="text-white hover:text-blue-400">Register</a>
          </li>

      }
      </ul>
    </nav>
  </div>
</header>
  `,
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  router = inject(Router)

  getUser = () =>{
    return localStorage.getItem("name")
  }
  logout = () =>{
    localStorage.clear()
    this.router.navigate(['/login'])

  }
}
