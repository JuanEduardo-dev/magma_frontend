"use client";

import {
  X,
  Download,
  Edit2,
  Key,
  FileText,
  User,
  Briefcase,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@heroui/react";
import type { Employee } from "../types";

interface EmployeeDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function EmployeeDetailPanel({
  isOpen,
  onClose,
  employee,
}: EmployeeDetailPanelProps) {
  if (!isOpen || !employee) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 h-screen w-screen bg-black/30 dark:bg-black/60 z-40 cursor-default"
        onClick={onClose}
        aria-label="Cerrar panel"
      />

      <div className="fixed right-0 top-0 bottom-0 h-screen w-full max-w-[500px] bg-white dark:bg-zinc-950 shadow-lg z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Perfil del Empleado
          </h3>
          <Button isIconOnly variant="light" onPress={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Foto y nombre */}
          <div className="text-center space-y-3">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {employee.fullName}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {employee.position}
              </p>
            </div>
          </div>

          {/* Datos personales */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Datos Personales
              </h4>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">DNI</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  {employee.dni}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Email
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  {employee.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Teléfono
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  {employee.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Datos laborales */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Datos Laborales
              </h4>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Departamento
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  {employee.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Fecha de ingreso
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  {employee.hireDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Estado laboral
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      employee.employmentStatus === "active"
                        ? "bg-green-600"
                        : employee.employmentStatus === "suspended"
                          ? "bg-yellow-600"
                          : "bg-zinc-400"
                    }`}
                  />
                  <span className="text-sm capitalize text-zinc-900 dark:text-zinc-100">
                    {employee.employmentStatus === "active"
                      ? "Activo"
                      : employee.employmentStatus === "suspended"
                        ? "Suspendido"
                        : "Cesado"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Permisos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Permisos y Roles
              </h4>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Rol de sistema
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  Usuario estándar
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Accesos habilitados
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">
                    RRHH
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">
                    Peticiones
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">
                    Horarios
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Documentos
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    Contrato.pdf
                  </p>
                </div>
                <Button isIconOnly size="sm" variant="light">
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    DNI.pdf
                  </p>
                </div>
                <Button isIconOnly size="sm" variant="light">
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Historial */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                Historial Laboral
              </h4>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  Ascenso a {employee.position}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  01/01/2024
                </p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                  Ingreso a la empresa
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {employee.hireDate}
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Acciones
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="bordered"
                className="justify-start"
                startContent={<Edit2 className="w-4 h-4" />}
              >
                Editar información
              </Button>
              <Button
                variant="bordered"
                className="justify-start"
                startContent={<Key className="w-4 h-4" />}
              >
                Restablecer contraseña
              </Button>
              <Button
                variant="bordered"
                className="justify-start"
                startContent={<Download className="w-4 h-4" />}
              >
                Exportar registro completo
              </Button>
              {employee.employmentStatus === "active" && (
                <Button
                  variant="bordered"
                  color="danger"
                  className="justify-start"
                  startContent={<X className="w-4 h-4" />}
                >
                  Desactivar empleado
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
