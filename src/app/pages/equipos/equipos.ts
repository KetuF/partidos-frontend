import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposService } from '../../services/equiposService';
import { PartidosService } from '../../services/partidosService';
import { Equipo } from '../../interfaces/equipo.interface';
import { Partido } from '../../interfaces/partido.interface';
import { Navbar } from '../../components/navbar/navbar';
import { Fixture } from '../../components/fixture/fixture';
import { Footer } from '../../components/footer/footer';
import { AmonestacionesService } from '../../services/amonestacionesService';
import { Amonestacion } from '../../interfaces/amonestaciones.interface';
import { PlantillaService } from '../../services/plantillaService';
import { Jugador } from '../../interfaces/plantilla.interface';

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
  private amonestacionesService = inject(AmonestacionesService);
  private plantillaService=inject(PlantillaService);

  equipos: Equipo[] = [];
  equipoSeleccionado: Equipo | null = null;
  partidosEquipo: Partido[] = [];
  amonestaciones: Amonestacion[] = [];
  tabActiva:'fixture'|'amonestados'|'plantilla'='fixture';
  categoriaActualIndex=0;
  plantilla:Jugador[]=[];

  ngOnInit():void{
    this.equiposService.GetEquipos().subscribe({

      next:(data)=>{
        this.equipos=data.sort(
          (a,b)=>
          a.nombre.localeCompare(b.nombre)
        );
        this.cdr.detectChanges();
      },
      error:(err)=>
      console.error(
        'Error al obtener equipos',
        err
      )
    });
  }


  SeleccionarEquipo(equipo:Equipo):void{

    if(this.equipoSeleccionado?.id===equipo.id){
      this.equipoSeleccionado=null;
      this.partidosEquipo=[];
      return;
    }

    this.equipoSeleccionado=equipo;
    this.tabActiva='fixture';

    this.partidosService
    .GetPartidosPorEquipo(equipo.id)
    .subscribe({
      next:(data)=>{
        this.partidosEquipo=data;
        this.cdr.detectChanges();
      }
    });

    this.amonestacionesService
    .GetAmonestaciones(equipo.id)
    .subscribe({
      next:(data)=>{
        this.amonestaciones=data;
        this.cdr.detectChanges();
      }
    });

    this.plantillaService
      .GetPlantilla(equipo.id).subscribe({
        next:(data)=>{
            this.plantilla=data;
            this.cdr.detectChanges();
        },
        error:(err)=>console.log(err)
    });
    
  }

  GetCategorias():string[]{
    return [
      ...new Set(
        this.equipos.map(
          e=>e.categoria
        )
      )
    ];
  }

  CategoriaActual():string{
    const categorias=
    this.GetCategorias();

    if(categorias.length===0){
      return '';
    }
    return categorias[
      this.categoriaActualIndex
    ];
  }

  CategoriaSiguiente(){
    const categorias=
    this.GetCategorias();

    if(this.categoriaActualIndex < categorias.length-1){
      this.categoriaActualIndex++;
    }else{
      this.categoriaActualIndex=0;
    }
    this.CerrarEquipo();
  }

  CategoriaAnterior(){
    const categorias=
    this.GetCategorias();
    if(
      this.categoriaActualIndex>0
    ){
      this.categoriaActualIndex--;
    }

    else{
      this.categoriaActualIndex=
      categorias.length-1;
    }
    this.CerrarEquipo();
  }

  GetEquiposPorCategoria(categoria:string):Equipo[]{
    return this.equipos.filter(
      e=>e.categoria===categoria
    );
  }

  CambiarTab(tab:'fixture'|'amonestados'|'plantilla'){
    this.tabActiva=tab;
  }

  GetTarjetas(cantidad:number){
    return Array(cantidad);
  }

  CerrarEquipo(){
    this.equipoSeleccionado=null;
    this.partidosEquipo=[];
    this.amonestaciones=[];
  }

  onImgError(event: Event){
    const img = event.target as HTMLImageElement;
    img.src='assets/escudo-default.png';
  }
}