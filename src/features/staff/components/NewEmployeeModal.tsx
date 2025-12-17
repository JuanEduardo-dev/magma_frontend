"use client";

import { Upload } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

interface NewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

export function NewEmployeeModal({
  isOpen,
  onClose,
  onSave,
}: NewEmployeeModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h3 className="text-xl font-semibold">Nuevo Empleado</h3>
          </ModalHeader>

          <ModalBody className="gap-5">
            {/* Datos Personales */}
            <div className="space-y-3">
              <h4 className="font-medium">Datos Personales</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input name="nombres" label="Nombres" isRequired />
                <Input name="apellidos" label="Apellidos" isRequired />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input name="dni" label="DNI" isRequired />
                <Input
                  name="fechaNacimiento"
                  label="Fecha de nacimiento"
                  type="date"
                  isRequired
                />
                <Input name="telefono" label="Teléfono" type="tel" isRequired />
              </div>
              <Input
                name="email"
                label="Correo corporativo"
                type="email"
                isRequired
              />
            </div>

            {/* Datos Laborales */}
            <div className="space-y-3">
              <h4 className="font-medium">Datos Laborales</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input name="cargo" label="Cargo" isRequired />
                <Select name="departamento" label="Departamento" isRequired>
                  <SelectItem key="desarrollo">Desarrollo</SelectItem>
                  <SelectItem key="diseno">Diseño</SelectItem>
                  <SelectItem key="marketing">Marketing</SelectItem>
                  <SelectItem key="ventas">Ventas</SelectItem>
                  <SelectItem key="gestion">Gestión</SelectItem>
                  <SelectItem key="rrhh">RRHH</SelectItem>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  name="fechaIngreso"
                  label="Fecha de ingreso"
                  type="date"
                  isRequired
                />
                <Select name="tipoContrato" label="Tipo de contrato" isRequired>
                  <SelectItem key="indefinido">Indefinido</SelectItem>
                  <SelectItem key="temporal">Temporal</SelectItem>
                  <SelectItem key="practicas">Prácticas</SelectItem>
                  <SelectItem key="freelance">Freelance</SelectItem>
                </Select>
                <Select name="estado" label="Estado" isRequired>
                  <SelectItem key="activo">Activo</SelectItem>
                  <SelectItem key="suspendido">Suspendido</SelectItem>
                  <SelectItem key="cesado">Cesado</SelectItem>
                </Select>
              </div>
            </div>

            {/* Permisos */}
            <div className="space-y-3">
              <h4 className="font-medium">Permisos y Roles</h4>
              <div className="grid grid-cols-2 gap-3">
                <Select name="rol" label="Rol de sistema" isRequired>
                  <SelectItem key="user">Usuario</SelectItem>
                  <SelectItem key="supervisor">Supervisor</SelectItem>
                  <SelectItem key="admin">Administrador</SelectItem>
                  <SelectItem key="super-admin">Super Administrador</SelectItem>
                </Select>
                <Select name="accesos" label="Accesos habilitados">
                  <SelectItem key="todos">Todos los módulos</SelectItem>
                  <SelectItem key="rrhh">Solo RRHH</SelectItem>
                  <SelectItem key="operacion">Solo Operación</SelectItem>
                  <SelectItem key="personalizado">Personalizado</SelectItem>
                </Select>
              </div>
            </div>

            {/* Documentos */}
            <div className="space-y-3">
              <h4 className="font-medium">Documentos</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-2 border-dashed border-zinc-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-zinc-500" />
                  <p className="text-xs text-zinc-500">Subir contrato</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <div className="border-2 border-dashed border-zinc-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-zinc-500" />
                  <p className="text-xs text-zinc-500">Subir DNI</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="bordered" onPress={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Crear empleado
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
