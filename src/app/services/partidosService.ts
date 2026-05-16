import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido.interface';

@Injectable({ providedIn: 'root' })
export class PartidosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/partidos';

  GetPartidosPorCategoria(categoria_id: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }

  GetPartidosPorEquipo(equipo_id: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/equipo/${equipo_id}`);
  }
}