"use client";

import {
  X,
  Download,
  CheckCircle,
  XCircle,
  Edit2,
  Paperclip,
  User,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@heroui/react";
import type { Peticion } from "../types";

interface PeticionDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  peticion: Peticion | null;
}

export function PeticionDetailPanel({
  isOpen,
  onClose,
  peticion,
}: PeticionDetailPanelProps) {
  if (!isOpen || !peticion) return null;

  const getEstadoColor = (estado: string) => {
    const colors = {
      pendiente: "text-yellow-600",
      aprobado: "text-green-600",
      rechazado: "text-red-600",
      proceso: "text-blue-600",
    };
    return colors[estado as keyof typeof colors] || "text-zinc-900";
  };

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black/30 z-40 transition-opacity cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Cerrar panel"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[500px] bg-white shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">
            Detalle de Petición
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
          {/* Empleado */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-zinc-900 font-medium">{peticion.empleado}</p>
                <p className="text-zinc-500 text-sm">{peticion.cargo}</p>
              </div>
            </div>
          </div>

          {/* Información principal */}
          <div className="bg-zinc-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 text-xs">Tipo de petición</p>
                <p className="text-zinc-900 font-medium capitalize">
                  {peticion.tipo}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 text-xs">Periodo</p>
                <p className="text-zinc-900 font-medium">
                  {peticion.fechaInicio} - {peticion.fechaFin}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 text-xs">Duración</p>
                <p className="text-zinc-900 font-medium">{peticion.duracion}</p>
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <p className="text-zinc-500 text-xs font-medium">Motivo</p>
            <p className="text-zinc-900">{peticion.motivo}</p>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <p className="text-zinc-500 text-xs font-medium">Estado actual</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  peticion.estado === "aprobado"
                    ? "bg-green-600"
                    : peticion.estado === "rechazado"
                      ? "bg-red-600"
                      : peticion.estado === "proceso"
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                }`}
              />
              <span
                className={`capitalize font-medium ${getEstadoColor(peticion.estado)}`}
              >
                {peticion.estado === "proceso" ? "En proceso" : peticion.estado}
              </span>
            </div>
          </div>

          {/* Workflow de aprobación */}
          <div className="space-y-3">
            <p className="text-zinc-500 text-xs font-medium">
              Workflow de aprobación
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-zinc-900 text-sm">Solicitud creada</p>
                  <p className="text-zinc-500 text-xs">
                    {peticion.fechaCreacion}
                  </p>
                </div>
              </div>
              {peticion.estado !== "pendiente" && (
                <div className="flex items-center gap-3">
                  {peticion.estado === "rechazado" ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="text-zinc-900 text-sm">
                      {peticion.estado === "rechazado"
                        ? "Rechazada"
                        : "Aprobada por supervisor"}
                    </p>
                    <p className="text-zinc-500 text-xs">
                      {new Date().toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentos adjuntos */}
          {peticion.adjuntos > 0 && (
            <div className="space-y-3">
              <p className="text-zinc-500 text-xs font-medium">
                Documentos adjuntos
              </p>
              <div className="space-y-2">
                {Array.from({ length: peticion.adjuntos }, (_, idx) => (
                  <div
                    key={`${peticion.id}-adjunto-${idx + 1}`}
                    className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Paperclip className="w-4 h-4 text-zinc-500" />
                      <p className="text-zinc-900 text-sm">
                        Documento_{idx + 1}.pdf
                      </p>
                    </div>
                    <Button isIconOnly size="sm" variant="light">
                      <Download className="w-4 h-4 text-blue-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observaciones */}
          {peticion.observaciones && (
            <div className="space-y-2">
              <p className="text-zinc-500 text-xs font-medium">Observaciones</p>
              <div className="p-4 bg-zinc-50 rounded-lg">
                <p className="text-zinc-900 text-sm">
                  {peticion.observaciones}
                </p>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <p className="text-zinc-500 text-xs font-medium">Acciones</p>
            <div className="flex flex-col gap-2">
              {peticion.estado === "pendiente" && (
                <>
                  <Button
                    color="success"
                    className="w-full"
                    startContent={<CheckCircle className="w-4 h-4" />}
                  >
                    Aprobar petición
                  </Button>
                  <Button
                    color="danger"
                    variant="bordered"
                    className="w-full"
                    startContent={<XCircle className="w-4 h-4" />}
                  >
                    Rechazar petición
                  </Button>
                </>
              )}
              <Button
                variant="bordered"
                className="w-full"
                startContent={<Edit2 className="w-4 h-4" />}
              >
                Editar petición
              </Button>
              {peticion.adjuntos > 0 && (
                <Button
                  variant="bordered"
                  className="w-full"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Descargar todos los adjuntos
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
