import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FetchPlanetsService } from '../../services/fetch-planets.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-planets',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './get-planets.component.html',
  styleUrl: './get-planets.component.css'
})
export class GetPlanetsComponent implements OnInit {
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
    this.fetchPlanetsService.getPlanetById(planetId).subscribe({
      next: (response) => (this.planetDetails = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });
  }

  trackByPlanetId(planet: any): number {
    return planet.id;
  }
}
