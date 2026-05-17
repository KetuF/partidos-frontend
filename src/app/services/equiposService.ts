import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';
import { environment } from '../../environmet/enviroment';

@Injectable({ providedIn: 'root' })
export class EquiposService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  GetEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  GetEquiposPorCategoria(categoria_id: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }
}