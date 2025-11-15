"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { AlertTriangle } from "lucide-react";

interface DeleteDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string;
}

export function DeleteDepartmentModal({
  isOpen,
  onClose,
  departmentName,
}: DeleteDepartmentModalProps) {
  const handleDelete = () => {
    console.log("Eliminando departamento:", departmentName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center pt-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-center">
            ¿Estás seguro/a que deseas eliminar este departamento?
          </h3>
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Al eliminar el departamento, los usuarios asignados a él ya no
            tendrán un departamento asociado y podrían perder ciertos accesos o
            configuraciones.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center pb-6">
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Eliminar departamento
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
