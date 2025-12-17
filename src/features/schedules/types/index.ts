export type ScheduleType = "fijo" | "rotativo" | "flexible" | "turnos";
export type ScheduleStatus = "activo" | "suspendido" | "inactivo";

export interface Schedule {
  id: string;
  nombreEmpleado: string;
  tipo: ScheduleType;
  horaEntrada: string;
  horaSalida: string;
  diasLaborales: string;
  vigenciaDesde: string;
  vigenciaHasta: string;
  estado: ScheduleStatus;
  departamento: string;
  refrigerio?: string;
  empleadosAsignados?: number;
}

export interface EmpleadoAsignado {
  nombre: string;
  cargo: string;
}

export interface HistorialModificacion {
  accion: string;
  usuario: string;
  fecha: string;
}
