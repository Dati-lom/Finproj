import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { Notification } from '../../models/notification.model';
import { DatePipe } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Notifications ({{ notificationCount() }})</h1>

      <div class="mb-6 p-6 bg-white shadow-md rounded-lg">
        <input [(ngModel)]="recipientUsername"
               class="w-full p-3 border rounded-lg mb-3"
               placeholder="Recipient username">
        <input [(ngModel)]="newTitle"
               class="w-full p-3 border rounded-lg mb-3"
               placeholder="Notification title">

        <textarea [(ngModel)]="newContent"
                  class="w-full p-3 border rounded-lg mb-3"
                  placeholder="Write a new notification..."></textarea>

        <button (click)="createNotification()"
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send Notification
        </button>
      </div>

      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        @for (notification of notifications(); track notification.id) {
          <div class="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">{{ notification.title }}</h3>
              @if (!notification.read) {
                <span class="text-xs text-red-500">NEW</span>
                <button
                  (click)="markAsRead(notification)"
                  class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors">
                  Mark as Read
                </button>
              }
            </div>
            <p class="text-gray-700 mb-2">{{ notification.content }}</p>
            <div class="text-sm text-gray-500">
              <span>From: {{senderName()}}</span>
              <span class="mx-2">•</span>
              <span>{{ notification.createdAt }}</span>
            </div>
          </div>
        } @empty {
          <div class="p-4 text-gray-500">
            No notifications available
          </div>
        }
      </div>
    </div>
  `,
})
export class NotificationComponent {
  notifications = signal<Notification[]>([]);
  notificationCount = computed(() => this.notifications().length);

  newTitle = '';
  senderName = signal(localStorage.getItem("name") ?? "");
  newContent = '';
  recipientUsername = '';

  constructor(private messageService: MessageService) {}

  async ngOnInit() {
    await this.loadNotifications();
  }

  async loadNotifications() {
    try {
      const messages = await this.messageService.getMessages();
      this.notifications.set(messages);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  async createNotification() {
    try {
      if (!this.recipientUsername.trim() || !this.newTitle.trim() || !this.newContent.trim()) {
        alert('Please fill in all fields');
        return;
      }

      const newNotification = await this.messageService.sendMessage(
        this.recipientUsername,
        this.newTitle,
        this.newContent
      );

      this.notifications.update(currentNotifications => [...currentNotifications, newNotification]);

      this.recipientUsername = '';
      this.newTitle = '';
      this.newContent = '';
    } catch (error) {
      console.error('Failed to create notification:', error);
      alert('Failed to send notification - check console for details');
    }
  }

  async markAsRead(notification: Notification) {
    try {
      const updatedNotification = await this.messageService.updateMessageStatus(
        notification.id,
        true
      );

      this.notifications.update(currentNotifications =>
        currentNotifications.map(n =>
          n.id === notification.id ? {...n, read: true} : n
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
      alert('Failed to update notification status');
    }
  }
}
