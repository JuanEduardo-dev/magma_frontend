"use client";

import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm: () => void;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalBody className="p-8 text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            ¿Estás seguro/a que deseas eliminar a este usuario?
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="bordered" size="lg" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="danger" size="lg" onPress={onConfirm}>
              Sí, eliminar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
