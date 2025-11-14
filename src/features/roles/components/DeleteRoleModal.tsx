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

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}

export function DeleteRoleModal({
  isOpen,
  onClose,
  roleName,
}: DeleteRoleModalProps) {
  const handleDelete = () => {
    // Aquí iría la lógica de eliminación
    console.log("Eliminando cargo:", roleName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center pt-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-center">
            ¿Estás seguro/a que deseas eliminar este cargo?
          </h3>
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Los usuarios asignados a este cargo quedarán sin un cargo asociado y
            podrían perder ciertos permisos.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center pb-6">
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Eliminar cargo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
