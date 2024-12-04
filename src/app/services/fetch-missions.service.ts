import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from '../interfaces/mission';

@Injectable({
  providedIn: 'root',
})
export class FetchMissionsService {
  private apiUrl = 'http://localhost:5125/api/mission';
  http = inject(HttpClient);

  getMissions(): Observable<{ data: Mission[] }> {
    return this.http.get<{ data: Mission[] }>(this.apiUrl);
  }
}
