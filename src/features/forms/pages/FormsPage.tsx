"use client";

import { useState } from "react";
import {
  Plus,
  Download,
  Eye,
  Edit2,
  Copy,
  Trash2,
  ChevronDown,
  Search,
  BarChart3,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { FormDetailPanel } from "../components/FormDetailPanel";
import { NewFormModal } from "../components/NewFormModal";
import { initialFormularios } from "../data/mockData";
import type { Formulario, FormStatus } from "../types";

const estadoColorMap: Record<FormStatus, "success" | "primary" | "default"> = {
  activo: "success",
  "en-curso": "primary",
  finalizado: "default",
};

const estadoLabelMap: Record<FormStatus, string> = {
  activo: "Activo",
  "en-curso": "En curso",
  finalizado: "Finalizado",
};

export function FormsPage() {
  const [formularios, setFormularios] =
    useState<Formulario[]>(initialFormularios);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewFormModalOpen, setIsNewFormModalOpen] = useState(false);
  const [selectedFormulario, setSelectedFormulario] =
    useState<Formulario | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  const handleViewDetail = (formulario: Formulario) => {
    setSelectedFormulario(formulario);
    setIsDetailPanelOpen(true);
  };

  const handleDuplicate = (id: string) => {
    const original = formularios.find((f) => f.id === id);
    if (original) {
      const duplicated: Formulario = {
        ...original,
        id: Date.now().toString(),
        titulo: `${original.titulo} (Copia)`,
        totalEnvios: 0,
        fechaCreacion: new Date().toLocaleDateString("es-ES"),
      };
      setFormularios([duplicated, ...formularios]);
    }
  };

  const handleDelete = (id: string) => {
    setFormularios(formularios.filter((f) => f.id !== id));
  };

  const handleSaveForm = (data: Record<string, unknown>) => {
    console.log("Nuevo formulario:", data);
    // Aquí se implementaría la lógica para guardar
  };

  const filteredFormularios = formularios.filter((f) =>
    f.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderCell = (formulario: Formulario, columnKey: React.Key) => {
    switch (columnKey) {
      case "titulo":
        return (
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {formulario.titulo}
            </p>
            {formulario.descripcion && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-[300px]">
                {formulario.descripcion}
              </p>
            )}
          </div>
        );
      case "totalEnvios":
        return (
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-zinc-900 dark:text-zinc-100">
              {formulario.totalEnvios}
            </span>
          </div>
        );
      case "fechaCreacion":
        return (
          <span className="text-zinc-600 dark:text-zinc-400">
            {formulario.fechaCreacion}
          </span>
        );
      case "estado":
        return (
          <Chip
            color={estadoColorMap[formulario.estado]}
            variant="flat"
            size="sm"
          >
            {estadoLabelMap[formulario.estado]}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetail(formulario)}
              aria-label="Ver detalle"
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Editar">
              <Edit2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDuplicate(formulario.id)}
              aria-label="Duplicar"
            >
              <Copy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDelete(formulario.id)}
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Búsqueda y acciones */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-[400px]">
          <Input
            placeholder="Buscar por título del formulario..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            startContent={
              <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="bordered"
            startContent={<Download className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          >
            Exportar
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => setIsNewFormModalOpen(true)}
            className="flex-1 sm:flex-none"
          >
            Nuevo formulario
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <Card
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
        shadow="none"
      >
        <CardBody className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Lista de Formularios
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {filteredFormularios.length} formularios encontrados
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table aria-label="Tabla de formularios" removeWrapper>
              <TableHeader>
                <TableColumn key="titulo">TÍTULO</TableColumn>
                <TableColumn key="totalEnvios" align="center">
                  TOTAL DE ENVÍOS
                </TableColumn>
                <TableColumn key="fechaCreacion">FECHA DE CREACIÓN</TableColumn>
                <TableColumn key="estado">ESTADO</TableColumn>
                <TableColumn key="acciones" align="end">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody items={filteredFormularios}>
                {(formulario) => (
                  <TableRow
                    key={formulario.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    {(columnKey) => (
                      <TableCell>{renderCell(formulario, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Panel de detalles */}
      <FormDetailPanel
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        formulario={selectedFormulario}
      />

      {/* Modal nuevo formulario */}
      <NewFormModal
        isOpen={isNewFormModalOpen}
        onClose={() => setIsNewFormModalOpen(false)}
        onSave={handleSaveForm}
      />
    </div>
  );
}
