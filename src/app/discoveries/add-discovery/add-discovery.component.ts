import { Component, inject, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Mission } from '../../interfaces/mission';
import { DiscoveryType } from '../../interfaces/discoveryType';
import { DiscoveryTypeService } from '../../services/fetch-discovery-types.service';
import { FetchMissionsService } from '../../services/fetch-missions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-discovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-discovery.component.html',
  styleUrl: './add-discovery.component.css'
})
export class AddDiscoveryComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private discoveryTypeService = inject(DiscoveryTypeService);
  private fetchMissionService = inject(FetchMissionsService);

  discoveryForm: FormGroup;
  missions: Mission[] = [];
  discoveryTypes: DiscoveryType[] = [];
  isSubmitting = false;
  errorMessage: string | null = null;
  discoveryTypeDetails: any = null;
  isDropdownOpen = false;
  selectedTypeName = '';
  activeTooltip = false;
  tooltipPosition = { top: 0, left: 0 };

  constructor() {
    this.discoveryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      missionId: ['', Validators.required],
      discoveryTypeId: ['', Validators.required]
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
    if (this.discoveryForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const missionId = this.discoveryForm.get('missionId')?.value;
      const discoveryData = {
        missionId: missionId,
        discoveryTypeId: this.discoveryForm.get('discoveryTypeId')?.value,
        name: this.discoveryForm.get('name')?.value,
        description: this.discoveryForm.get('description')?.value,
        location: this.discoveryForm.get('location')?.value
      };
  
      this.http.post(`http://localhost:5125/api/mission/${missionId}/discovery`, discoveryData)
        .subscribe({
          next: () => {
            this.router.navigate(['/discoveries/get-discoveries']);
            console.log('Discovery created successfully');
            console.log('Discovery data:', discoveryData);
          },
          error: (error) => {
            console.error('Error creating discovery:', error);
            this.errorMessage = 'Failed to create discovery';
            this.isSubmitting = false;
          }
        });
    }
  }

  //Think about if this is the functionality you want
  onCancel() {
    this.router.navigate(['/discoveries/get-discoveries']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  showTypeDetails(type: any, event: MouseEvent) {
    this.discoveryTypeDetails = type;
    this.activeTooltip = true;

  // Get the hovered option element
  const optionElement = event.target as HTMLElement;
  const rect = optionElement.getBoundingClientRect();
  const dropdownWidth = optionElement.offsetWidth;
  
  // Position tooltip next to the hovered option
  this.tooltipPosition = {
    top: rect.top,
    left: rect.left + dropdownWidth + 50 
  };
  // Check if tooltip would go off-screen to the right
  const tooltipWidth = 250; // This should match your min-width in CSS
  if (rect.left + dropdownWidth + tooltipWidth > window.innerWidth) {
    // If it would go off-screen, position it to the left of the dropdown instead
    this.tooltipPosition.left = rect.left - tooltipWidth - 20;
  }

  }

  hideTypeDetails() {
    this.activeTooltip = false;
  }

  selectOption(type: any) {
    this.selectedTypeName = type.name;
    this.discoveryForm.get('discoveryTypeId')?.setValue(type.id);
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const select = (event.target as HTMLElement).closest('.custom-select');
    if (!select) {
      this.isDropdownOpen = false;
    }
  }
}

