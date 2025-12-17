"use client";

import { useState, useMemo } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Chip,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Search,
  Plus,
  QrCode,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Package,
  MapPin,
} from "lucide-react";
import { MainLayout } from "@/shared/layouts/MainLayout";
import type { Asset, AssetStatus, AssetType } from "../types";
import { initialAssets, locations } from "../data/mockData";
import { AssetDetailPanel } from "../components/AssetDetailPanel";
import { NewAssetModal } from "../components/NewAssetModal";
import { ScanQRModal } from "../components/ScanQRModal";

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

const typeOptions: { key: AssetType | "all"; label: string }[] = [
  { key: "all", label: "Todos los tipos" },
  { key: "computer_equipment", label: "Equipo de cómputo" },
  { key: "furniture", label: "Mobiliario" },
  { key: "vehicle", label: "Vehículo" },
  { key: "tool", label: "Herramienta" },
  { key: "electronic", label: "Electrónico" },
  { key: "other", label: "Otro" },
];

const statusOptions: { key: AssetStatus | "all"; label: string }[] = [
  { key: "all", label: "Todos los estados" },
  { key: "available", label: "Disponible" },
  { key: "in_use", label: "En uso" },
  { key: "maintenance", label: "En mantenimiento" },
  { key: "retired", label: "Dado de baja" },
];

const locationOptions = [
  { key: "all", label: "Todas las ubicaciones" },
  ...locations.map((loc) => ({ key: loc.id, label: loc.name })),
];

export function InventoryPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<AssetType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<AssetStatus | "all">("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const rowsPerPage = 10;

  // Filtrar activos
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" || asset.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || asset.status === statusFilter;
      const matchesLocation =
        locationFilter === "all" || asset.location.id === locationFilter;

      return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });
  }, [assets, searchTerm, typeFilter, statusFilter, locationFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredAssets.length / rowsPerPage);
  const paginatedAssets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredAssets.slice(start, start + rowsPerPage);
  }, [filteredAssets, page]);

  // Estadísticas
  const stats = useMemo(() => {
    return {
      total: assets.length,
      available: assets.filter((a) => a.status === "available").length,
      inUse: assets.filter((a) => a.status === "in_use").length,
      maintenance: assets.filter((a) => a.status === "maintenance").length,
    };
  }, [assets]);

  const handleViewDetail = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailOpen(true);
  };

  const handleScanResult = (code: string) => {
    const found = assets.find((a) => a.qrCode === code || a.code === code);
    if (found) {
      handleViewDetail(found);
    }
  };

  const handleSaveNewAsset = (data: NewAssetModalData) => {
    const location = locations.find((l) => l.id === data.locationId);
    if (!location) return;

    const now = new Date().toISOString();
    const assetId = `asset-${Date.now()}`;
    const newAsset: Asset = {
      id: assetId,
      code: `ACT-${String(assets.length + 1).padStart(3, "0")}`,
      qrCode: `QR-ACT-${String(assets.length + 1).padStart(3, "0")}`,
      name: data.name,
      description: data.description,
      type: data.type,
      status: data.status,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      location: location,
      responsible: data.responsible,
      acquisitionDate: data.acquisitionDate,
      acquisitionValue: data.acquisitionValue,
      supplier: data.supplier,
      warrantyUntil: data.warrantyUntil,
      photos: [],
      documents: [],
      movementHistory: [
        {
          id: `mov-${Date.now()}`,
          assetId: assetId,
          type: "assignment",
          date: now.split("T")[0],
          newLocation: location.name,
          performedBy: "Sistema",
          description: "Alta inicial del activo",
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    setAssets([newAsset, ...assets]);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Gestiona los activos de tu organización
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="bordered"
              startContent={<QrCode className="w-4 h-4" />}
              onPress={() => setIsScanModalOpen(true)}
              className="border-zinc-200 dark:border-zinc-800"
            >
              Escanear QR
            </Button>
            <Button
              color="primary"
              startContent={<Plus className="w-4 h-4" />}
              onPress={() => setIsNewAssetModalOpen(true)}
            >
              Nuevo activo
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.total}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total activos
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.available}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Disponibles
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.inUse}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    En uso
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.maintenance}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Mantenimiento
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
          <CardBody className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Buscar por nombre, código o serie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={
                  <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                }
                className="flex-1"
                classNames={{
                  inputWrapper:
                    "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                }}
              />
              <div className="flex flex-wrap gap-2">
                <Select
                  placeholder="Tipo"
                  selectedKeys={new Set([typeFilter])}
                  onSelectionChange={(keys) =>
                    setTypeFilter(Array.from(keys)[0] as AssetType | "all")
                  }
                  className="w-40"
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  placeholder="Estado"
                  selectedKeys={new Set([statusFilter])}
                  onSelectionChange={(keys) =>
                    setStatusFilter(Array.from(keys)[0] as AssetStatus | "all")
                  }
                  className="w-40"
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  placeholder="Ubicación"
                  selectedKeys={new Set([locationFilter])}
                  onSelectionChange={(keys) =>
                    setLocationFilter(Array.from(keys)[0] as string)
                  }
                  className="w-48"
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  {locationOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
                <Button
                  variant="bordered"
                  startContent={<Download className="w-4 h-4" />}
                  className="border-zinc-200 dark:border-zinc-800"
                >
                  Exportar
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table */}
        <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
          <CardBody className="p-0">
            <Table
              aria-label="Tabla de activos"
              classNames={{
                wrapper: "bg-transparent shadow-none",
                th: "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400",
                td: "text-zinc-900 dark:text-zinc-100",
              }}
            >
              <TableHeader>
                <TableColumn>CÓDIGO</TableColumn>
                <TableColumn>ACTIVO</TableColumn>
                <TableColumn>TIPO</TableColumn>
                <TableColumn>UBICACIÓN</TableColumn>
                <TableColumn>ESTADO</TableColumn>
                <TableColumn>RESPONSABLE</TableColumn>
                <TableColumn width={80}>ACCIONES</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No se encontraron activos">
                {paginatedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <span className="font-mono text-sm">{asset.code}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {asset.brand} {asset.model}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {typeLabelMap[asset.type]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                        <MapPin className="w-3 h-3" />
                        {asset.location.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={statusColorMap[asset.status]}
                        variant="flat"
                        size="sm"
                      >
                        {statusLabelMap[asset.status]}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {asset.responsible || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Acciones"
                          onAction={(key) => {
                            if (key === "view") handleViewDetail(asset);
                          }}
                        >
                          <DropdownItem
                            key="view"
                            startContent={<Eye className="w-4 h-4" />}
                          >
                            Ver detalles
                          </DropdownItem>
                          <DropdownItem
                            key="edit"
                            startContent={<Edit className="w-4 h-4" />}
                          >
                            Editar
                          </DropdownItem>
                          <DropdownItem
                            key="qr"
                            startContent={<QrCode className="w-4 h-4" />}
                          >
                            Ver QR
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            startContent={<Trash2 className="w-4 h-4" />}
                            className="text-danger"
                            color="danger"
                          >
                            Eliminar
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Mostrando {(page - 1) * rowsPerPage + 1} -{" "}
                  {Math.min(page * rowsPerPage, filteredAssets.length)} de{" "}
                  {filteredAssets.length}
                </p>
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                  showControls
                  size="sm"
                />
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Detail Panel */}
      <AssetDetailPanel
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        asset={selectedAsset}
      />

      {/* New Asset Modal */}
      <NewAssetModal
        isOpen={isNewAssetModalOpen}
        onClose={() => setIsNewAssetModalOpen(false)}
        onSave={handleSaveNewAsset}
      />

      {/* Scan QR Modal */}
      <ScanQRModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScan={handleScanResult}
      />
    </>
  );
}

// Type for new asset data
interface NewAssetModalData {
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
