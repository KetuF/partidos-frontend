import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sancion } from '../interfaces/sancion.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SancionesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/sanciones`;

  GetSanciones(categoria_id: number): Observable<Sancion[]> {
    return this.http.get<Sancion[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }
}