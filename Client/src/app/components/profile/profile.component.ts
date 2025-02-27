import { Component, inject } from '@angular/core';
import { User, UserProfile } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">My Profile</h1>
      <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          @if(!isEditing){
            <h2 class="text-xl font-semibold">{{ user?.name }}</h2>
            <h3 class="text-xl font-semibold">{{ user?.surname }}</h3>
          }
          @if(isEditing){
            <input
            [(ngModel)]="editableUser.name"
            class="border p-2 rounded w-full"
          />
          <input
            [(ngModel)]="editableUser.surname"
            class="border p-2 rounded w-full"
          />
          }

          <span
            class="px-3 py-1 rounded-full text-sm font-medium"
            [ngClass]="{
              'bg-green-100 text-green-600': user?.role,
              'bg-blue-100 text-blue-600': !user?.role
            }"
          >
            {{ user?.role ? 'Admin' : 'Employee' }}
          </span>
        </div>
        <p class="text-gray-700"><strong>Position:</strong>
          <span *ngIf="!isEditing">{{ user?.position }}</span>
          <input *ngIf="isEditing" [(ngModel)]="editableUser.position" class="border p-2 rounded w-full" />
        </p>
        <p class="text-gray-700"><strong>Department:</strong>
          <span *ngIf="!isEditing">{{ user?.department }}</span>
          <input *ngIf="isEditing" [(ngModel)]="editableUser.department" class="border p-2 rounded w-full" />
        </p>

        <button *ngIf="!isEditing" (click)="editProfile()"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit
        </button>

        <div *ngIf="isEditing" class="mt-4 flex gap-2">
          <button (click)="updateProfile()"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Update
          </button>
          <button (click)="cancelEdit()"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  user! : User
  editableUser!: User;
  isEditing = false;
  errorMessage: string | null = null;
  router = inject(Router)

  constructor(private userService: UserService) {}

  async ngOnInit() {
  try{

  const userData = await this.userService.getUser();
  this.user = { ...userData, role: userData.isAdmin, name:userData.name, surname:userData.surname };
  this.editableUser = { ...this.user };
}catch{
  this.router.navigate(['/login'])
}

}

  editProfile() {
    this.isEditing = true;
    this.editableUser = { ...this.user };
  }

  async updateProfile() {
    try {
      const updateData: UserProfile = {
        username: this.editableUser.username,
        name: this.editableUser.name,
        surname: this.editableUser.surname,
        position: this.editableUser.position,
        department: this.editableUser.department
      };

      const updatedUser = await this.userService.updateProfile(updateData);

      this.user = {
        ...this.user,
        position: updatedUser.position,
        department: updatedUser.department
      };

      this.isEditing = false;
      this.errorMessage = null;
      window.location.reload();
    } catch (error) {
      console.error('Update failed:', error);
      this.errorMessage = 'Failed to update profile';
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editableUser = { ...this.user };
  }
}
