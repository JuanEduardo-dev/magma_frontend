"use client";

import { useState } from "react";
import {
  Plus,
  Download,
  Eye,
  Edit2,
  Copy,
  Trash2,
  ChevronDown,
  Calendar as CalendarIcon,
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
import { SchedulesFilters } from "../components/SchedulesFilters";
import { ScheduleDetailPanel } from "../components/ScheduleDetailPanel";
import { NewScheduleModal } from "../components/NewScheduleModal";
import { ScheduleCalendar } from "../components/ScheduleCalendar";
import { initialSchedules } from "../data/mockData";
import type { Schedule, ScheduleType, ScheduleStatus } from "../types";

const estadoColorMap: Record<
  ScheduleStatus,
  "success" | "warning" | "default"
> = {
  activo: "success",
  suspendido: "warning",
  inactivo: "default",
};

const estadoLabelMap: Record<ScheduleStatus, string> = {
  activo: "Activo",
  suspendido: "Suspendido",
  inactivo: "Inactivo",
};

const tipoColorMap: Record<
  ScheduleType,
  "primary" | "secondary" | "success" | "warning"
> = {
  fijo: "primary",
  rotativo: "secondary",
  flexible: "success",
  turnos: "warning",
};

const tipoLabelMap: Record<ScheduleType, string> = {
  fijo: "Fijo",
  rotativo: "Rotativo",
  flexible: "Flexible",
  turnos: "Turnos",
};

export function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterDepartamento, setFilterDepartamento] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [isNewScheduleModalOpen, setIsNewScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  const handleViewDetail = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsDetailPanelOpen(true);
  };

  const handleDuplicate = (id: string) => {
    const original = schedules.find((h) => h.id === id);
    if (original) {
      const duplicated: Schedule = {
        ...original,
        id: Date.now().toString(),
        nombreEmpleado: `${original.nombreEmpleado} (Copia)`,
      };
      setSchedules([duplicated, ...schedules]);
    }
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter((h) => h.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTipo("todos");
    setFilterDepartamento("todos");
    setFilterEstado("todos");
  };

  const handleSaveSchedule = (data: Record<string, unknown>) => {
    console.log("Nuevo horario:", data);
  };

  const filteredSchedules = schedules.filter((h) => {
    const matchSearch = h.nombreEmpleado
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchTipo = filterTipo === "todos" || h.tipo === filterTipo;
    const matchDepartamento =
      filterDepartamento === "todos" || h.departamento === filterDepartamento;
    const matchEstado = filterEstado === "todos" || h.estado === filterEstado;
    return matchSearch && matchTipo && matchDepartamento && matchEstado;
  });

  const renderCell = (schedule: Schedule, columnKey: React.Key) => {
    switch (columnKey) {
      case "empleado":
        return (
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {schedule.nombreEmpleado}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {schedule.departamento}
              {schedule.empleadosAsignados &&
                ` · ${schedule.empleadosAsignados} empleados`}
            </p>
          </div>
        );
      case "tipo":
        return (
          <Chip color={tipoColorMap[schedule.tipo]} variant="flat" size="sm">
            {tipoLabelMap[schedule.tipo]}
          </Chip>
        );
      case "horaEntrada":
        return (
          <span className="text-zinc-900 dark:text-zinc-100">
            {schedule.horaEntrada}
          </span>
        );
      case "horaSalida":
        return (
          <span className="text-zinc-900 dark:text-zinc-100">
            {schedule.horaSalida}
          </span>
        );
      case "diasLaborales":
        return (
          <span className="text-zinc-500 dark:text-zinc-400">
            {schedule.diasLaborales}
          </span>
        );
      case "vigencia":
        return (
          <div>
            <p className="text-sm text-zinc-900 dark:text-zinc-100">
              {schedule.vigenciaDesde}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {schedule.vigenciaHasta}
            </p>
          </div>
        );
      case "estado":
        return (
          <Chip
            color={estadoColorMap[schedule.estado]}
            variant="flat"
            size="sm"
          >
            {estadoLabelMap[schedule.estado]}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetail(schedule)}
              aria-label="Ver detalle"
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Editar">
              <Edit2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDuplicate(schedule.id)}
              aria-label="Duplicar"
            >
              <Copy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleDelete(schedule.id)}
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <SchedulesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterTipo={filterTipo}
        onFilterTipoChange={setFilterTipo}
        filterDepartamento={filterDepartamento}
        onFilterDepartamentoChange={setFilterDepartamento}
        filterEstado={filterEstado}
        onFilterEstadoChange={setFilterEstado}
        onClearFilters={clearFilters}
      />

      {/* Toggle vista y acciones */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === "table" ? "solid" : "bordered"}
            color={viewMode === "table" ? "primary" : "default"}
            size="sm"
            onPress={() => setViewMode("table")}
          >
            Tabla
          </Button>
          <Button
            variant={viewMode === "calendar" ? "solid" : "bordered"}
            color={viewMode === "calendar" ? "primary" : "default"}
            size="sm"
            startContent={<CalendarIcon className="w-4 h-4" />}
            onPress={() => setViewMode("calendar")}
          >
            Calendario
          </Button>
          <p className="text-zinc-500 dark:text-zinc-400 ml-4 hidden sm:block">
            Mostrando {filteredSchedules.length} de {schedules.length} horarios
          </p>
        </div>
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
            onPress={() => setIsNewScheduleModalOpen(true)}
            className="flex-1 sm:flex-none"
          >
            Nuevo horario
          </Button>
        </div>
      </div>

      {/* Vista tabla o calendario */}
      {viewMode === "table" ? (
        <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <CardBody className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Lista de Horarios
              </h2>
            </div>

            {filteredSchedules.length === 0 ? (
              <div className="py-16 text-center">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-zinc-400 dark:text-zinc-600" />
                <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                  No hay horarios creados
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                  Comienza creando tu primer horario
                </p>
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={() => setIsNewScheduleModalOpen(true)}
                >
                  Crear horario
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table aria-label="Tabla de horarios" removeWrapper>
                  <TableHeader>
                    <TableColumn key="empleado">EMPLEADO / GRUPO</TableColumn>
                    <TableColumn key="tipo">TIPO DE HORARIO</TableColumn>
                    <TableColumn key="horaEntrada">HORA ENTRADA</TableColumn>
                    <TableColumn key="horaSalida">HORA SALIDA</TableColumn>
                    <TableColumn key="diasLaborales">
                      DÍAS LABORALES
                    </TableColumn>
                    <TableColumn key="vigencia">VIGENCIA</TableColumn>
                    <TableColumn key="estado">ESTADO</TableColumn>
                    <TableColumn key="acciones" align="end">
                      ACCIONES
                    </TableColumn>
                  </TableHeader>
                  <TableBody items={filteredSchedules}>
                    {(schedule) => (
                      <TableRow
                        key={schedule.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(schedule, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <ScheduleCalendar
          schedules={filteredSchedules}
          onSelectSchedule={handleViewDetail}
        />
      )}

      {/* Panel de detalles */}
      <ScheduleDetailPanel
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        schedule={selectedSchedule}
      />

      {/* Modal nuevo horario */}
      <NewScheduleModal
        isOpen={isNewScheduleModalOpen}
        onClose={() => setIsNewScheduleModalOpen(false)}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}
