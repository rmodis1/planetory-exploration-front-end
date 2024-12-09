import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Mission } from '../../interfaces/mission';
import { Discovery } from '../../interfaces/discovery';
import { Router, RouterModule } from '@angular/router';
import { FetchMissionsService } from '../../services/fetch-missions.service';

@Component({
  selector: 'app-get-discoveries',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './get-discoveries.component.html',
  styleUrl: './get-discoveries.component.css'
})
export class GetDiscoveriesComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private fetchMissionsService = inject(FetchMissionsService);
  
  
  missions: Mission[] = [];
  discoveries: Discovery[] = [];
  selectedMissionId: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.fetchMissions();
  }

  private fetchMissions() {
    this.fetchMissionsService.getMissions()
      .subscribe({
        next: (response) => {
          this.missions = response.data;
        },
        error: (error) => {
          console.error('Error fetching missions:', error);
          this.errorMessage = 'Failed to load missions';
        }
      });
  }

  onMissionSelect() {
    if (this.selectedMissionId) {
      this.fetchDiscoveries(this.selectedMissionId);
    } else {
      this.discoveries = [];
    }
  }

  private fetchDiscoveries(missionId: string) {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.http.get<{ data: Discovery[] }>(`http://localhost:5125/api/mission/${missionId}/discovery`)
      .subscribe({
        next: (response) => {
          this.discoveries = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching discoveries:', error);
          this.errorMessage = 'Failed to load discoveries';
          this.isLoading = false;
          this.discoveries = [];
        }
      });
  }

  onUpdateDiscovery(discovery: Discovery) {
    this.router.navigate(['/discoveries/update', discovery.id], {
      state: { discovery }
    });
  }

  onDeleteDiscovery(discovery: Discovery) {
    this.router.navigate(['/discoveries/delete', discovery.id], {
      state: { discovery }
    });
  }
}