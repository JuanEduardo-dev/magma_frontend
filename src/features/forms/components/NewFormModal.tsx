"use client";

import { useState } from "react";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
} from "@heroui/react";
import type { Campo } from "../types";

interface NewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}

export function NewFormModal({ isOpen, onClose, onSave }: NewFormModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [campos, setCampos] = useState<Campo[]>([]);

  const agregarCampo = () => {
    setCampos([
      ...campos,
      {
        id: Date.now().toString(),
        tipo: "texto-corto",
        etiqueta: "",
        obligatorio: false,
        rolVisibilidad: "todos",
      },
    ]);
  };

  const eliminarCampo = (id: string) => {
    setCampos(campos.filter((c) => c.id !== id));
  };

  const actualizarCampo = (id: string, key: keyof Campo, value: unknown) => {
    setCampos(campos.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const handleSubmit = () => {
    const data = {
      titulo,
      descripcion,
      campos,
    };
    onSave(data);
    setTitulo("");
    setDescripcion("");
    setCampos([]);
    onClose();
  };

  const handleClose = () => {
    setTitulo("");
    setDescripcion("");
    setCampos([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white dark:bg-zinc-950",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        body: "py-6",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Crear Nuevo Formulario
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            Constructor de formularios personalizados
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Información básica
              </h4>

              <Input
                label="Título del formulario"
                placeholder="Ej: Evaluación de Desempeño 2025"
                value={titulo}
                onValueChange={setTitulo}
                isRequired
              />

              <Textarea
                label="Descripción"
                placeholder="Describe el propósito del formulario..."
                value={descripcion}
                onValueChange={setDescripcion}
                minRows={2}
              />
            </div>

            {/* Constructor de campos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                  Constructor de campos
                </h4>
                <Button
                  variant="bordered"
                  size="sm"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={agregarCampo}
                >
                  Agregar campo
                </Button>
              </div>

              {campos.length === 0 ? (
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No hay campos agregados. Haz clic en "Agregar campo" para
                    comenzar.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {campos.map((campo) => (
                    <div
                      key={campo.id}
                      className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded cursor-move mt-6"
                        >
                          <GripVertical className="w-4 h-4 text-zinc-400" />
                        </button>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Select
                            label="Tipo de campo"
                            selectedKeys={[campo.tipo]}
                            onSelectionChange={(keys) =>
                              actualizarCampo(
                                campo.id,
                                "tipo",
                                Array.from(keys)[0],
                              )
                            }
                          >
                            <SelectItem key="texto-corto">
                              Texto corto
                            </SelectItem>
                            <SelectItem key="texto-largo">
                              Texto largo
                            </SelectItem>
                            <SelectItem key="seleccion-multiple">
                              Selección múltiple
                            </SelectItem>
                            <SelectItem key="checkbox">Checkbox</SelectItem>
                            <SelectItem key="fecha">Fecha</SelectItem>
                            <SelectItem key="archivo">
                              Adjuntar archivo
                            </SelectItem>
                          </Select>

                          <Input
                            label="Etiqueta"
                            placeholder="Nombre del campo"
                            value={campo.etiqueta}
                            onValueChange={(value) =>
                              actualizarCampo(campo.id, "etiqueta", value)
                            }
                          />

                          <div className="flex items-center gap-2 mt-2">
                            <Checkbox
                              isSelected={campo.obligatorio}
                              onValueChange={(checked) =>
                                actualizarCampo(
                                  campo.id,
                                  "obligatorio",
                                  checked,
                                )
                              }
                            >
                              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                Campo obligatorio
                              </span>
                            </Checkbox>
                          </div>

                          <Select
                            label="Visible para"
                            selectedKeys={[campo.rolVisibilidad]}
                            onSelectionChange={(keys) =>
                              actualizarCampo(
                                campo.id,
                                "rolVisibilidad",
                                Array.from(keys)[0],
                              )
                            }
                          >
                            <SelectItem key="todos">Todos los roles</SelectItem>
                            <SelectItem key="admin">
                              Solo administradores
                            </SelectItem>
                            <SelectItem key="supervisor">
                              Supervisores y superiores
                            </SelectItem>
                            <SelectItem key="empleado">
                              Solo empleados
                            </SelectItem>
                          </Select>
                        </div>

                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          onPress={() => eliminarCampo(campo.id)}
                          className="mt-6"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Crear formulario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
