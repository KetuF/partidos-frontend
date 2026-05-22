export interface Sancion {
  id: number;
  nombre_jugador: string;
  equipo: string;
  tipo: string;
  partidos_sancion: number;
  numero_fecha_inicio: number;
  fechas_restantes: number;

  escudo:string;
}