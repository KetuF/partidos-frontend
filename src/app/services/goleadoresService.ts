import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goleador } from '../interfaces/goleador.interface';

@Injectable({ providedIn: 'root' })
export class GoleadoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/goleadores';

  GetGoleadoresPorCategoria(categoria_id: number): Observable<Goleador[]> {
    return this.http.get<Goleador[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }
}