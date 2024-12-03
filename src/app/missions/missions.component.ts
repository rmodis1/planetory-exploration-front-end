import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent implements OnInit {
  http = inject(HttpClient);
  missions: any;


  ngOnInit() {
    this.http.get('http://localhost:5125/api/mission').subscribe({
      next: (response) => (this.missions = response),
      error: (error) => console.error(error.message),
      complete: () => console.log('Request has completed'),
    });
  }
}
