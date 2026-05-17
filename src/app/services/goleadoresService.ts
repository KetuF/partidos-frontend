import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goleador } from '../interfaces/goleador.interface';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class GoleadoresService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  GetGoleadoresPorCategoria(categoria_id: number): Observable<Goleador[]> {
    return this.http.get<Goleador[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }
}