import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Mission } from '../../interfaces/mission';
import { DiscoveryType } from '../../interfaces/discoveryType';
import { Discovery } from '../../interfaces/discovery';
import { DiscoveryTypeService } from '../../services/fetch-discovery-types.service';
import { FetchMissionsService } from '../../services/fetch-missions.service';

@Component({
  selector: 'app-update-discovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './update-discovery.component.html',
  styleUrl: './update-discovery.component.css'
})
export class UpdateDiscoveryComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private discoveryTypeService = inject(DiscoveryTypeService);
  private fetchMissionService = inject(FetchMissionsService);

  discoveryForm!: FormGroup;
  missions: Mission[] = [];
  discoveryTypes: DiscoveryType[] = [];
  isSubmitting = false;
  errorMessage: string | null = null;
  discoveryId: string | null = null;
  currentDiscovery: Discovery | null = null;

  constructor() {
    // Get the discovery data from router state
    const navigation = this.router.getCurrentNavigation();
    this.currentDiscovery = navigation?.extras?.state?.['discovery'] as Discovery;

    // If no discovery data in state, redirect back to discoveries list
    if (!this.currentDiscovery) {
      this.router.navigate(['/discoveries/get-discoveries']);
      return;
    }

    this.discoveryId = this.currentDiscovery.id;

    this.discoveryForm = this.formBuilder.group({
      name: [this.currentDiscovery.name, Validators.required],
      description: [this.currentDiscovery.description, Validators.required],
      location: [this.currentDiscovery.location, Validators.required],
      missionId: [this.currentDiscovery.missionId, Validators.required],
      discoveryTypeId: [this.currentDiscovery.discoveryTypeId, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchMissions();
    this.fetchDiscoveryTypes();
  }

  private fetchMissions() {
    this.fetchMissionService.getMissions()
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

  private fetchDiscoveryTypes() {
    this.discoveryTypeService.getDiscoveryTypes()
      .subscribe({
        next: (response) => {
          this.discoveryTypes = response.data;
        },
        error: (error) => {
          console.error('Error fetching discovery types:', error);
          this.errorMessage = 'Failed to load discovery types';
        }
      });
  }

  onSubmit() {
    if (this.discoveryForm.valid && this.discoveryId) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const missionId = this.discoveryForm.get('missionId')?.value;
      const discoveryData = {
        id : this.discoveryId,
        missionId: missionId,
        discoveryTypeId: this.discoveryForm.get('discoveryTypeId')?.value,
        name: this.discoveryForm.get('name')?.value,
        description: this.discoveryForm.get('description')?.value,
        location: this.discoveryForm.get('location')?.value
      };
  
      this.http.put(`http://localhost:5125/api/discovery/${this.discoveryId}`, discoveryData)
        .subscribe({
          next: () => {
            this.router.navigate(['/discoveries/get-discoveries']);
            console.log('Discovery updated successfully');
            console.log('Updated discovery data:', discoveryData);
          },
          error: (error) => {
            console.error('Error updating discovery:', error);
            this.errorMessage = 'Failed to update discovery';
            this.isSubmitting = false;
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(['/discoveries/get-discoveries']);
  }
}
