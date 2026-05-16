import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Categoria } from './pages/categoria/categoria';
import { Equipos } from './pages/equipos/equipos';
import { Carga } from './pages/carga/carga';

export const routes: Routes = [
  {
    path: 'categoria/:id',
    component: Categoria
  },
  {
    path: 'equipos',
    component: Equipos
  },
  { 
    path: '', component: Carga
  },
  { 
    path: 'inicio', component: Inicio 
  },
  {
    path: '**',
    redirectTo: ''
  }
];