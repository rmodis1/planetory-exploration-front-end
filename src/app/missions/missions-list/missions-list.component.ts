import { Component, inject, OnInit } from '@angular/core';
import { FetchMissionsService } from '../../services/fetch-missions.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missions-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.css',
})
export class MissionsListComponent implements OnInit {
  fetchMissionsService = inject(FetchMissionsService);
  missions: any = { data: [] };

  ngOnInit(): void {
    this.fetchMissions();
    console.log('First check for missions:', this.missions);
  }

  fetchMissions(): void {
    this.fetchMissionsService.getMissions().subscribe({
      next: (response) => {
        this.missions = response;
        console.log('Missions:', this.missions);
        this.missions.data.forEach((mission: any) => {
          console.log('Distinct Mission:', mission.name);
        });
      },
      error: (error) => {
        console.error('Error fetching missions', error);
      }
    });
  }
}
