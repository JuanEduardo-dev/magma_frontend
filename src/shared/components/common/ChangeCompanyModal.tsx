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
import { useSwitchCompany } from "@/features/auth/hooks/useSwitchCompany";

interface ChangeCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Empresas hardcodeadas - en el futuro vendrán del auth context
const companies = [
  { id: "company-1", name: "Sala magma S.L." },
  { id: "company-2", name: "Raco explanada S.L." },
  { id: "company-3", name: "Innovación y modernización del comercio S.L." },
  { id: "company-4", name: "Tambora open AIR S.L." },
  { id: "company-5", name: "Imc alicante S.L." },
  { id: "company-6", name: "TAKA parques temáticos, S.L." },
];

export function ChangeCompanyModal({
  isOpen,
  onClose,
}: ChangeCompanyModalProps) {
  const { switchCompany, isLoading, currentCompanyId } = useSwitchCompany();
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    currentCompanyId || companies[0].id,
  );

  const handleChange = async () => {
    try {
      await switchCompany(selectedCompanyId);
      onClose();
    } catch (error) {
      console.error("Error al cambiar de empresa:", error);
    }
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
              value={selectedCompanyId}
              onValueChange={setSelectedCompanyId}
            >
              {companies.map((company) => (
                <Radio key={company.id} value={company.id} className="mb-2">
                  {company.name}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              color="primary"
              size="lg"
              onPress={handleChange}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? "Cambiando..." : "Cambiar"}
            </Button>
            <Button
              variant="bordered"
              size="lg"
              onPress={onClose}
              color="primary"
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
