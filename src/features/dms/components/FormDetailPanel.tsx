"use client";

import {
  X,
  Edit2,
  Eye,
  BarChart3,
  Calendar,
  User,
  FileText,
  Download,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";
import type { DynamicForm, FormStatus } from "../types";

interface FormDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  form: DynamicForm | null;
  onEdit: () => void;
  onPreview: () => void;
  onViewResponses: () => void;
}

const statusColorMap: Record<FormStatus, "success" | "warning" | "default"> = {
  published: "success",
  draft: "warning",
  archived: "default",
};

const statusLabelMap: Record<FormStatus, string> = {
  published: "Publicado",
  draft: "Borrador",
  archived: "Archivado",
};

export function FormDetailPanel({
  isOpen,
  onClose,
  form,
  onEdit,
  onPreview,
  onViewResponses,
}: FormDetailPanelProps) {
  if (!isOpen || !form) return null;

  const schema = JSON.parse(form.schema);
  const totalQuestions =
    schema.pages?.reduce(
      (acc: number, page: { elements?: unknown[] }) =>
        acc + (page.elements?.length || 0),
      0,
    ) || 0;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-label="Cerrar panel"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-zinc-950 shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Detalles del formulario
          </h2>
          <Button isIconOnly variant="light" onPress={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Título y descripción */}
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {form.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  {form.description}
                </p>
                <div className="mt-2">
                  <Chip
                    color={statusColorMap[form.status]}
                    variant="flat"
                    size="sm"
                  >
                    {statusLabelMap[form.status]}
                  </Chip>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Respuestas</span>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {form.responsesCount}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Preguntas</span>
              </div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {totalQuestions}
              </p>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-4">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
              Información
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Creado por
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {form.createdBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Fecha de creación
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {form.createdAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Última actualización
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {form.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estructura del formulario */}
          <div className="space-y-4">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
              Estructura
            </h4>
            <div className="space-y-2">
              {schema.pages?.map(
                (
                  page: { name: string; title?: string; elements?: unknown[] },
                  index: number,
                ) => (
                  <div
                    key={page.name}
                    className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3"
                  >
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Página {index + 1}: {page.title || page.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {page.elements?.length || 0} campos
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              className="w-full"
              color="primary"
              startContent={<Eye className="w-4 h-4" />}
              onPress={onPreview}
            >
              Vista previa
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="bordered"
                startContent={<Edit2 className="w-4 h-4" />}
                onPress={onEdit}
              >
                Editar
              </Button>
              <Button
                variant="bordered"
                startContent={<BarChart3 className="w-4 h-4" />}
                onPress={onViewResponses}
              >
                Respuestas
              </Button>
            </div>
            <Button
              variant="flat"
              className="w-full"
              startContent={<Download className="w-4 h-4" />}
            >
              Exportar respuestas
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
