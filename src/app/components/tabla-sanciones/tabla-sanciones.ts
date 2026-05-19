import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sancion } from '../../interfaces/sancion.interface';

@Component({
  selector: 'app-tabla-sanciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-sanciones.html',
  styleUrl: './tabla-sanciones.css'
})
export class TablaSanciones {
  @Input() sanciones: Sancion[] = [];

  GetProgreso(sancion: Sancion): number[] {
    return Array(sancion.partidos_sancion).fill(0);
  }

  GetCumplidas(sancion: Sancion): number {
    return sancion.partidos_sancion - sancion.fechas_restantes;
  }
}