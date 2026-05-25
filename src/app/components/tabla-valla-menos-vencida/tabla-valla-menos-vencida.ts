import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partido } from '../../interfaces/partido.interface';
import { Equipo } from '../../interfaces/equipo.interface';

interface VallaEquipo{
  nombre:string;
  escudo:string;
  gc:number;
}

@Component({
  selector:'app-tabla-valla-menos-vencida',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./tabla-valla-menos-vencida.html',
  styleUrl:'./tabla-valla-menos-vencida.css'
})

export class TablaVallaMenosVencida implements OnChanges{

  @Input() partidos:Partido[]=[];
  @Input() equipos:Equipo[]=[];

  vallas:VallaEquipo[]=[];

  ngOnChanges():void{
    this.Calcular();
  }

  Calcular():void{

    const mapa:any={};

    this.equipos.forEach(e=>{

      mapa[e.nombre]={

        nombre:e.nombre,
        escudo:e.escudo,
        gc:0
      };

    });

    this.partidos
    .filter(p=>p.jugado)
    .forEach(p=>{

      if(
        mapa[p.equipo_local]
      ){

        mapa[p.equipo_local].gc+=
        p.goles_visitante;

      }

      if(
        mapa[p.equipo_visitante]
      ){

        mapa[p.equipo_visitante].gc+=
        p.goles_local;

      }

    });

    this.vallas = (Object.values(mapa) as VallaEquipo[])
      .sort(
        (a, b) => a.gc - b.gc
      )
      .slice(0,3);
  }

  onImgError(event:Event){

    const img=
    event.target as HTMLImageElement;

    img.src=
    'assets/escudo-default.png';
  }

}