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
import type { Employee, EmploymentStatus } from "../types";
import { initialEmployees } from "../data/mockData";
import { NewEmployeeModal } from "../components/NewEmployeeModal";
import { EmployeeDetailPanel } from "../components/EmployeeDetailPanel";

const statusColorMap: Record<
  EmploymentStatus,
  "success" | "warning" | "default"
> = {
  active: "success",
  suspended: "warning",
  terminated: "default",
};

const statusLabelMap: Record<EmploymentStatus, string> = {
  active: "Activo",
  suspended: "Suspendido",
  terminated: "Cesado",
};

export function StaffPage() {
  const [employees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  const handleViewDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailPanelOpen(true);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dni.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" || emp.employmentStatus === filterStatus;
    const matchDepartment =
      filterDepartment === "all" || emp.department === filterDepartment;
    return matchSearch && matchStatus && matchDepartment;
  });

  const renderCell = (employee: Employee, columnKey: React.Key) => {
    switch (columnKey) {
      case "photo":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
            {employee.photo ? (
              <Image
                src={employee.photo}
                alt={employee.fullName}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>
        );
      case "fullName":
        return (
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {employee.fullName}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {employee.dni}
            </p>
          </div>
        );
      case "position":
        return employee.position;
      case "department":
        return employee.department;
      case "email":
        return (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {employee.email}
          </span>
        );
      case "phone":
        return (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {employee.phone}
          </span>
        );
      case "employmentStatus":
        return (
          <Chip
            color={statusColorMap[employee.employmentStatus]}
            variant="flat"
            size="sm"
          >
            {statusLabelMap[employee.employmentStatus]}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleViewDetail(employee)}
              aria-label="Ver detalle"
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Editar">
              <Edit2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
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
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <CardBody className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Buscar por nombre o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={
                <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              }
              classNames={{
                inputWrapper:
                  "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
              }}
              className="sm:col-span-2"
            />

            <Select
              placeholder="Estado"
              selectedKeys={
                filterStatus !== "all" ? new Set([filterStatus]) : new Set()
              }
              onSelectionChange={(keys) =>
                setFilterStatus(
                  Array.from(keys)[0] ? (Array.from(keys)[0] as string) : "all",
                )
              }
              aria-label="Estado"
              classNames={{
                trigger:
                  "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
              }}
            >
              <SelectItem key="active">Activo</SelectItem>
              <SelectItem key="suspended">Suspendido</SelectItem>
              <SelectItem key="terminated">Cesado</SelectItem>
            </Select>

            <Select
              placeholder="Departamento"
              selectedKeys={
                filterDepartment !== "all"
                  ? new Set([filterDepartment])
                  : new Set()
              }
              onSelectionChange={(keys) =>
                setFilterDepartment(
                  Array.from(keys)[0] ? (Array.from(keys)[0] as string) : "all",
                )
              }
              aria-label="Departamento"
              classNames={{
                trigger:
                  "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
              }}
            >
              <SelectItem key="Desarrollo">Desarrollo</SelectItem>
              <SelectItem key="Diseño">Diseño</SelectItem>
              <SelectItem key="Marketing">Marketing</SelectItem>
              <SelectItem key="Ventas">Ventas</SelectItem>
              <SelectItem key="Gestión">Gestión</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-zinc-500 dark:text-zinc-400">
          Mostrando {filteredEmployees.length} de {employees.length} empleados
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
            onPress={() => setIsNewEmployeeModalOpen(true)}
            startContent={<Plus className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          >
            Nuevo empleado
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <CardBody className="p-6">
          <div className="overflow-x-auto">
            <Table aria-label="Tabla de personal" removeWrapper>
              <TableHeader>
                <TableColumn key="photo">FOTO</TableColumn>
                <TableColumn key="fullName">NOMBRE COMPLETO</TableColumn>
                <TableColumn key="position">CARGO</TableColumn>
                <TableColumn key="department">DEPARTAMENTO</TableColumn>
                <TableColumn key="email">EMAIL</TableColumn>
                <TableColumn key="phone">TELÉFONO</TableColumn>
                <TableColumn key="employmentStatus">ESTADO LABORAL</TableColumn>
                <TableColumn key="actions">ACCIONES</TableColumn>
              </TableHeader>
              <TableBody items={filteredEmployees}>
                {(employee) => (
                  <TableRow key={employee.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(employee, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <NewEmployeeModal
        isOpen={isNewEmployeeModalOpen}
        onClose={() => setIsNewEmployeeModalOpen(false)}
        onSave={() => {}}
      />

      <EmployeeDetailPanel
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
}
