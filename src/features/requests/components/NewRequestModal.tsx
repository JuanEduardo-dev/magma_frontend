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

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}

const employees = [
  { id: "1", name: "Marco Mantilla", position: "Desarrollador Senior" },
  { id: "2", name: "Sofía Martínez", position: "Diseñadora UX" },
  { id: "3", name: "Valentina Gómez", position: "Project Manager" },
  { id: "4", name: "Alejandro Vega", position: "Desarrollador Frontend" },
  { id: "5", name: "Juan Pérez", position: "Desarrollador Backend" },
];

export function NewRequestModal({
  isOpen,
  onClose,
  onSave,
}: NewRequestModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {
      employee: formData.get("employee") as string,
      type: formData.get("type") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      reason: formData.get("reason") as string,
      notes: (formData.get("notes") as string) || "",
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
              <label htmlFor="employee" className="text-sm font-medium">
                Empleado
              </label>
              <Select
                id="employee"
                name="employee"
                placeholder="Selecciona un empleado"
                aria-label="Empleado"
                isRequired
              >
                {employees.map((emp) => (
                  <SelectItem key={emp.id}>
                    {emp.name} - {emp.position}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Tipo de petición */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Tipo de petición
              </label>
              <Select
                id="type"
                name="type"
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
                <label htmlFor="startDate" className="text-sm font-medium">
                  Fecha de inicio
                </label>
                <Input id="startDate" name="startDate" type="date" isRequired />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  Fecha de fin
                </label>
                <Input id="endDate" name="endDate" type="date" isRequired />
              </div>
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Motivo de la petición
              </label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Describe el motivo de la petición..."
                minRows={3}
                isRequired
              />
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Observaciones adicionales
              </label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Información adicional (opcional)..."
                minRows={2}
              />
            </div>

            {/* Adjuntar documentos */}
            <div className="space-y-2">
              <label htmlFor="documents" className="text-sm font-medium">
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
                  id="documents"
                  name="documents"
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
