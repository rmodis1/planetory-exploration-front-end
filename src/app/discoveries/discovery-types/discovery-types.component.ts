import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DiscoveryTypeService } from '../../services/fetch-discovery-types.service';

@Component({
  selector: 'app-discovery-types',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './discovery-types.component.html',
  styleUrls: ['./discovery-types.component.css'],
})
export class DiscoveryTypesComponent implements OnInit {
  http = inject(HttpClient);
  private discoveryTypeService = inject(DiscoveryTypeService);
  discoveryControl = new FormControl<number | null>(null);
  discoveries: any = { data: [] };
  discoveryDetails: any;

  ngOnInit() {
    this.discoveryTypeService.getDiscoveryTypes().subscribe({
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
    const selectedDiscovery = this.discoveries.data.find((discovery: any) => {
      return discovery.id == discoveryId;
    });
    this.discoveryDetails = selectedDiscovery ? selectedDiscovery : null;
  }
}
