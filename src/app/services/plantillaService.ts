import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/plantilla.interface';
import { environment } from '../../environments/environment'

@Injectable({providedIn:'root'})
export class PlantillaService{
    private http=inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/plantilla`;

    GetPlantilla(equipo_id:number):Observable<Jugador[]>{
        return this.http.get<Jugador[]>(
            `${this.apiUrl}/${equipo_id}`
        );
    }
}