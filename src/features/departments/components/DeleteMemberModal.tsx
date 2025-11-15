"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

export function DeleteMemberModal({
  isOpen,
  onClose,
  memberName,
}: DeleteMemberModalProps) {
  const handleDelete = () => {
    console.log("Eliminando miembro:", memberName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center pt-6">
          <h3 className="text-xl font-semibold text-center">
            ¿Estás seguro/a que deseas eliminar a este integrante del
            departamento?
          </h3>
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Dejará de estar asociado al departamento.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center pb-6">
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Sí, Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
