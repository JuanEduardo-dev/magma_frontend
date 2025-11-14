"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";

interface ChangeCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const companies = [
  "Sala magma S.L.",
  "Raco explanada S.L.",
  "Innovación y modernización del comercio S.L.",
  "Tambora open AIR S.L.",
  "Imc alicante S.L.",
  "TAKA parques temáticos, S.L.",
];

export function ChangeCompanyModal({
  isOpen,
  onClose,
}: ChangeCompanyModalProps) {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const handleChange = () => {
    // No functionality - just UI
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-white dark:bg-zinc-900",
        backdrop: "bg-black/50",
      }}
    >
      <ModalContent>
        <ModalBody className="p-8">
          {/* Header */}
          <div className="mb-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Seleccionar Empresa
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Selecciona la empresa con la que deseas operar ahora
            </p>
          </div>

          {/* Companies List */}
          <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <RadioGroup
              value={selectedCompany}
              onValueChange={setSelectedCompany}
            >
              {companies.map((company) => (
                <Radio key={company} value={company} className="mb-2">
                  {company}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button color="primary" size="lg" onPress={handleChange}>
              Cambiar
            </Button>
            <Button
              variant="bordered"
              size="lg"
              onPress={onClose}
              color="primary"
            >
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
