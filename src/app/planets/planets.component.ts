import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FetchPlanetsService } from '../services/fetch-planets.service';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css'
})
export class PlanetsComponent implements OnInit {
  http = inject(HttpClient);
  planetControl = new FormControl<number | null>(null);
  planets: any = { data: []};
  planetDetails: any = null;
  private fetchPlanetsService = inject(FetchPlanetsService);

  ngOnInit(): void {
    this.fetchPlanetsService.getPlanets().subscribe({
      next: (response) => (this.planets = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });

    this.planetControl.valueChanges.subscribe(selectedPlanetId => {
      if (selectedPlanetId) {
        this.fetchPlanetDetails(selectedPlanetId);
      }
    });
  }

  fetchPlanetDetails(planetId: number): void {
    this.http.get(`http://localhost:5125/api/planet/${planetId}`).subscribe({
      next: (response) => (this.planetDetails = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });
  }

  trackByPlanetId(planet: any): number {
    return planet.id;
  }
}