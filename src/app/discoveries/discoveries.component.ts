import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-discoveries',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css',
})
export class DiscoveriesComponent implements OnInit {
  http = inject(HttpClient);
  discoveryControl = new FormControl<number | null>(null);
  discoveries: any = { data: [] };
  discoveryDetails: any;
  planets: any;

  ngOnInit() {
    this.http.get('http://localhost:5125/api/discovery/types').subscribe({
      next: (response) => (this.discoveries = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });

    this.discoveryControl.valueChanges.subscribe(selectedDiscoveryId => {
      if (selectedDiscoveryId !== null) {
        this.displayDiscoveryDetails(selectedDiscoveryId);
      }
    });
  }

  displayDiscoveryDetails(discoveryId: number): void {
    console.log('Searching for ID:', discoveryId);
    console.log('Discoveries data:', this.discoveries.data);
    console.log('Type of discoveries.data:', typeof this.discoveries.data);
    console.log('Is discoveries.data an array?', Array.isArray(this.discoveries.data));

    const selectedDiscovery = this.discoveries.data.find((discovery: any) => {
      console.log('Checking discovery:', discovery);
      console.log('Comparing discovery.id:', discovery.id, 'with discoveryId:', discoveryId);
      return discovery.id == discoveryId;
    });

    this.discoveryDetails = selectedDiscovery ? selectedDiscovery : null;
    console.log('Found discovery:', this.discoveryDetails);
  }

  trackByDiscoveryId(index: number, discovery: any): number {
    return discovery.id;
  }
}
