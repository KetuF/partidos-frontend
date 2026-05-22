import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partido } from '../../interfaces/partido.interface';
import { Equipo } from '../../interfaces/equipo.interface';

interface PosicionEquipo {
  nombre: string;
  escudo: string;
  PJ: number;
  PG: number;
  PE: number;
  PP: number;
  GF: number;
  GC: number;
  DG: number;
  PTS: number;
}

@Component({
  selector: 'app-tabla-posiciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-posiciones.html',
  styleUrl: './tabla-posiciones.css'
})
export class TablaPosiciones implements OnChanges {
  @Input() partidos: Partido[] = [];
  @Input() equipos: Equipo[] = [];

  posiciones: PosicionEquipo[] = [];

  ngOnChanges(): void {
    this.CalcularPosiciones();
  }

  CalcularPosiciones(): void {
    const mapa: { [nombre: string]: PosicionEquipo } = {};

    this.equipos.forEach(e => {
      mapa[e.nombre] = { nombre: e.nombre, escudo: e.escudo, PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GC: 0, DG: 0, PTS: 0 };
    });

    this.partidos.filter(p => p.jugado).forEach(p => {
      const local = mapa[p.equipo_local];
      const visitante = mapa[p.equipo_visitante];
      if (!local || !visitante) return;

      local.PJ++; visitante.PJ++;
      local.GF += p.goles_local; local.GC += p.goles_visitante;
      visitante.GF += p.goles_visitante; visitante.GC += p.goles_local;

      if (p.goles_local > p.goles_visitante) {
        local.PG++; local.PTS += 2;
        visitante.PP++;
      } else if (p.goles_local < p.goles_visitante) {
        visitante.PG++; visitante.PTS += 2;
        local.PP++;
      } else {
        local.PE++; local.PTS++;
        visitante.PE++; visitante.PTS++;
      }
    });

    this.posiciones = Object.values(mapa)
      .map(e => ({ ...e, DG: e.GF - e.GC }))
      .sort((a, b) => b.PTS - a.PTS || b.DG - a.DG);
  }

  onImgError(event: Event){
    const img = event.target as HTMLImageElement;
    img.src='assets/escudo-default.png';
  }
}