import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-planet.component.html',
  styleUrls: ['./update-planet.component.css']
})
export class UpdatePlanetComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  planetForm: FormGroup | null = null;
  isSubmitting = false;
  errorMessage: string | null = null;

  ngOnInit() {
    const planetId = this.route.snapshot.paramMap.get('id');
    if (planetId) {
      this.fetchPlanetDetails(planetId);
    } else {
      this.errorMessage = 'No planet ID provided';
    }
  }

  private fetchPlanetDetails(id: string) {
    this.http.get<any>(`http://localhost:5125/api/planet/${id}`)
      .subscribe({
        next: (response) => {
          this.initializeForm(response.data);
        },
        error: (error) => {
          console.error('Error fetching planet:', error);
          this.errorMessage = 'Failed to load planet details';
        }
      });
  }

  private initializeForm(planetData: any) {
    this.planetForm = this.formBuilder.group({
      id: [planetData.id],
      name: [planetData.name, Validators.required],
      type: [planetData.type, Validators.required],
      climate: [planetData.climate, Validators.required],
      terrain: [planetData.terrain, Validators.required],
      population: [planetData.population, Validators.required]
    });
  }

  onSubmit() {
    if (this.planetForm?.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const updateData = this.planetForm.value;

      this.http.put(`http://localhost:5125/api/planet/`, updateData)
        .subscribe({
          next: () => {
            this.router.navigate(['/planets']);
          },
          error: (error) => {
            console.error('Error updating planet:', error);
            this.errorMessage = 'Failed to update planet';
            this.isSubmitting = false;
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(['/planets']);
  }
}