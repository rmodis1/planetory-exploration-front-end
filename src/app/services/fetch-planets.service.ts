import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchPlanetsService {
  private apiUrl = 'http://localhost:5125/api/planet/dropdown';
  http = inject(HttpClient);

  getPlanets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
