import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partido } from '../../interfaces/partido.interface';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture.html',
  styleUrl: './fixture.css'
})
export class Fixture implements OnChanges {
  @Input() partidos: Partido[] = [];
  proximoPartidoId: number = -1;

  ngOnChanges(): void {
    const proximo = this.partidos.find(p => !p.jugado);
    this.proximoPartidoId = proximo ? proximo.id : -1;
  }
}