"use client";

import { useState } from "react";
import { Plus, Clock, Users, AlertCircle } from "lucide-react";
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
  DatePicker,
} from "@heroui/react";
import type { ScheduleType } from "../types";

interface NewScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}

const diasSemana = [
  { key: "lunes", label: "LUN" },
  { key: "martes", label: "MAR" },
  { key: "miercoles", label: "MIÉ" },
  { key: "jueves", label: "JUE" },
  { key: "viernes", label: "VIE" },
  { key: "sabado", label: "SÁB" },
  { key: "domingo", label: "DOM" },
];

export function NewScheduleModal({
  isOpen,
  onClose,
  onSave,
}: NewScheduleModalProps) {
  const [tipoHorario, setTipoHorario] = useState<ScheduleType>("fijo");
  const [diasSeleccionados, setDiasSeleccionados] = useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
    sabado: false,
    domingo: false,
  });

  const toggleDia = (dia: keyof typeof diasSeleccionados) => {
    setDiasSeleccionados((prev) => ({ ...prev, [dia]: !prev[dia] }));
  };

  const handleSubmit = () => {
    const data = {
      tipoHorario,
      diasSeleccionados,
    };
    onSave(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
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
            Crear Nuevo Horario
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            Formulario para crear un nuevo horario de trabajo
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            {/* A. Información general */}
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Información General
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre interno"
                  placeholder="Ej: Turno mañana, Horario administrativo"
                  isRequired
                />

                <Select
                  label="Tipo de horario"
                  selectedKeys={[tipoHorario]}
                  onSelectionChange={(keys) =>
                    setTipoHorario(Array.from(keys)[0] as ScheduleType)
                  }
                >
                  <SelectItem key="fijo">Fijo</SelectItem>
                  <SelectItem key="rotativo">Rotativo</SelectItem>
                  <SelectItem key="flexible">Flexible</SelectItem>
                  <SelectItem key="turnos">Por turnos</SelectItem>
                </Select>
              </div>

              <Textarea
                label="Descripción (opcional)"
                placeholder="Describe el horario..."
                minRows={2}
              />
            </div>

            {/* B. Configuración del horario */}
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Configuración del Horario
              </h4>

              {tipoHorario === "fijo" && (
                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      type="time"
                      label="Hora de entrada"
                      defaultValue="09:00"
                      isRequired
                    />
                    <Input
                      type="time"
                      label="Hora de salida"
                      defaultValue="18:00"
                      isRequired
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        Total horas/día
                      </p>
                      <div className="h-10 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center px-3">
                        <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mr-2" />
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">
                          9 horas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      Días laborales
                    </p>
                    <div className="grid grid-cols-7 gap-2">
                      {diasSemana.map((dia) => (
                        <button
                          key={dia.key}
                          type="button"
                          onClick={() =>
                            toggleDia(dia.key as keyof typeof diasSeleccionados)
                          }
                          className={`py-2 px-3 rounded-lg border transition-colors text-xs ${
                            diasSeleccionados[
                              dia.key as keyof typeof diasSeleccionados
                            ]
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-blue-400"
                          }`}
                        >
                          {dia.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Refrigerio - Inicio"
                      defaultValue="13:00"
                    />
                    <Input
                      type="time"
                      label="Refrigerio - Fin"
                      defaultValue="14:00"
                    />
                  </div>
                </div>
              )}

              {tipoHorario === "flexible" && (
                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-amber-700 dark:text-amber-300 text-sm font-medium">
                        Horario flexible
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
                        Define rangos de entrada y salida permitidos
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Entrada mínima permitida"
                      defaultValue="08:00"
                      isRequired
                    />
                    <Input
                      type="time"
                      label="Entrada máxima permitida"
                      defaultValue="10:00"
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Salida mínima permitida"
                      defaultValue="17:00"
                      isRequired
                    />
                    <Input
                      type="time"
                      label="Salida máxima permitida"
                      defaultValue="19:00"
                      isRequired
                    />
                  </div>

                  <Input
                    type="number"
                    label="Horas mínimas requeridas por día"
                    defaultValue="8"
                    min={1}
                    max={12}
                    isRequired
                  />
                </div>
              )}

              {tipoHorario === "rotativo" && (
                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                        Horario rotativo
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
                        Define los bloques de horario que se rotarán
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        Bloques de horario
                      </p>
                      <Button
                        variant="bordered"
                        size="sm"
                        startContent={<Plus className="w-4 h-4" />}
                      >
                        Agregar bloque
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {[1, 2].map((bloque) => (
                        <div
                          key={bloque}
                          className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-white dark:bg-zinc-950"
                        >
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                            Bloque {bloque}
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            <Input
                              type="time"
                              placeholder="Entrada"
                              defaultValue="09:00"
                              size="sm"
                            />
                            <Input
                              type="time"
                              placeholder="Salida"
                              defaultValue="18:00"
                              size="sm"
                            />
                            <Input
                              type="number"
                              placeholder="Días"
                              defaultValue="5"
                              size="sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tipoHorario === "turnos" && (
                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-orange-700 dark:text-orange-300 text-sm font-medium">
                        Por turnos
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
                        Configura turnos mañana, tarde y noche
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-white dark:bg-zinc-950">
                      <Checkbox defaultSelected className="mb-3">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Turno Mañana
                        </span>
                      </Checkbox>
                      <div className="grid grid-cols-2 gap-3 pl-6">
                        <Input
                          type="time"
                          placeholder="Entrada"
                          defaultValue="06:00"
                          size="sm"
                        />
                        <Input
                          type="time"
                          placeholder="Salida"
                          defaultValue="14:00"
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-white dark:bg-zinc-950">
                      <Checkbox defaultSelected className="mb-3">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Turno Tarde
                        </span>
                      </Checkbox>
                      <div className="grid grid-cols-2 gap-3 pl-6">
                        <Input
                          type="time"
                          placeholder="Entrada"
                          defaultValue="14:00"
                          size="sm"
                        />
                        <Input
                          type="time"
                          placeholder="Salida"
                          defaultValue="22:00"
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-white dark:bg-zinc-950">
                      <Checkbox className="mb-3">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          Turno Noche
                        </span>
                      </Checkbox>
                      <div className="grid grid-cols-2 gap-3 pl-6">
                        <Input
                          type="time"
                          placeholder="Entrada"
                          defaultValue="22:00"
                          size="sm"
                        />
                        <Input
                          type="time"
                          placeholder="Salida"
                          defaultValue="06:00"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* C. Asignación */}
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Asignación
              </h4>

              <Select label="Asignar a" defaultSelectedKeys={["individual"]}>
                <SelectItem key="individual">Empleados individuales</SelectItem>
                <SelectItem key="equipo">Equipos</SelectItem>
                <SelectItem key="departamento">
                  Departamento completo
                </SelectItem>
              </Select>

              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Empleados seleccionados
                  </p>
                  <Button
                    variant="bordered"
                    size="sm"
                    startContent={<Users className="w-4 h-4" />}
                  >
                    Buscar empleados
                  </Button>
                </div>
                <div className="text-center py-4 text-zinc-500 dark:text-zinc-400 text-sm">
                  No hay empleados seleccionados
                </div>
              </div>
            </div>

            {/* D. Reglas opcionales */}
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Reglas Opcionales
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Minutos de tolerancia"
                  defaultValue="10"
                  min={0}
                  max={60}
                />
                <Input
                  type="number"
                  label="Tiempo máximo refrigerio (min)"
                  defaultValue="60"
                  min={0}
                />
              </div>

              <Checkbox>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Permitir horas extra
                </span>
              </Checkbox>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePicker label="Vigencia desde" isRequired />
                <DatePicker label="Vigencia hasta" isRequired />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Guardar horario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
