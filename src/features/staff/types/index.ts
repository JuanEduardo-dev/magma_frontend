export type EstadoLaboral = "activo" | "suspendido" | "cesado";

export interface Empleado {
  id: string;
  foto?: string;
  nombreCompleto: string;
  cargo: string;
  departamento: string;
  email: string;
  telefono: string;
  estadoLaboral: EstadoLaboral;
  dni: string;
  fechaIngreso: string;
}
