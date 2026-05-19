import { Component, inject, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposService } from '../../services/equiposService';
import { PartidosService } from '../../services/partidosService';
import { Equipo } from '../../interfaces/equipo.interface';
import { Partido } from '../../interfaces/partido.interface';
import { Navbar } from '../../components/navbar/navbar';
import { Fixture } from '../../components/fixture/fixture';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, Navbar, Fixture, Footer],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css'
})
export class Equipos implements OnInit {
  private equiposService = inject(EquiposService);
  private partidosService = inject(PartidosService);
  private cdr = inject(ChangeDetectorRef);

  equipos: Equipo[] = [];
  equipoSeleccionado: Equipo | null = null;
  partidosEquipo: Partido[] = [];

  ngOnInit(): void {
    this.equiposService.GetEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener equipos', err)
    });
  }

  SeleccionarEquipo(equipo: Equipo): void {
    if (this.equipoSeleccionado?.id === equipo.id) {
      this.equipoSeleccionado = null;
      this.partidosEquipo = [];
      return;
    }
    this.equipoSeleccionado = equipo;
    this.partidosService.GetPartidosPorEquipo(equipo.id).subscribe({
      next: (data) => {
        this.partidosEquipo = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener partidos', err)
    });
  }

  GetCategorias(): string[] {
    return [...new Set(this.equipos.map(e => e.categoria))];
  }

  GetEquiposPorCategoria(categoria: string): Equipo[] {
    return this.equipos.filter(e => e.categoria === categoria);
  }
}