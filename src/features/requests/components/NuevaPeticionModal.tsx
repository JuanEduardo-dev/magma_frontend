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
  Textarea,
} from "@heroui/react";

interface NuevaPeticionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}

const empleados = [
  { id: "1", nombre: "Marco Mantilla", cargo: "Desarrollador Senior" },
  { id: "2", nombre: "Sofía Martínez", cargo: "Diseñadora UX" },
  { id: "3", nombre: "Valentina Gómez", cargo: "Project Manager" },
  { id: "4", nombre: "Alejandro Vega", cargo: "Desarrollador Frontend" },
  { id: "5", nombre: "Juan Pérez", cargo: "Desarrollador Backend" },
];

export function NuevaPeticionModal({
  isOpen,
  onClose,
  onSave,
}: NuevaPeticionModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {
      empleado: formData.get("empleado") as string,
      tipo: formData.get("tipo") as string,
      fechaInicio: formData.get("fechaInicio") as string,
      fechaFin: formData.get("fechaFin") as string,
      motivo: formData.get("motivo") as string,
      observaciones: (formData.get("observaciones") as string) || "",
    };

    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Nueva Petición</h3>
            <p className="text-sm text-zinc-500 font-normal">
              Formulario para crear una nueva petición de empleado
            </p>
          </ModalHeader>

          <ModalBody className="gap-5">
            {/* Seleccionar Empleado */}
            <div className="space-y-2">
              <label htmlFor="empleado" className="text-sm font-medium">
                Empleado
              </label>
              <Select
                id="empleado"
                name="empleado"
                placeholder="Selecciona un empleado"
                aria-label="Empleado"
                isRequired
              >
                {empleados.map((emp) => (
                  <SelectItem key={emp.id}>
                    {emp.nombre} - {emp.cargo}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Tipo de petición */}
            <div className="space-y-2">
              <label htmlFor="tipo" className="text-sm font-medium">
                Tipo de petición
              </label>
              <Select
                id="tipo"
                name="tipo"
                placeholder="Selecciona el tipo"
                aria-label="Tipo de petición"
                isRequired
              >
                <SelectItem key="vacaciones">Vacaciones</SelectItem>
                <SelectItem key="permisos">Permisos</SelectItem>
                <SelectItem key="licencia">Licencia médica</SelectItem>
                <SelectItem key="cambio-turno">Cambio de turno</SelectItem>
              </Select>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fechaInicio" className="text-sm font-medium">
                  Fecha de inicio
                </label>
                <Input
                  id="fechaInicio"
                  name="fechaInicio"
                  type="date"
                  isRequired
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="fechaFin" className="text-sm font-medium">
                  Fecha de fin
                </label>
                <Input id="fechaFin" name="fechaFin" type="date" isRequired />
              </div>
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <label htmlFor="motivo" className="text-sm font-medium">
                Motivo de la petición
              </label>
              <Textarea
                id="motivo"
                name="motivo"
                placeholder="Describe el motivo de la petición..."
                minRows={3}
                isRequired
              />
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <label htmlFor="observaciones" className="text-sm font-medium">
                Observaciones adicionales
              </label>
              <Textarea
                id="observaciones"
                name="observaciones"
                placeholder="Información adicional (opcional)..."
                minRows={2}
              />
            </div>

            {/* Adjuntar documentos */}
            <div className="space-y-2">
              <label htmlFor="documentos" className="text-sm font-medium">
                Documentos adjuntos
              </label>
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-zinc-500" />
                <p className="text-zinc-500 text-sm">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-zinc-400 text-xs mt-1">
                  PDF, JPG, PNG hasta 10MB
                </p>
                <input
                  id="documentos"
                  name="documentos"
                  type="file"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="bordered" onPress={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Crear petición
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
