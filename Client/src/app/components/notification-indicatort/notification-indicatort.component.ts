import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-indicator',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="relative">
      <a routerLink="/notifications" class="p-2 text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        @if (unreadCount > 0) {
          <span class="absolute top-2.5 left-4 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {{ "!" }}
          </span>
        }
      </a>
    </div>
  `,
})
export class NotificationIndicatorComponent {
  unreadCount = 0;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications() {
    try {
      const messages = await this.messageService.getMessages();
      console.log(messages);

      this.unreadCount = messages.filter((m: any) => !m.read).length;
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }
}
