import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { Mission } from '../interfaces/mission';
import { FetchMissionsService } from '../services/fetch-missions.service';
import { FetchPlanetsService } from '../services/fetch-planets.service';
import { MissionsListComponent } from "./missions-list/missions-list.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css',
})
export class MissionsComponent implements OnInit {
  http = inject(HttpClient);
  fetchMissionsService = inject(FetchMissionsService);
  fetchPlanetsService = inject(FetchPlanetsService);
  missions: any;
  planets: any = { data: []};
  formBuilder = inject(FormBuilder);
  missionForm: FormGroup<any>;
  isSubmitting = false;
  submitError: string | null = null;
  missionData: Mission | null = null; 

  constructor() {
    this.missionForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      planetId: ['', Validators.required],
    });
  }

  // Getters for easy form control access
  get name() {
    return this.missionForm.get('name')!;
  }
  get date() {
    return this.missionForm.get('date')!;
  }
  get description() {
    return this.missionForm.get('description')!;
  }
  get planetId() {
    return this.missionForm.get('planetId')!;
  }

  ngOnInit() {
    this.fetchMissions();

    this.fetchPlanets();
  }

  fetchMissions(): void {
    this.fetchMissionsService.getMissions().subscribe(
      (data: any) => {
        this.missions = data;
      },
      (error: any) => {
        console.error('Error fetching missions', error);
      }
    );
  }

  fetchPlanets(): void {
    this.fetchPlanetsService.getPlanets().subscribe(
      (data: any) => {
        this.planets = data;
      },
      (error: any) => {
        console.error('Error fetching planets', error);
      }
    );
  }

  onSubmit() {
    // Reset previous error state
    this.submitError = null;
  
    if (this.missionForm.valid) {
      this.isSubmitting = true;
  
      const missionData: Mission = {
        name: this.missionForm.value.name,
        date: this.missionForm.value.date,
        description: this.missionForm.value.description,
        planetId: this.missionForm.value.planetId,
        id: ''
      };
  
      this.http
        .post('http://localhost:5125/api/mission', missionData)
        .pipe(
          tap(() => {
            // Success handling
            this.isSubmitting = false;
            this.missionForm.reset(); // Clear the form
          }),
          catchError((error) => {
            // Error handling
            this.isSubmitting = false;
            this.submitError =
              error.message || 'Failed to create mission. Please try again.';
            return of(null);
          })
        )
        .subscribe();
    }
  }
  trackByMission(mission: any): number {
    return mission.name + mission.date;
  }
}
