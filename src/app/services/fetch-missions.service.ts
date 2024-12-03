import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchMissionsService {
  private apiUrl = 'http://localhost:5125/api/mission';
  http = inject(HttpClient);

  getMissions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
