import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../../../interfaces/mission';
import { FetchPlanetsService } from '../../../services/fetch-planets.service';

@Component({
  selector: 'app-delete-mission',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './delete-mission.component.html',
  styleUrl: './delete-mission.component.css'
})
export class DeleteMissionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private planetService = inject(FetchPlanetsService);
  planetName: string = '';


  mission: Mission | null = null;
  loading = true;
  error: string | null = null;
  isDeleting = false;

  ngOnInit() {
    const missionId = this.route.snapshot.paramMap.get('id');
    if (missionId) {
      this.fetchMission(missionId);
    } else {
      this.error = 'No mission ID provided';
      this.loading = false;
    }
  }

  private fetchMission(id: string) {
    this.http.get<{ data: Mission }>(`http://localhost:5125/api/mission/${id}`)
      .subscribe({
        next: (response) => {
          this.mission = response.data;
          this.fetchPlanetName(this.mission.planetId);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching mission:', error);
          this.error = 'Failed to load mission details';
          this.loading = false;
        }
      });
  }

  private fetchPlanetName(planetId: string) {
    this.planetService.getPlanets().subscribe({
      next: (response) => {
        const planet = response.data.find((p: any) => p.id === planetId);
        this.planetName = planet ? planet.name : 'Unknown Planet';
      },
      error: (error) => {
        console.error('Error fetching planet data', error);
        this.planetName = 'Unknown Planet';
      },
    });
  }

  confirmDelete() {
    const missionId = this.route.snapshot.paramMap.get('id');
    if (!missionId) return;

    this.isDeleting = true;
    this.http.delete(`http://localhost:5125/api/mission/${missionId}`)
      .subscribe({
        next: () => {
          // Navigate back to mission list after successful deletion
          this.router.navigate(['/missions/list']);
        },
        error: (error) => {
          console.error('Error deleting mission:', error);
          this.error = 'Failed to delete mission';
          this.isDeleting = false;
        }
      });
  }

  cancel() {
    this.router.navigate(['/missions/list']);
  }
}
