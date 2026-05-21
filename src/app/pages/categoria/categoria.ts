import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categoriasService';
import { PartidosService } from '../../services/partidosService';
import { GoleadoresService } from '../../services/goleadoresService';
import { EquiposService } from '../../services/equiposService';
import { Categoria as CategoriaInterface } from '../../interfaces/categoria.interface';
import { Partido } from '../../interfaces/partido.interface';
import { Goleador } from '../../interfaces/goleador.interface';
import { Equipo } from '../../interfaces/equipo.interface';
import { Navbar } from '../../components/navbar/navbar';
import { TablaPosiciones } from '../../components/tabla-posiciones/tabla-posiciones';
import { Fixture } from '../../components/fixture/fixture';
import { TablaGoleadores } from '../../components/tabla-goleadores/tabla-goleadores';
import { Footer } from '../../components/footer/footer';
import { Sancion } from '../../interfaces/sancion.interface';
import { TablaSanciones } from '../../components/tabla-sanciones/tabla-sanciones';
import { SancionesService } from '../../services/sancionesService';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, Navbar, TablaPosiciones, Fixture, TablaGoleadores, Footer, TablaSanciones],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria implements OnInit {
  private route = inject(ActivatedRoute);
  private categoriasService = inject(CategoriasService);
  private partidosService = inject(PartidosService);
  private goleadoresService = inject(GoleadoresService);
  private equiposService = inject(EquiposService);
  private cdr = inject(ChangeDetectorRef);
  private sancionesService = inject(SancionesService);

  categoria: CategoriaInterface | null = null;
  partidos: Partido[] = [];
  goleadores: Goleador[] = [];
  equipos: Equipo[] = [];
  categoriaId: number = 0;
  sanciones: Sancion[] = [];
  activeSection = 'posiciones';


  ngAfterViewInit() {
    setTimeout(() => {
      const sections =
        document.querySelectorAll('section');

      const onScroll = () => {
        let current = '';
        sections.forEach((section: any) => {
          const rect =
            section.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = section.id;
          }
        });

        if (current && current !== this.activeSection) {
          this.activeSection =
            current;
          this.cdr.detectChanges();
        }
      };

      window.addEventListener('scroll', onScroll);
      onScroll();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaId = +params['id'];
      this.CargarDatos();
    });
  }

  CargarDatos(): void {
    this.categoriasService.GetCategorias().subscribe({
      next: (data) => {
        this.categoria = data.find(c => c.id === this.categoriaId) || null;
        this.cdr.detectChanges();
      }
    });

    this.equiposService.GetEquiposPorCategoria(this.categoriaId).subscribe({
      next: (data) => {
        this.equipos = data;
        this.cdr.detectChanges();
      }
    });

    this.partidosService.GetPartidosPorCategoria(this.categoriaId).subscribe({
      next: (data) => {
        this.partidos = data;
        this.cdr.detectChanges();
      }
    });

    this.goleadoresService.GetGoleadoresPorCategoria(this.categoriaId).subscribe({
      next: (data) => {
        this.goleadores = data;
        this.cdr.detectChanges();
      }
    });

    this.sancionesService.GetSanciones(this.categoriaId).subscribe({
      next: (data) => {
        this.sanciones = data;
        this.cdr.detectChanges();
      }
    });
  }

  scrollTo(id: string) {

    this.activeSection = id;
    this.cdr.detectChanges();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }
  }
}