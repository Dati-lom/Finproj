import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable ,firstValueFrom} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5066/api';

  constructor(private http: HttpClient, private router: Router) {}

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' })
      );

      if (response) {
        localStorage.setItem('token', response);
        localStorage.setItem('name',username)
      } else {
        console.log("Response does not contain a token.");
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }


  async register(username: string, password: string, name:string, surname:string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/register`, { username, password, name, surname }, { responseType: 'text' })
      );
      console.log("response: ", response);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
