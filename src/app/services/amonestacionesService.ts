import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amonestacion } from '../interfaces/amonestaciones.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AmonestacionesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/amonestaciones`;

  GetAmonestaciones(categoria_id: number): Observable<Amonestacion[]> {
    return this.http.get<Amonestacion[]>(`${this.apiUrl}/amonestaciones/${categoria_id}`);
  }
}