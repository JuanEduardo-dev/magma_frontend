"use client";

import {
  X,
  Edit2,
  Copy,
  Trash2,
  Clock,
  Calendar,
  Users,
  AlertCircle,
  History,
  Download,
} from "lucide-react";
import { Button } from "@heroui/react";
import type {
  Schedule,
  EmpleadoAsignado,
  HistorialModificacion,
} from "../types";

interface ScheduleDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
}

const empleadosAsignados: EmpleadoAsignado[] = [
  { nombre: "Marco Mantilla", cargo: "Desarrollador Senior" },
  { nombre: "Juan Pérez", cargo: "Desarrollador Backend" },
  { nombre: "Ana García", cargo: "Desarrolladora Frontend" },
];

const historialModificaciones: HistorialModificacion[] = [
  {
    accion: "Horario creado",
    usuario: "Admin Sistema",
    fecha: "01/01/2025 10:30",
  },
  {
    accion: "Empleados asignados",
    usuario: "María López",
    fecha: "05/01/2025 14:20",
  },
  {
    accion: "Hora de salida modificada",
    usuario: "Carlos Ruiz",
    fecha: "15/01/2025 09:15",
  },
];

export function ScheduleDetailPanel({
  isOpen,
  onClose,
  schedule,
}: ScheduleDetailPanelProps) {
  if (!isOpen || !schedule) return null;

  const getEstadoColor = (estado: string) => {
    if (estado === "activo") return "bg-green-600";
    if (estado === "suspendido") return "bg-yellow-600";
    return "bg-zinc-400";
  };

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 h-screen w-screen bg-black/30 dark:bg-black/60 z-40 transition-opacity cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Cerrar panel"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 h-screen w-full max-w-[550px] bg-white dark:bg-zinc-950 shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Detalle del Horario
          </h3>
          <Button
            isIconOnly
            variant="light"
            onPress={onClose}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              {schedule.nombreEmpleado}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {schedule.departamento}
            </p>
          </div>

          {/* Información principal */}
          <div className="space-y-3">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              Información del Horario
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Tipo de horario
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 text-sm capitalize">
                  {schedule.tipo}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Hora de entrada
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {schedule.horaEntrada}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Hora de salida
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {schedule.horaSalida}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Días laborales
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                  {schedule.diasLaborales}
                </p>
              </div>
              {schedule.refrigerio && (
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Tiempo de refrigerio
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {schedule.refrigerio}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Vigencia */}
          <div className="space-y-3">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              Vigencia
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Desde
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {schedule.vigenciaDesde}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Hasta
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {schedule.vigenciaHasta}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Estado
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getEstadoColor(schedule.estado)}`}
                  />
                  <span className="text-zinc-900 dark:text-zinc-100 text-sm capitalize">
                    {schedule.estado}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reglas especiales */}
          <div className="space-y-3">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              Reglas Especiales
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Tolerancia de ingreso
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                  10 minutos
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Horas extra permitidas
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 text-sm">Sí</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Máximo refrigerio
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                  60 minutos
                </p>
              </div>
            </div>
          </div>

          {/* Empleados asignados */}
          {schedule.empleadosAsignados && (
            <div className="space-y-3">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                Empleados Asignados ({schedule.empleadosAsignados})
              </h4>
              <div className="space-y-2">
                {empleadosAsignados.map((emp, idx) => (
                  <div
                    key={`emp-${emp.nombre}-${idx}`}
                    className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                        {emp.nombre}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                        {emp.cargo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="bordered"
                size="sm"
                className="w-full"
                startContent={<Users className="w-4 h-4" />}
              >
                Ver todos los empleados
              </Button>
            </div>
          )}

          {/* Historial de modificaciones */}
          <div className="space-y-3">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              Historial de Modificaciones
            </h4>
            <div className="space-y-2">
              {historialModificaciones.map((mod, idx) => (
                <div
                  key={`mod-${mod.accion}-${idx}`}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    {mod.accion}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    {mod.usuario} · {mod.fecha}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              Acciones
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<Edit2 className="w-4 h-4" />}
              >
                Editar horario
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<Copy className="w-4 h-4" />}
              >
                Duplicar horario
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<Users className="w-4 h-4" />}
              >
                Reasignar empleados
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<Download className="w-4 h-4" />}
              >
                Exportar información
              </Button>
              {schedule.estado === "activo" && (
                <Button
                  variant="bordered"
                  color="warning"
                  className="w-full justify-start"
                  startContent={<AlertCircle className="w-4 h-4" />}
                >
                  Suspender horario
                </Button>
              )}
              <Button
                variant="bordered"
                color="danger"
                className="w-full justify-start"
                startContent={<Trash2 className="w-4 h-4" />}
              >
                Eliminar horario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
