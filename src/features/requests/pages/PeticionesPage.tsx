"use client";

import { useState } from "react";
import {
  Plus,
  Eye,
  Download,
  ChevronDown,
  CheckCircle,
  X,
  Edit2,
  Paperclip,
  FileText,
  Clock,
  XCircle,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { MetricsCard } from "../components/MetricsCard";
import { PeticionesFilters } from "../components/PeticionesFilters";
import { PeticionDetailPanel } from "../components/PeticionDetailPanel";
import { NuevaPeticionModal } from "../components/NuevaPeticionModal";
import { initialPeticiones } from "../data/mockData";
import type { Peticion } from "../types";

const estadoColorMap: Record<
  string,
  "warning" | "success" | "danger" | "primary"
> = {
  pendiente: "warning",
  aprobado: "success",
  rechazado: "danger",
  proceso: "primary",
};

export function PeticionesPage() {
  const [peticiones] = useState<Peticion[]>(initialPeticiones);
  const [selectedPeticion, setSelectedPeticion] = useState<Peticion | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (peticion: Peticion) => {
    setSelectedPeticion(peticion);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedPeticion(null);
  };

  const handleSavePeticion = (data: Record<string, string>) => {
    console.log("Nueva petición:", data);
    // Aquí se implementaría la lógica para guardar
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Aplicar filtros:", filters);
    // Aquí se implementaría la lógica de filtrado
  };

  const handleClearFilters = () => {
    console.log("Limpiar filtros");
    // Aquí se implementaría la lógica para limpiar filtros
  };

  const renderCell = (peticion: Peticion, columnKey: React.Key) => {
    switch (columnKey) {
      case "empleado":
        return (
          <div>
            <p className="font-medium">{peticion.empleado}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {peticion.cargo}
            </p>
          </div>
        );
      case "tipo":
        return <span className="text-sm capitalize">{peticion.tipo}</span>;
      case "motivo":
        return (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[200px]">
            {peticion.motivo}
          </p>
        );
      case "estado":
        return (
          <Chip
            color={estadoColorMap[peticion.estado]}
            variant="flat"
            size="sm"
          >
            {peticion.estado === "proceso" ? "En proceso" : peticion.estado}
          </Chip>
        );
      case "fechaCreacion":
        return <span className="text-sm">{peticion.fechaCreacion}</span>;
      case "fechaInicio":
        return <span className="text-sm">{peticion.fechaInicio}</span>;
      case "fechaFin":
        return <span className="text-sm">{peticion.fechaFin}</span>;
      case "duracion":
        return <span className="text-sm">{peticion.duracion}</span>;
      case "adjuntos":
        return peticion.adjuntos > 0 ? (
          <div className="flex items-center justify-center gap-1">
            <Paperclip className="w-4 h-4 text-blue-600" />
            <span className="text-xs">{peticion.adjuntos}</span>
          </div>
        ) : (
          <span className="text-zinc-400">-</span>
        );
      case "acciones":
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetails(peticion)}
              aria-label="Ver detalles"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
            {peticion.estado === "pendiente" && (
              <>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  aria-label="Aprobar"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  aria-label="Rechazar"
                >
                  <X className="w-4 h-4 text-red-600" />
                </Button>
              </>
            )}
            <Button isIconOnly size="sm" variant="light" aria-label="Editar">
              <Edit2 className="w-4 h-4 text-zinc-500" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Peticiones"
          value="156"
          icon={<FileText className="w-5 h-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricsCard
          title="Pendientes"
          value="23"
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricsCard
          title="Aprobadas"
          value="98"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <MetricsCard
          title="Rechazadas"
          value="12"
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      {/* Filtros */}
      <PeticionesFilters
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Tabla */}
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
            <h2 className="text-xl font-semibold">Todas las peticiones</h2>
            <div className="flex items-center gap-3">
              <Button
                variant="bordered"
                startContent={<Download className="w-4 h-4" />}
                className="flex-1 sm:flex-none"
              >
                Exportar
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Nueva petición
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4">
            <Table
              aria-label="Tabla de peticiones"
              classNames={{ wrapper: "shadow-none" }}
            >
              <TableHeader>
                <TableColumn key="empleado">EMPLEADO</TableColumn>
                <TableColumn key="tipo">TIPO</TableColumn>
                <TableColumn key="motivo">MOTIVO</TableColumn>
                <TableColumn key="estado">ESTADO</TableColumn>
                <TableColumn key="fechaCreacion">FECHA CREACIÓN</TableColumn>
                <TableColumn key="fechaInicio">FECHA INICIO</TableColumn>
                <TableColumn key="fechaFin">FECHA FIN</TableColumn>
                <TableColumn key="duracion">DURACIÓN</TableColumn>
                <TableColumn key="adjuntos" align="center">
                  ADJUNTOS
                </TableColumn>
                <TableColumn key="acciones" align="end">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody items={peticiones}>
                {(peticion) => (
                  <TableRow
                    key={peticion.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    {(columnKey) => (
                      <TableCell>{renderCell(peticion, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Panel de detalles */}
      <PeticionDetailPanel
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        peticion={selectedPeticion}
      />

      {/* Modal nueva petición */}
      <NuevaPeticionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePeticion}
      />
    </div>
  );
}
