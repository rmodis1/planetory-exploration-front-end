import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Mission } from '../../../mission';

@Component({
  selector: 'app-update-mission',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-mission.component.html',
  styleUrl: './update-mission.component.css',
})
export class UpdateMissionComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  missionForm: FormGroup | null = null;
  isSubmitting = false;
  submitError: string | null = null;

  ngOnInit() {
    // Subscribe to route params to handle navigation between different missions
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchMission(id);
      }
    });
  }

  private fetchMission(id: string) {
    this.http
      .get<{ data: Mission }>(`http://localhost:5125/api/mission/${id}`)
      .subscribe({
        next: (response) => {
          this.initForm(response.data);
          console.log('Mission:', response.data);
        },
        error: (error) => {
          console.error('Error fetching mission', error);
          this.submitError = 'Failed to load mission details';
        },
      });
  }

  private initForm(mission: Mission) {
    this.missionForm = this.formBuilder.group({
      name: [mission.name, Validators.required],
      date: [mission.date.split('T')[0], Validators.required],
      description: [mission.description, Validators.required],
      planetId: [mission.planetId, Validators.required],
    });
  }

  // Getters for form controls
  get name() {
    return this.missionForm!.get('name')!;
  }
  get date() {
    return this.missionForm!.get('date')!;
  }
  get description() {
    return this.missionForm!.get('description')!;
  }
  get planetId() {
    return this.missionForm!.get('planetId')!;
  }

  onSubmit() {
    if (this.missionForm?.valid) {
      this.isSubmitting = true;
      const missionId = this.route.snapshot.paramMap.get('id');

      const updatedMission = {
        ...this.missionForm.value,
        id: missionId,
      };

      this.http
        .put(`http://localhost:5125/api/mission/`, updatedMission)
        .subscribe({
          next: () => {
            this.router.navigate(['/missions/list']);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.submitError = error.message || 'Failed to update mission';
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['/missions/list']);
  }
}