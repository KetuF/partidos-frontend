import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categoriasService';

@Component({
  selector: 'app-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carga.html',
  styleUrl: './carga.css'
})
export class Carga implements OnInit {
  private router = inject(Router);
  private categoriasService = inject(CategoriasService);
  private cdr = inject(ChangeDetectorRef);

  cargando: boolean = true;

  ngOnInit(): void {
    this.categoriasService.GetCategorias().subscribe({
      next: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  Entrar(): void {
    const wrapper = document.querySelector('.carga-wrapper');
    wrapper?.classList.add('fadeout');
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 600);
  }
}