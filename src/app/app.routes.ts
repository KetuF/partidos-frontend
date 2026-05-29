import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Categoria } from './pages/categoria/categoria';
import { Equipos } from './pages/equipos/equipos';
import { Historia } from './pages/historia/historia';

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
    path: 'inicio', component: Inicio 
  },
  { 
    path: 'historia', component: Historia 
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];