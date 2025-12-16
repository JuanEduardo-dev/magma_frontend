"use client";

import {
  Input,
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { X, Plus, Trash2 } from "lucide-react";
import uploadIcon from "@/assets/icons/upload-file.svg";
import Image from "next/image";

interface NewUserPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewUserPanel({ isOpen, onClose }: NewUserPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 h-screen w-screen bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-full md:w-[600px] bg-white dark:bg-zinc-950 z-50 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-between z-999">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Nuevo usuario
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-0 space-y-6">
          {/* Información Personal y de Contacto */}
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Información Personal y de Contacto
              </h3>
              <Select
                label="Rol"
                labelPlacement="outside"
                placeholder="--"
                variant="bordered"
              >
                <SelectItem key="admin">Administrador</SelectItem>
                <SelectItem key="manager">Gerente</SelectItem>
                <SelectItem key="employee">Empleado</SelectItem>
              </Select>
              <Input
                label="Nombre"
                labelPlacement="outside"
                placeholder="Nombre"
                variant="bordered"
              />
              <Input
                label="Apellidos"
                labelPlacement="outside"
                placeholder="Apellidos"
                variant="bordered"
              />
              <Input
                label="Email"
                labelPlacement="outside"
                placeholder="email@ejemplo.com"
                type="email"
                variant="bordered"
              />
              <Input
                label="Teléfono"
                labelPlacement="outside"
                placeholder="+34 000 000 000"
                variant="bordered"
              />
              <Input
                label="Fecha de nacimiento"
                labelPlacement="outside"
                type="date"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Credenciales de Acceso y Documentación */}
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Credenciales de Acceso y Documentación
              </h3>
              <Input
                label="PIN"
                labelPlacement="outside"
                placeholder="0000"
                variant="bordered"
              />
              <Input
                label="DNI"
                labelPlacement="outside"
                placeholder="00000000A"
                variant="bordered"
              />
              <Input
                label="Código de empleado"
                labelPlacement="outside"
                placeholder="EMP001"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Información Domiciliaria y Opcional */}
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Información Domiciliaria y Opcional
                </h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                  (Datos complementarios)
                </p>
              </div>
              <Input
                label="Dirección o domicilio"
                labelPlacement="outside"
                placeholder="Calle, número, ciudad"
                variant="bordered"
              />
              <Input
                label="Cuenta bancaria"
                labelPlacement="outside"
                placeholder="ES00 0000 0000 0000 0000 0000"
                variant="bordered"
              />
              <Input
                label="Número de seguridad social"
                labelPlacement="outside"
                placeholder="000000000000"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Contrato/s de trabajo */}
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contrato/s de trabajo
              </h3>
              <Input
                label="Fecha de inicio"
                labelPlacement="outside"
                type="date"
                variant="bordered"
              />
              <Input
                label="Fecha de fin"
                labelPlacement="outside"
                type="date"
                variant="bordered"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Días de vacaciones"
                  labelPlacement="outside"
                  placeholder="30"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Días de prueba"
                  labelPlacement="outside"
                  placeholder="90"
                  type="number"
                  variant="bordered"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Coste por hora"
                  labelPlacement="outside"
                  placeholder="15.00"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Horas semanales"
                  labelPlacement="outside"
                  placeholder="40"
                  type="number"
                  variant="bordered"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Contrato (PDF)
                </p>
                <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
                  <CardBody className="p-8">
                    <button
                      type="button"
                      className="w-full flex flex-col items-center justify-center gap-5 cursor-pointer"
                    >
                      <Image
                        src={uploadIcon}
                        alt="Upload"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Sube aquí el archivo PDF del contrato del nuevo
                        colaborador.
                      </p>
                    </button>
                  </CardBody>
                </Card>
              </div>
              <Input
                label="Locales"
                labelPlacement="outside"
                placeholder="Escribe el nombre del local"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Centros de trabajo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Centros de trabajo
            </h3>
            <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
              <CardBody className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Local"
                    labelPlacement="outside"
                    placeholder="Seleccionar local"
                    variant="bordered"
                  >
                    <SelectItem key="local1">Sala magma S.L.</SelectItem>
                    <SelectItem key="local2">Raco explanada S.L.</SelectItem>
                  </Select>
                  <Select
                    label="Departamento"
                    labelPlacement="outside"
                    placeholder="Seleccionar departamento"
                    variant="bordered"
                  >
                    <SelectItem key="ventas">Ventas</SelectItem>
                    <SelectItem key="rrhh">RRHH</SelectItem>
                  </Select>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Eliminar</span>
                </button>
              </CardBody>
            </Card>
            <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
              <CardBody className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Local"
                    labelPlacement="outside"
                    placeholder="Seleccionar local"
                    variant="bordered"
                  >
                    <SelectItem key="local1">Sala magma S.L.</SelectItem>
                    <SelectItem key="local2">Raco explanada S.L.</SelectItem>
                  </Select>
                  <Select
                    label="Departamento"
                    labelPlacement="outside"
                    placeholder="Seleccionar departamento"
                    variant="bordered"
                  >
                    <SelectItem key="ventas">Ventas</SelectItem>
                    <SelectItem key="rrhh">RRHH</SelectItem>
                  </Select>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Eliminar</span>
                </button>
              </CardBody>
            </Card>
            <button
              type="button"
              className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Añadir centro de trabajo</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-999 -mx-6 px-6 py-4">
            <div className="flex justify-end gap-3">
              <Button
                variant="bordered"
                size="lg"
                onPress={onClose}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                size="lg"
                startContent={<Plus className="w-5 h-5" />}
              >
                Añadir usuario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
