import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, LoginComponent, RegisterComponent, ProfileComponent, HeaderComponent],
  template: `
  <app-header></app-header>
<!-- <app-login></app-login> -->
   <!-- <app-register></app-register> -->
  <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-portal';
}
