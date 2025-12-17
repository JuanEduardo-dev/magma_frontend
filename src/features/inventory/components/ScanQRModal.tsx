"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { QrCode, Search, Camera } from "lucide-react";

interface ScanQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (code: string) => void;
}

export function ScanQRModal({ isOpen, onClose, onScan }: ScanQRModalProps) {
  const [manualCode, setManualCode] = useState("");

  const handleManualSearch = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      handleClose();
    }
  };

  const handleClose = () => {
    setManualCode("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        base: "bg-white dark:bg-zinc-950",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        body: "py-6",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Escanear código QR
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
              Busca un activo por su código QR
            </p>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-6">
            {/* Camera preview placeholder */}
            <div className="aspect-square max-w-[250px] mx-auto bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700">
              <Camera className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-3" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center px-4">
                Cámara no disponible
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center px-4 mt-1">
                Usa el campo de abajo para búsqueda manual
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                o
              </span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Manual input */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Búsqueda manual
              </p>
              <Input
                placeholder="Ingresa el código del activo (ej: QR-ACT-001)"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                startContent={
                  <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                }
                classNames={{
                  inputWrapper:
                    "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                }}
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="bordered" onPress={handleClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleManualSearch}
            startContent={<Search className="w-4 h-4" />}
            isDisabled={!manualCode.trim()}
          >
            Buscar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
