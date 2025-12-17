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
import { RequestsFilters } from "../components/RequestsFilters";
import { RequestDetailPanel } from "../components/RequestDetailPanel";
import { NewRequestModal } from "../components/NewRequestModal";
import { initialRequests } from "../data/mockData";
import type { Request, RequestStatus } from "../types";

const statusColorMap: Record<
  RequestStatus,
  "warning" | "success" | "danger" | "primary"
> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  in_progress: "primary",
};

const statusLabelMap: Record<RequestStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  in_progress: "En proceso",
};

export function RequestsPage() {
  const [requests] = useState<Request[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedRequest(null);
  };

  const handleSaveRequest = (data: Record<string, string>) => {
    console.log("Nueva petición:", data);
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Aplicar filtros:", filters);
  };

  const handleClearFilters = () => {
    console.log("Limpiar filtros");
  };

  const renderCell = (request: Request, columnKey: React.Key) => {
    switch (columnKey) {
      case "employee":
        return (
          <div>
            <p className="font-medium">{request.employee}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {request.position}
            </p>
          </div>
        );
      case "type":
        return <span className="text-sm capitalize">{request.type}</span>;
      case "reason":
        return (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[200px]">
            {request.reason}
          </p>
        );
      case "status":
        return (
          <Chip color={statusColorMap[request.status]} variant="flat" size="sm">
            {statusLabelMap[request.status]}
          </Chip>
        );
      case "createdAt":
        return <span className="text-sm">{request.createdAt}</span>;
      case "startDate":
        return <span className="text-sm">{request.startDate}</span>;
      case "endDate":
        return <span className="text-sm">{request.endDate}</span>;
      case "duration":
        return <span className="text-sm">{request.duration}</span>;
      case "attachments":
        return request.attachments > 0 ? (
          <div className="flex items-center justify-center gap-1">
            <Paperclip className="w-4 h-4 text-blue-600" />
            <span className="text-xs">{request.attachments}</span>
          </div>
        ) : (
          <span className="text-zinc-400">-</span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetails(request)}
              aria-label="Ver detalles"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
            {request.status === "pending" && (
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
      <RequestsFilters
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

          <div className="overflow-x-auto">
            <Table aria-label="Tabla de peticiones" removeWrapper>
              <TableHeader>
                <TableColumn key="employee">EMPLEADO</TableColumn>
                <TableColumn key="type">TIPO</TableColumn>
                <TableColumn key="reason">MOTIVO</TableColumn>
                <TableColumn key="status">ESTADO</TableColumn>
                <TableColumn key="createdAt">FECHA CREACIÓN</TableColumn>
                <TableColumn key="startDate">FECHA INICIO</TableColumn>
                <TableColumn key="endDate">FECHA FIN</TableColumn>
                <TableColumn key="duration">DURACIÓN</TableColumn>
                <TableColumn key="attachments" align="center">
                  ADJUNTOS
                </TableColumn>
                <TableColumn key="actions" align="end">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody items={requests}>
                {(request) => (
                  <TableRow
                    key={request.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    {(columnKey) => (
                      <TableCell>{renderCell(request, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Panel de detalles */}
      <RequestDetailPanel
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        request={selectedRequest}
      />

      {/* Modal nueva petición */}
      <NewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRequest}
      />
    </div>
  );
}
