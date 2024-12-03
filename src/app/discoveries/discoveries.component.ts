import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-discoveries',
  standalone: true,
  imports: [],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css',
})
export class DiscoveriesComponent implements OnInit {
  http = inject(HttpClient);
  discoveries: any;
  planets: any;

  ngOnInit() {
    this.http.get('http://localhost:5125/api/discovery/types').subscribe({
      next: (response) => (this.discoveries = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });
  }
}
