import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goleador } from '../../interfaces/goleador.interface';

@Component({
  selector: 'app-tabla-goleadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-goleadores.html',
  styleUrl: './tabla-goleadores.css'
})
export class TablaGoleadores {
  @Input() goleadores: Goleador[] = [];

  onImgError(event: Event){
    const img = event.target as HTMLImageElement;
    img.src='assets/escudos/escudo-default.png';
  }
}