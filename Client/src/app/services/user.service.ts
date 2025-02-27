import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable ,firstValueFrom} from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5066/api';

  constructor(private http: HttpClient, private router: Router) {}

  async getUser(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await firstValueFrom(
        this.http.get(`${this.apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );
      console.log("profile response: ", response);


      return response;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  }

  async updateProfile(updateData: UserProfile): Promise<UserProfile> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Convert to backend DTO structure
      const backendDto = {
        Username: updateData.username,
        Position: updateData.position,
        Department: updateData.department,
        Name:updateData.name,
        Surname:updateData.surname
      };

      const response = await firstValueFrom(
        this.http.patch<UserProfile>(
          `${this.apiUrl}/user`, // Match backend route
          backendDto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
      );

      console.log("Profile updated:", response);
      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
