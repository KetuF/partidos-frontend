import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categoriasService';
import { Categoria } from '../../interfaces/categoria.interface';
import { ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  @Input() categoriaActual: string = '';
  menuAbierto: boolean = false;
  categorias: Categoria[] = [];
  categoriasAbierto: boolean = false;

  private router = inject(Router);
  private categoriasService = inject(CategoriasService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.categoriasService.GetCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      }
    });
  }

  ToggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  IrACategoria(id: number): void {
    this.menuAbierto = false;
    this.router.navigate(['/categoria', id]);
  }

  IrAEquipos(): void {
    this.menuAbierto = false;
    this.router.navigate(['/equipos']);
  }

  IrAInicio(): void {
    this.menuAbierto = false;
    this.router.navigate(['/inicio']);
  }

  IrAHistoria(): void {
    this.menuAbierto = false;
    this.router.navigate(['/historia']);
  }

  ToggleCategorias(): void {
    this.categoriasAbierto = !this.categoriasAbierto;
  }
}