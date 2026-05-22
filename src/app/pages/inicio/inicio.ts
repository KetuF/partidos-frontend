import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categoriasService';
import { Categoria } from '../../interfaces/categoria.interface';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  private categoriasService = inject(CategoriasService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categoriasService.GetCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          new Splide('.splide', {
            type: 'slide',
            drag: 'free',
            perPage: 2,
            gap: '16px',
            autoplay: false,
            padding: '2rem',
            breakpoints: {
              600: {
                type: 'slide',
                drag: 'free',
                perPage: 2,
                gap: '12px',
                padding: '1rem',
                rewind: true,
                rewindSpeed: 10,
                arrows: false, 
              },
              448: {
                type: 'slide',
                drag: 'free',
                perPage: 2,
                gap: '50px',
                padding: '1rem',
                rewind: true,
                rewindSpeed: 10,
                arrows: false, 
              },
              900: {
                type: 'slide',
                drag: 'free',
                perPage: 3,
                gap: '14px',
              }
            }
          }).mount();
        }, 200);
      },
      error: (err) => console.error('Error', err)
    });
  }

  IrACategoria(id: number): void {
    window.scrollTo(0, 0);
    this.router.navigate(['/categoria', id]);
  }
  GetFondoCategoria(nombre:string):string{
    switch(nombre){
      case 'Veteranos +45':
        return 'assets/FondoCard.png';
      case 'Liga 2':
        return 'assets/FondoCard2.png';
      case 'Liga 3':
        return 'assets/FondoCard3.png';
      case 'Liga 4':
        return 'assets/FondoCard4.png';
      default:
        return 'assets/FondoCard.png';
    }

  }
}