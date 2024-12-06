import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-planet',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-planet.component.html',
  styleUrl: './add-planet.component.css'
})
export class AddPlanetComponent implements OnInit {
  planetForm: FormGroup<any>;
  isSubmitting = false;
  submitError: string | null = null;

  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.planetForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      climate: ['', Validators.required],
      terrain: ['', Validators.required],
      population: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.planetForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const planetData = {
      name: this.planetForm.value.name,
      type: this.planetForm.value.type,
      climate: this.planetForm.value.climate,
      terrain: this.planetForm.value.terrain,
      population: this.planetForm.value.population,
    };

    this.http
      .post('http://localhost:5125/api/planet', planetData)
      .pipe(
        tap(() => {
          // Success handling
          this.isSubmitting = false;
          this.planetForm.reset(); // Clear the form
          this.router.navigate(['/planets']); // Navigate to the planets list page
        }),
        catchError((error) => {
          // Error handling
          this.isSubmitting = false;
          this.submitError =
            error.message || 'Failed to create planet. Please try again.';
          return of(null);
        })
      )
      .subscribe();
  }
}
