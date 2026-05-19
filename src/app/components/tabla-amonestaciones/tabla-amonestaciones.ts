import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amonestacion } from '../../interfaces/amonestaciones.interface';

@Component({
  selector: 'app-tabla-amonestaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-amonestaciones.html',
  styleUrl: './tabla-amonestaciones.css',
})
export class TablaAmonestaciones {
  @Input() amonestaciones: Amonestacion[] = [];

  GetTarjetas(cantidad: number): number[] {
    return Array(cantidad).fill(0);
  }
}