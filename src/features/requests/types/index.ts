export interface Peticion {
  id: string;
  empleado: string;
  cargo: string;
  tipo: string;
  motivo: string;
  estado: "pendiente" | "aprobado" | "rechazado" | "proceso";
  fechaCreacion: string;
  fechaInicio: string;
  fechaFin: string;
  duracion: string;
  adjuntos: number;
  observaciones?: string;
}

export type PeticionEstado = Peticion["estado"];

export interface PeticionesMetrics {
  pendientes: number;
  aprobadas: number;
  rechazadas: number;
  enProceso: number;
}
