import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FetchPlanetsService } from '../../services/fetch-planets.service';

@Component({
  selector: 'app-delete-planet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-planet.component.html',
  styleUrls: ['./delete-planet.component.css']
})
export class DeletePlanetComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private planetService = inject(FetchPlanetsService);

  currentPlanet: any = null;
  loading = true;
  error: string | null = null;
  isDeleting = false;

  ngOnInit() {
    const planetId = this.route.snapshot.paramMap.get('id');
    if (planetId) {
      this.fetchPlanet(planetId);
    } else {
      this.error = 'No planet ID provided';
      this.loading = false;
    }
  }

  private fetchPlanet(id: string) {
    this.planetService.getPlanetById(id)
      .subscribe({
        next: (response) => {
          this.currentPlanet = response.data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching planet:', error);
          this.error = 'Failed to load planet details';
          this.loading = false;
        }
      });
  }

  confirmDelete() {
    const planetId = this.route.snapshot.paramMap.get('id');
    if (!planetId) return;

    this.isDeleting = true;
    this.http.delete(`http://localhost:5125/api/planet/${planetId}`)
      .subscribe({
        next: () => {
          this.router.navigate(['/planets']);
        },
        error: (error) => {
          console.error('Error deleting planet:', error);
          this.error = 'Failed to delete planet';
          this.isDeleting = false;
        }
      });
  }

  cancel() {
    this.router.navigate(['/planets']);
  }
}