export interface Partido {
  id: number;
  fecha: string;
  hora: string;
  jugado: number;
  goles_local: number;
  goles_visitante: number;
  equipo_local: string;
  equipo_visitante: string;
}