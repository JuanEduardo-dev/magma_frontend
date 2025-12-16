"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Download,
  Eye,
  Edit2,
  Search,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import type { Empleado, EstadoLaboral } from "../types";
import { initialEmpleados } from "../data/mockData";
import { NuevoEmpleadoModal } from "../components/NuevoEmpleadoModal";
import { EmpleadoDetailPanel } from "../components/EmpleadoDetailPanel";

const estadoColorMap: Record<EstadoLaboral, "success" | "warning" | "default"> =
  {
    activo: "success",
    suspendido: "warning",
    cesado: "default",
  };

const estadoLabelMap: Record<EstadoLaboral, string> = {
  activo: "Activo",
  suspendido: "Suspendido",
  cesado: "Cesado",
};

export function PersonalPage() {
  const [empleados] = useState<Empleado[]>(initialEmpleados);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [filterDepartamento, setFilterDepartamento] = useState<string>("todos");
  const [isNewEmpleadoModalOpen, setIsNewEmpleadoModalOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(
    null,
  );
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  const handleViewDetail = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsDetailPanelOpen(true);
  };

  const filteredEmpleados = empleados.filter((emp) => {
    const matchSearch =
      emp.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dni.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado =
      filterEstado === "todos" || emp.estadoLaboral === filterEstado;
    const matchDepartamento =
      filterDepartamento === "todos" || emp.departamento === filterDepartamento;
    return matchSearch && matchEstado && matchDepartamento;
  });

  const renderCell = (empleado: Empleado, columnKey: React.Key) => {
    switch (columnKey) {
      case "foto":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {empleado.foto ? (
              <Image
                src={empleado.foto}
                alt={empleado.nombreCompleto}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <UserIcon className="w-5 h-5 text-blue-600" />
            )}
          </div>
        );
      case "nombreCompleto":
        return (
          <div>
            <p className="font-medium">{empleado.nombreCompleto}</p>
            <p className="text-sm text-zinc-500">{empleado.dni}</p>
          </div>
        );
      case "cargo":
        return empleado.cargo;
      case "departamento":
        return empleado.departamento;
      case "email":
        return <span className="text-sm text-zinc-600">{empleado.email}</span>;
      case "telefono":
        return (
          <span className="text-sm text-zinc-600">{empleado.telefono}</span>
        );
      case "estadoLaboral":
        return (
          <Chip
            color={estadoColorMap[empleado.estadoLaboral]}
            variant="flat"
            size="sm"
          >
            {estadoLabelMap[empleado.estadoLaboral]}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetail(empleado)}
              aria-label="Ver detalle"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
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
      {/* Filtros */}
      <Card className="border border-zinc-200">
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Buscar por nombre o DNI
              </label>
              <Input
                id="search"
                placeholder="Nombre o DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={<Search className="w-4 h-4 text-zinc-500" />}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="estado" className="text-sm font-medium">
                Estado
              </label>
              <Select
                id="estado"
                placeholder="Selecciona estado"
                selectedKeys={new Set([filterEstado])}
                onSelectionChange={(keys) =>
                  setFilterEstado(Array.from(keys)[0] as string)
                }
                aria-label="Estado"
              >
                <SelectItem key="todos">Todos</SelectItem>
                <SelectItem key="activo">Activo</SelectItem>
                <SelectItem key="suspendido">Suspendido</SelectItem>
                <SelectItem key="cesado">Cesado</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="departamento" className="text-sm font-medium">
                Departamento
              </label>
              <Select
                id="departamento"
                placeholder="Selecciona departamento"
                selectedKeys={new Set([filterDepartamento])}
                onSelectionChange={(keys) =>
                  setFilterDepartamento(Array.from(keys)[0] as string)
                }
                aria-label="Departamento"
              >
                <SelectItem key="todos">Todos</SelectItem>
                <SelectItem key="Desarrollo">Desarrollo</SelectItem>
                <SelectItem key="Diseño">Diseño</SelectItem>
                <SelectItem key="Marketing">Marketing</SelectItem>
                <SelectItem key="Ventas">Ventas</SelectItem>
                <SelectItem key="Gestión">Gestión</SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-zinc-600">
          Mostrando {filteredEmpleados.length} de {empleados.length} empleados
        </p>
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
            onPress={() => setIsNewEmpleadoModalOpen(true)}
            startContent={<Plus className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          >
            Nuevo empleado
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <Table aria-label="Tabla de personal">
              <TableHeader>
                <TableColumn key="foto">FOTO</TableColumn>
                <TableColumn key="nombreCompleto">NOMBRE COMPLETO</TableColumn>
                <TableColumn key="cargo">CARGO</TableColumn>
                <TableColumn key="departamento">DEPARTAMENTO</TableColumn>
                <TableColumn key="email">EMAIL</TableColumn>
                <TableColumn key="telefono">TELÉFONO</TableColumn>
                <TableColumn key="estadoLaboral">ESTADO LABORAL</TableColumn>
                <TableColumn key="acciones">ACCIONES</TableColumn>
              </TableHeader>
              <TableBody items={filteredEmpleados}>
                {(empleado) => (
                  <TableRow key={empleado.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(empleado, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <NuevoEmpleadoModal
        isOpen={isNewEmpleadoModalOpen}
        onClose={() => setIsNewEmpleadoModalOpen(false)}
        onSave={() => {}}
      />

      <EmpleadoDetailPanel
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        empleado={selectedEmpleado}
      />
    </div>
  );
}
