"use client";

import { X, MapPin, User, Calendar, FileText, History } from "lucide-react";
import { Button, Chip, Divider, ScrollShadow, Tabs, Tab } from "@heroui/react";
import type { Asset, AssetStatus, AssetType } from "../types";

interface AssetDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
}

const statusColorMap: Record<
  AssetStatus,
  "success" | "primary" | "warning" | "default"
> = {
  available: "success",
  in_use: "primary",
  maintenance: "warning",
  retired: "default",
};

const statusLabelMap: Record<AssetStatus, string> = {
  available: "Disponible",
  in_use: "En uso",
  maintenance: "En mantenimiento",
  retired: "Dado de baja",
};

const typeLabelMap: Record<AssetType, string> = {
  computer_equipment: "Equipo de cómputo",
  furniture: "Mobiliario",
  vehicle: "Vehículo",
  tool: "Herramienta",
  electronic: "Electrónico",
  other: "Otro",
};

const movementTypeLabel: Record<string, string> = {
  assignment: "Asignación",
  return: "Devolución",
  transfer: "Traslado",
  maintenance: "Mantenimiento",
  retirement: "Baja",
};

export function AssetDetailPanel({
  isOpen,
  onClose,
  asset,
}: AssetDetailPanelProps) {
  if (!asset) return null;

  const formatCurrency = (value?: number) => {
    if (!value) return "—";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 h-screen w-screen bg-black/30 dark:bg-black/60 z-40 cursor-default"
          onClick={onClose}
          aria-label="Cerrar panel"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-zinc-950 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {asset.name}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {asset.code}
            </p>
          </div>
          <Button isIconOnly variant="light" onPress={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollShadow className="h-[calc(100vh-73px)]">
          <Tabs
            aria-label="Detalles del activo"
            classNames={{
              tabList:
                "w-full bg-zinc-100 dark:bg-zinc-900 p-1 mx-4 mt-4 rounded-lg",
              cursor: "bg-white dark:bg-zinc-800",
              tab: "px-4 py-2",
              tabContent: "text-zinc-600 dark:text-zinc-400",
            }}
          >
            <Tab key="info" title="Información">
              <div className="p-4 space-y-6">
                {/* Estado y tipo */}
                <div className="flex items-center gap-3">
                  <Chip
                    color={statusColorMap[asset.status]}
                    variant="flat"
                    size="sm"
                  >
                    {statusLabelMap[asset.status]}
                  </Chip>
                  <Chip variant="bordered" size="sm">
                    {typeLabelMap[asset.type]}
                  </Chip>
                </div>

                {/* Descripción */}
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Descripción
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {asset.description}
                  </p>
                </div>

                <Divider className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Detalles técnicos */}
                <div className="space-y-4">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    Detalles técnicos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Marca
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {asset.brand || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Modelo
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {asset.model || "—"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Número de serie
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100 font-mono text-sm">
                        {asset.serialNumber || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <Divider className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Ubicación */}
                <div className="space-y-3">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ubicación
                  </h3>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {asset.location.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {[
                        asset.location.building,
                        asset.location.floor && `Piso ${asset.location.floor}`,
                        asset.location.area,
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Responsable */}
                {asset.responsible && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Responsable
                    </h3>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {asset.responsible}
                    </p>
                  </div>
                )}

                <Divider className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Información financiera */}
                <div className="space-y-4">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Adquisición
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Fecha
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {asset.acquisitionDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Valor
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(asset.acquisitionValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Proveedor
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {asset.supplier || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Garantía hasta
                      </p>
                      <p className="text-zinc-900 dark:text-zinc-100">
                        {asset.warrantyUntil || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                  <div className="w-32 h-32 mx-auto bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {asset.qrCode}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    Código QR del activo
                  </p>
                </div>
              </div>
            </Tab>

            <Tab key="documents" title="Documentos">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documentos adjuntos
                  </h3>
                  <Button size="sm" color="primary" variant="flat">
                    Subir
                  </Button>
                </div>

                {asset.documents.length > 0 ? (
                  <div className="space-y-2">
                    {asset.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                              {doc.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="light">
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay documentos adjuntos</p>
                  </div>
                )}
              </div>
            </Tab>

            <Tab key="history" title="Historial">
              <div className="p-4 space-y-4">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Historial de movimientos
                </h3>

                {asset.movementHistory.length > 0 ? (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

                    <div className="space-y-4">
                      {asset.movementHistory.map((mov, index) => (
                        <div key={mov.id} className="relative pl-10">
                          {/* Timeline dot */}
                          <div
                            className={`absolute left-2 w-4 h-4 rounded-full border-2 ${
                              index === 0
                                ? "bg-blue-500 border-blue-500"
                                : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700"
                            }`}
                          />

                          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                                {movementTypeLabel[mov.type]}
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {mov.date}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              {mov.description}
                            </p>
                            {mov.notes && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 italic">
                                {mov.notes}
                              </p>
                            )}
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                              Por: {mov.performedBy}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Sin movimientos registrados</p>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </ScrollShadow>
      </div>
    </>
  );
}
