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
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { Save, Package } from "lucide-react";
import type { AssetType, AssetStatus } from "../types";
import { locations } from "../data/mockData";

interface NewAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewAssetData) => void;
}

export interface NewAssetData {
  name: string;
  description: string;
  type: AssetType;
  status: AssetStatus;
  brand?: string;
  model?: string;
  serialNumber?: string;
  locationId: string;
  responsible?: string;
  acquisitionDate: string;
  acquisitionValue?: number;
  supplier?: string;
  warrantyUntil?: string;
}

const typeOptions: { key: AssetType; label: string }[] = [
  { key: "computer_equipment", label: "Equipo de cómputo" },
  { key: "furniture", label: "Mobiliario" },
  { key: "vehicle", label: "Vehículo" },
  { key: "tool", label: "Herramienta" },
  { key: "electronic", label: "Electrónico" },
  { key: "other", label: "Otro" },
];

const statusOptions: { key: AssetStatus; label: string }[] = [
  { key: "available", label: "Disponible" },
  { key: "in_use", label: "En uso" },
  { key: "maintenance", label: "En mantenimiento" },
  { key: "retired", label: "Dado de baja" },
];

export function NewAssetModal({ isOpen, onClose, onSave }: NewAssetModalProps) {
  const [formData, setFormData] = useState<NewAssetData>({
    name: "",
    description: "",
    type: "computer_equipment",
    status: "available",
    locationId: "",
    acquisitionDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.locationId) {
      return;
    }
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      type: "computer_equipment",
      status: "available",
      locationId: "",
      acquisitionDate: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white dark:bg-zinc-950",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        body: "py-6",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Nuevo activo
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
              Registra un nuevo activo en el inventario
            </p>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Información básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del activo"
                  placeholder="Ej: Laptop Dell Latitude"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  isRequired
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Select
                  label="Tipo de activo"
                  placeholder="Selecciona tipo"
                  selectedKeys={new Set([formData.type])}
                  onSelectionChange={(keys) =>
                    setFormData({
                      ...formData,
                      type: Array.from(keys)[0] as AssetType,
                    })
                  }
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Textarea
                label="Descripción"
                placeholder="Descripción detallada del activo..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                classNames={{
                  inputWrapper:
                    "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                }}
              />
            </div>

            {/* Detalles técnicos */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Detalles técnicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Marca"
                  placeholder="Ej: Dell"
                  value={formData.brand || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Input
                  label="Modelo"
                  placeholder="Ej: Latitude 5540"
                  value={formData.model || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Input
                  label="Número de serie"
                  placeholder="Ej: SN-123456"
                  value={formData.serialNumber || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, serialNumber: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
              </div>
            </div>

            {/* Ubicación y estado */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Ubicación y estado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Ubicación"
                  placeholder="Selecciona ubicación"
                  selectedKeys={
                    formData.locationId
                      ? new Set([formData.locationId])
                      : new Set()
                  }
                  onSelectionChange={(keys) =>
                    setFormData({
                      ...formData,
                      locationId: Array.from(keys)[0] as string,
                    })
                  }
                  isRequired
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {locations.map((loc) => (
                    <SelectItem key={loc.id}>
                      {loc.name} - {loc.building}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Estado"
                  placeholder="Selecciona estado"
                  selectedKeys={new Set([formData.status])}
                  onSelectionChange={(keys) =>
                    setFormData({
                      ...formData,
                      status: Array.from(keys)[0] as AssetStatus,
                    })
                  }
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  label="Responsable"
                  placeholder="Nombre del responsable"
                  value={formData.responsible || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, responsible: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
              </div>
            </div>

            {/* Información de adquisición */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Información de adquisición
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Fecha de adquisición"
                  value={formData.acquisitionDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acquisitionDate: e.target.value,
                    })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Input
                  type="number"
                  label="Valor de adquisición"
                  placeholder="0.00"
                  startContent={
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                      $
                    </span>
                  }
                  value={formData.acquisitionValue?.toString() || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acquisitionValue: parseFloat(e.target.value) || undefined,
                    })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Input
                  label="Proveedor"
                  placeholder="Nombre del proveedor"
                  value={formData.supplier || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
                <Input
                  type="date"
                  label="Garantía hasta"
                  value={formData.warrantyUntil || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, warrantyUntil: e.target.value })
                  }
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="bordered" onPress={handleClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            startContent={<Save className="w-4 h-4" />}
            isDisabled={!formData.name.trim() || !formData.locationId}
          >
            Guardar activo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
