"use client";

import { Search, X } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  DatePicker,
} from "@heroui/react";

interface RequestsFiltersProps {
  onApplyFilters: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
}

export function RequestsFilters({
  onApplyFilters,
  onClearFilters,
}: RequestsFiltersProps) {
  return (
    <Card
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6"
      shadow="none"
    >
      <CardBody className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Buscar por empleado */}
          <div className="space-y-2">
            <label
              htmlFor="search-employee"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Buscar empleado
            </label>
            <Input
              id="search-employee"
              placeholder="Nombre del empleado"
              startContent={
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Estado
            </label>
            <Select
              id="status"
              placeholder="Todos los estados"
              aria-label="Estado"
              classNames={{
                trigger: "bg-zinc-100 dark:bg-zinc-800",
              }}
            >
              <SelectItem key="todos">Todos</SelectItem>
              <SelectItem key="pendiente">Pendiente</SelectItem>
              <SelectItem key="aprobado">Aprobado</SelectItem>
              <SelectItem key="rechazado">Rechazado</SelectItem>
              <SelectItem key="proceso">En proceso</SelectItem>
            </Select>
          </div>

          {/* Tipo de petición */}
          <div className="space-y-2">
            <label
              htmlFor="type"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Tipo de petición
            </label>
            <Select
              id="type"
              placeholder="Todos los tipos"
              aria-label="Tipo de petición"
              classNames={{
                trigger: "bg-zinc-100 dark:bg-zinc-800",
              }}
            >
              <SelectItem key="todos">Todos</SelectItem>
              <SelectItem key="vacaciones">Vacaciones</SelectItem>
              <SelectItem key="permisos">Permisos</SelectItem>
              <SelectItem key="licencia">Licencia</SelectItem>
              <SelectItem key="cambio-turno">Cambio de turno</SelectItem>
            </Select>
          </div>

          {/* Departamento */}
          <div className="space-y-2">
            <label
              htmlFor="department"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Departamento
            </label>
            <Select
              id="department"
              placeholder="Todos los departamentos"
              aria-label="Departamento"
              classNames={{
                trigger: "bg-zinc-100 dark:bg-zinc-800",
              }}
            >
              <SelectItem key="todos">Todos</SelectItem>
              <SelectItem key="desarrollo">Desarrollo</SelectItem>
              <SelectItem key="diseno">Diseño</SelectItem>
              <SelectItem key="marketing">Marketing</SelectItem>
              <SelectItem key="ventas">Ventas</SelectItem>
              <SelectItem key="rrhh">RRHH</SelectItem>
            </Select>
          </div>
        </div>

        {/* Rango de fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label
              htmlFor="start-date"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Fecha de inicio
            </label>
            <DatePicker aria-label="Fecha de inicio" className="w-full" />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="end-date"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Fecha de fin
            </label>
            <DatePicker aria-label="Fecha de fin" className="w-full" />
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3">
          <Button
            variant="bordered"
            onPress={onClearFilters}
            startContent={<X className="w-4 h-4" />}
          >
            Limpiar filtros
          </Button>
          <Button
            color="primary"
            onPress={() => onApplyFilters({})}
            startContent={<Search className="w-4 h-4" />}
          >
            Buscar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
