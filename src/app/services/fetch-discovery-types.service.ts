import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoveryType } from '../interfaces/discoveryType';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryTypeService {
  private apiUrl = 'http://localhost:5125/api/discovery/types';
  private http = inject(HttpClient);

  getDiscoveryTypes(): Observable<{ data: DiscoveryType[] }> {
    return this.http.get<{ data: DiscoveryType[] }>(this.apiUrl);
  }

  getDiscoveryTypeById(id: string): Observable<DiscoveryType> {
    return this.http.get<DiscoveryType>(`${this.apiUrl}/${id}`);
  }
}