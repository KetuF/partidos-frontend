export interface Partido {
  id: number;
  fecha: string;
  hora: string;
  jugado: number;
  numero_fecha: number;

  goles_local: number;
  goles_visitante: number;

  equipo_local: string;
  equipo_visitante: string;

  escudo_local:string;
  escudo_visitante:string;
}