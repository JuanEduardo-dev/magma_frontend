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

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      classNames={{
        base: "bg-white dark:bg-zinc-950",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Eliminar formulario
            </h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-zinc-600 dark:text-zinc-400">
            ¿Estás seguro de que deseas eliminar el formulario{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">
              &quot;{title}&quot;
            </strong>
            ?
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
            Esta acción no se puede deshacer. Se eliminarán también todas las
            respuestas asociadas a este formulario.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onPress={onConfirm}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
