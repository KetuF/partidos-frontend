import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partido } from '../../interfaces/partido.interface';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixture.html',
  styleUrl: './fixture.css'
})
export class Fixture implements OnChanges {
  @Input() partidos: Partido[] = [];
  @Input() mostrarFiltroFechas: boolean = true;
  proximoPartidoId: number = -1;
  fechaSeleccionada: number = 0;
  fechasDisponibles: number[] = [];
  partidosFiltrados: Partido[] = [];

  ngOnChanges(): void {
    const proximo = this.partidos.find(p => !p.jugado);
    this.proximoPartidoId = proximo ? proximo.id : -1;

    this.fechasDisponibles = [...new Set(this.partidos.map(p => p.numero_fecha))].sort();
    
    if (proximo) {
      this.fechaSeleccionada = proximo.numero_fecha;
    } else {
      this.fechaSeleccionada = this.fechasDisponibles[this.fechasDisponibles.length - 1] || 0;
    }

    this.FiltrarPorFecha();
  }

  FiltrarPorFecha(event?: any): void {
    if (event) {
      this.fechaSeleccionada = +event.target.value;
    }
    this.partidosFiltrados = this.partidos.filter(p => p.numero_fecha === this.fechaSeleccionada);
  }
}