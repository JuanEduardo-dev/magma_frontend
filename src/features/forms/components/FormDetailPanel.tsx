"use client";

import { X, Download, BarChart3, Users, Clock, FileText } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import type { Formulario, RespuestaFormulario } from "../types";

interface FormDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formulario: Formulario | null;
}

const respuestasEjemplo: RespuestaFormulario[] = [
  { empleado: "Marco Mantilla", estado: "Enviado", fecha: "10/11/2025" },
  { empleado: "Sofía Martínez", estado: "Enviado", fecha: "09/11/2025" },
  { empleado: "Juan Pérez", estado: "Pendiente", fecha: "-" },
  { empleado: "Laura Fernández", estado: "Incompleto", fecha: "08/11/2025" },
];

export function FormDetailPanel({
  isOpen,
  onClose,
  formulario,
}: FormDetailPanelProps) {
  if (!isOpen || !formulario) return null;

  const getEstadoColor = (estado: RespuestaFormulario["estado"]) => {
    const colorMap: Record<
      RespuestaFormulario["estado"],
      "success" | "warning" | "danger"
    > = {
      Enviado: "success",
      Pendiente: "warning",
      Incompleto: "danger",
    };
    return colorMap[estado];
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
      <div className="fixed right-0 top-0 bottom-0 h-screen w-full max-w-[600px] bg-white dark:bg-zinc-950 shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Detalle del Formulario
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
          {/* Título */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              {formulario.titulo}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Creado el {formulario.fechaCreacion}
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Total de envíos
                </p>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {formulario.totalEnvios}
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Pendientes
                </p>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                8
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Tiempo promedio
                </p>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                5.2 min
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Tasa de respuesta
                </p>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                82%
              </p>
            </div>
          </div>

          {/* Respuestas por empleado */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Respuestas por empleado
              </h4>
              <Button
                variant="bordered"
                size="sm"
                startContent={<Download className="w-4 h-4" />}
              >
                Exportar
              </Button>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-2 grid grid-cols-3 gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <div>Empleado</div>
                <div>Estado</div>
                <div>Fecha</div>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {respuestasEjemplo.map((respuesta, idx) => (
                  <div
                    key={`respuesta-${respuesta.empleado}-${idx}`}
                    className="px-4 py-3 grid grid-cols-3 gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <div className="text-zinc-900 dark:text-zinc-100 text-sm">
                      {respuesta.empleado}
                    </div>
                    <div>
                      <Chip
                        color={getEstadoColor(respuesta.estado)}
                        variant="flat"
                        size="sm"
                      >
                        {respuesta.estado}
                      </Chip>
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {respuesta.fecha}
                    </div>
                  </div>
                ))}
              </div>
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
                startContent={<Download className="w-4 h-4" />}
              >
                Descargar respuestas (Excel)
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<Download className="w-4 h-4" />}
              >
                Descargar respuestas (PDF)
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start"
                startContent={<BarChart3 className="w-4 h-4" />}
              >
                Ver análisis detallado
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
