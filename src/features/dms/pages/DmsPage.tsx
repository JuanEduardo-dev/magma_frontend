"use client";

import { useState } from "react";
import {
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  Search,
  Copy,
  FileText,
  BarChart3,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import type { DynamicForm, FormStatus } from "../types";
import { initialForms, initialResponses } from "../data/mockData";
import { FormDetailPanel } from "../components/FormDetailPanel";
import { FormCreatorModal } from "../components/FormCreatorModal";
import { FormPreviewModal } from "../components/FormPreviewModal";
import { FormResponsesModal } from "../components/FormResponsesModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

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

export function DmsPage() {
  const [forms, setForms] = useState<DynamicForm[]>(initialForms);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedForm, setSelectedForm] = useState<DynamicForm | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isResponsesModalOpen, setIsResponsesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<DynamicForm | null>(null);

  const handleViewDetail = (form: DynamicForm) => {
    setSelectedForm(form);
    setIsDetailPanelOpen(true);
  };

  const handlePreview = (form: DynamicForm) => {
    setSelectedForm(form);
    setIsPreviewModalOpen(true);
  };

  const handleViewResponses = (form: DynamicForm) => {
    setSelectedForm(form);
    setIsResponsesModalOpen(true);
  };

  const handleEdit = (form: DynamicForm) => {
    setEditingForm(form);
    setIsCreatorModalOpen(true);
  };

  const handleDelete = (form: DynamicForm) => {
    setSelectedForm(form);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedForm) {
      setForms(forms.filter((f) => f.id !== selectedForm.id));
      setIsDeleteModalOpen(false);
      setSelectedForm(null);
    }
  };

  const handleDuplicate = (form: DynamicForm) => {
    const duplicated: DynamicForm = {
      ...form,
      id: Date.now().toString(),
      title: `${form.title} (Copia)`,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      responsesCount: 0,
    };
    setForms([duplicated, ...forms]);
  };

  const handleCreateNew = () => {
    setEditingForm(null);
    setIsCreatorModalOpen(true);
  };

  const handleSaveForm = (formData: {
    title: string;
    description: string;
    schema: string;
    status: FormStatus;
  }) => {
    if (editingForm) {
      // Editar existente
      setForms(
        forms.map((f) =>
          f.id === editingForm.id
            ? {
                ...f,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : f,
        ),
      );
    } else {
      // Crear nuevo
      const newForm: DynamicForm = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        responsesCount: 0,
        createdBy: "Usuario Actual",
      };
      setForms([newForm, ...forms]);
    }
    setIsCreatorModalOpen(false);
    setEditingForm(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("todos");
  };

  const filteredForms = forms.filter((form) => {
    const matchSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "todos" || form.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const hasFilters = searchTerm || filterStatus !== "todos";

  const formResponses = selectedForm
    ? initialResponses.filter((r) => r.formId === selectedForm.id)
    : [];

  const renderCell = (form: DynamicForm, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {form.title}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-[250px]">
                {form.description}
              </p>
            </div>
          </div>
        );
      case "status":
        return (
          <Chip color={statusColorMap[form.status]} variant="flat" size="sm">
            {statusLabelMap[form.status]}
          </Chip>
        );
      case "responses":
        return (
          <button
            type="button"
            onClick={() => handleViewResponses(form)}
            className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{form.responsesCount}</span>
          </button>
        );
      case "createdAt":
        return (
          <span className="text-zinc-600 dark:text-zinc-400">
            {form.createdAt}
          </span>
        );
      case "updatedAt":
        return (
          <span className="text-zinc-600 dark:text-zinc-400">
            {form.updatedAt}
          </span>
        );
      case "createdBy":
        return (
          <span className="text-zinc-600 dark:text-zinc-400">
            {form.createdBy}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handlePreview(form)}
              aria-label="Vista previa"
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleEdit(form)}
              aria-label="Editar"
            >
              <Edit2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDuplicate(form)}
              aria-label="Duplicar"
            >
              <Copy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDelete(form)}
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
      {/* Filtros */}
      <Card
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
        shadow="none"
      >
        <CardBody className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Buscar formulario..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              startContent={
                <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              }
              classNames={{
                inputWrapper:
                  "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
              }}
            />

            <Select
              placeholder="Estado"
              selectedKeys={filterStatus !== "todos" ? [filterStatus] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                setFilterStatus(value || "todos");
              }}
              classNames={{
                trigger:
                  "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
              }}
            >
              <SelectItem key="published">Publicado</SelectItem>
              <SelectItem key="draft">Borrador</SelectItem>
              <SelectItem key="archived">Archivado</SelectItem>
            </Select>

            {hasFilters && (
              <Button
                variant="flat"
                color="danger"
                onPress={clearFilters}
                className="sm:col-span-2 lg:col-span-1"
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Header con acciones */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-zinc-500 dark:text-zinc-400">
            Mostrando {filteredForms.length} de {forms.length} formularios
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="bordered"
            startContent={<Download className="w-4 h-4" />}
          >
            Exportar
          </Button>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={handleCreateNew}
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
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table
              aria-label="Tabla de formularios"
              classNames={{
                wrapper: "bg-transparent shadow-none",
                th: "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400",
                td: "py-3",
              }}
            >
              <TableHeader>
                <TableColumn key="title">FORMULARIO</TableColumn>
                <TableColumn key="status">ESTADO</TableColumn>
                <TableColumn key="responses">RESPUESTAS</TableColumn>
                <TableColumn key="createdAt">CREADO</TableColumn>
                <TableColumn key="updatedAt">ACTUALIZADO</TableColumn>
                <TableColumn key="createdBy">CREADO POR</TableColumn>
                <TableColumn key="actions" align="end">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody items={filteredForms}>
                {(form) => (
                  <TableRow
                    key={form.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer"
                    onClick={() => handleViewDetail(form)}
                  >
                    {(columnKey) => (
                      <TableCell
                        onClick={(e) => {
                          if (
                            columnKey === "actions" ||
                            columnKey === "responses"
                          ) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {renderCell(form, columnKey)}
                      </TableCell>
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
        form={selectedForm}
        onEdit={() => {
          if (selectedForm) {
            setIsDetailPanelOpen(false);
            handleEdit(selectedForm);
          }
        }}
        onPreview={() => {
          if (selectedForm) {
            setIsDetailPanelOpen(false);
            handlePreview(selectedForm);
          }
        }}
        onViewResponses={() => {
          if (selectedForm) {
            setIsDetailPanelOpen(false);
            handleViewResponses(selectedForm);
          }
        }}
      />

      {/* Modal de creación/edición */}
      <FormCreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => {
          setIsCreatorModalOpen(false);
          setEditingForm(null);
        }}
        onSave={handleSaveForm}
        editingForm={editingForm}
      />

      {/* Modal de vista previa */}
      <FormPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        form={selectedForm}
      />

      {/* Modal de respuestas */}
      <FormResponsesModal
        isOpen={isResponsesModalOpen}
        onClose={() => setIsResponsesModalOpen(false)}
        form={selectedForm}
        responses={formResponses}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={selectedForm?.title || ""}
      />
    </div>
  );
}
