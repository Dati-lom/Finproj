import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable ,firstValueFrom} from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:5066/api';

  constructor(private http: HttpClient, private router: Router) {}
  notifications = signal<Notification[]>([]);
  notificationCount = computed(() => this.notifications().length);


  async ngOnInit() {
    await this.loadNotifications();
  }

  async loadNotifications() {
    try {
      const messages = await this.getMessages();
      this.notifications.set(messages);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }



  async getMessages(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await firstValueFrom(
        this.http.get(`${this.apiUrl}/messages`, {
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

  async sendMessage(username: string, title: string, content: string): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        this.router.navigate(['/login']);
        throw new Error("Authentication required");
      }

      const body = {
        Content: content,
        Title: title
      };

      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/messages/${username}`, body, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );

      return response;
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  }

  async updateMessageStatus(id: number, isRead: boolean): Promise<Notification> {
    try {
      const token = this.getToken();
      if (!token) {
        this.router.navigate(['/login']);
        throw new Error("Authentication required");
      }

      const response = await firstValueFrom(
        this.http.patch<any>(
          `${this.apiUrl}/messages/${id}`,
          { IsRead: isRead },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
      );

      return this.mapToNotification(response);
    } catch (error) {
      console.error("Update message error:", error);
      throw error;
    }
  }

  private mapToNotification(msg: any): Notification {
    return {
      id: msg.id,
      title: msg.title,
      content: msg.content,
      read: msg.isRead,
      createdAt: new Date(msg.createdAt),
    };
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
