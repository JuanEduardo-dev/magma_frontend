export type FormStatus = "activo" | "en-curso" | "finalizado";

export interface Formulario {
  id: string;
  titulo: string;
  descripcion?: string;
  totalEnvios: number;
  fechaCreacion: string;
  estado: FormStatus;
}

export interface Campo {
  id: string;
  tipo: string;
  etiqueta: string;
  obligatorio: boolean;
  rolVisibilidad: string;
}

export interface RespuestaFormulario {
  empleado: string;
  estado: "Enviado" | "Pendiente" | "Incompleto";
  fecha: string;
}
