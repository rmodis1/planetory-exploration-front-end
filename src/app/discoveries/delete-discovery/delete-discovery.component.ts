import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Discovery } from '../../interfaces/discovery';

@Component({
  selector: 'app-delete-discovery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-discovery.component.html',
  styleUrl: './delete-discovery.component.css'
})
export class DeleteDiscoveryComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentDiscovery: Discovery | null = null;
  isDeleting = false;
  errorMessage: string | null = null;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.currentDiscovery = navigation?.extras?.state?.['discovery'] as Discovery;

    if (!this.currentDiscovery) {
      this.router.navigate(['/discoveries/get-discoveries']);
    }
  }

  onConfirmDelete() {
    if (this.currentDiscovery) {
      this.isDeleting = true;
      this.errorMessage = null;

      this.http.delete(`http://localhost:5125/api/discovery/${this.currentDiscovery.id}`)
        .subscribe({
          next: () => {
            console.log('Discovery deleted successfully');
            this.router.navigate(['/discoveries/get-discoveries']);
          },
          error: (error) => {
            console.error('Error deleting discovery:', error);
            this.errorMessage = 'Failed to delete discovery';
            this.isDeleting = false;
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(['/discoveries/get-discoveries']);
  }
}