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
import type { Request, RequestStatus } from "../types";

interface RequestDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  request: Request | null;
}

const statusLabelMap: Record<RequestStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  in_progress: "En proceso",
};

export function RequestDetailPanel({
  isOpen,
  onClose,
  request,
}: RequestDetailPanelProps) {
  if (!isOpen || !request) return null;

  const getStatusColor = (status: RequestStatus) => {
    const colors: Record<RequestStatus, string> = {
      pending: "text-yellow-600 dark:text-yellow-400",
      approved: "text-green-600 dark:text-green-400",
      rejected: "text-red-600 dark:text-red-400",
      in_progress: "text-blue-600 dark:text-blue-400",
    };
    return colors[status] || "text-zinc-900 dark:text-zinc-100";
  };

  const getStatusDotColor = (status: RequestStatus) => {
    const colors: Record<RequestStatus, string> = {
      pending: "bg-yellow-600",
      approved: "bg-green-600",
      rejected: "bg-red-600",
      in_progress: "bg-blue-600",
    };
    return colors[status] || "bg-zinc-400";
  };

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 h-screen w-screen bg-black/30 dark:bg-black/60 z-40 transition-opacity cursor-default"
        onClick={onClose}
        aria-label="Cerrar panel"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 h-screen w-full max-w-[500px] bg-white dark:bg-zinc-950 shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
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
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {request.employee}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {request.position}
                </p>
              </div>
            </div>
          </div>

          {/* Información principal */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Tipo de petición
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium capitalize">
                  {request.type}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Periodo
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {request.startDate} - {request.endDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Duración
                </p>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {request.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              Motivo
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">{request.reason}</p>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              Estado actual
            </p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getStatusDotColor(request.status)}`}
              />
              <span
                className={`capitalize font-medium ${getStatusColor(request.status)}`}
              >
                {statusLabelMap[request.status]}
              </span>
            </div>
          </div>

          {/* Workflow de aprobación */}
          <div className="space-y-3">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              Workflow de aprobación
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                    Solicitud creada
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    {request.createdAt}
                  </p>
                </div>
              </div>
              {request.status !== "pending" && (
                <div className="flex items-center gap-3">
                  {request.status === "rejected" ? (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  <div>
                    <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                      {request.status === "rejected"
                        ? "Rechazada"
                        : "Aprobada por supervisor"}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                      {new Date().toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentos adjuntos */}
          {request.attachments > 0 && (
            <div className="space-y-3">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
                Documentos adjuntos
              </p>
              <div className="space-y-2">
                {Array.from({ length: request.attachments }, (_, idx) => (
                  <div
                    key={`${request.id}-attachment-${idx + 1}`}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Paperclip className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                        Documento_{idx + 1}.pdf
                      </p>
                    </div>
                    <Button isIconOnly size="sm" variant="light">
                      <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observaciones */}
          {request.notes && (
            <div className="space-y-2">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
                Observaciones
              </p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <p className="text-zinc-900 dark:text-zinc-100 text-sm">
                  {request.notes}
                </p>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              Acciones
            </p>
            <div className="flex flex-col gap-2">
              {request.status === "pending" && (
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
              {request.attachments > 0 && (
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
