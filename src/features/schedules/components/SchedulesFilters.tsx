"use client";

import { Search, X } from "lucide-react";
import { Input, Select, SelectItem, Button } from "@heroui/react";

interface SchedulesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterTipo: string;
  onFilterTipoChange: (value: string) => void;
  filterDepartamento: string;
  onFilterDepartamentoChange: (value: string) => void;
  filterEstado: string;
  onFilterEstadoChange: (value: string) => void;
  onClearFilters: () => void;
}

export function SchedulesFilters({
  searchTerm,
  onSearchChange,
  filterTipo,
  onFilterTipoChange,
  filterDepartamento,
  onFilterDepartamentoChange,
  filterEstado,
  onFilterEstadoChange,
  onClearFilters,
}: SchedulesFiltersProps) {
  const hasFilters =
    searchTerm ||
    filterTipo !== "todos" ||
    filterDepartamento !== "todos" ||
    filterEstado !== "todos";

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Buscar horario..."
          value={searchTerm}
          onValueChange={onSearchChange}
          startContent={
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          }
          classNames={{
            inputWrapper:
              "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
          }}
        />

        <Select
          placeholder="Tipo de horario"
          selectedKeys={filterTipo !== "todos" ? [filterTipo] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            onFilterTipoChange(value || "todos");
          }}
          classNames={{
            trigger:
              "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
          }}
        >
          <SelectItem key="fijo">Fijo</SelectItem>
          <SelectItem key="rotativo">Rotativo</SelectItem>
          <SelectItem key="flexible">Flexible</SelectItem>
          <SelectItem key="turnos">Por turnos</SelectItem>
        </Select>

        <Select
          placeholder="Departamento"
          selectedKeys={
            filterDepartamento !== "todos" ? [filterDepartamento] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            onFilterDepartamentoChange(value || "todos");
          }}
          classNames={{
            trigger:
              "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
          }}
        >
          <SelectItem key="tecnologia">Tecnología</SelectItem>
          <SelectItem key="ventas">Ventas</SelectItem>
          <SelectItem key="rrhh">Recursos Humanos</SelectItem>
          <SelectItem key="operaciones">Operaciones</SelectItem>
          <SelectItem key="marketing">Marketing</SelectItem>
        </Select>

        <Select
          placeholder="Estado"
          selectedKeys={filterEstado !== "todos" ? [filterEstado] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            onFilterEstadoChange(value || "todos");
          }}
          classNames={{
            trigger:
              "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
          }}
        >
          <SelectItem key="activo">Activo</SelectItem>
          <SelectItem key="inactivo">Inactivo</SelectItem>
          <SelectItem key="suspendido">Suspendido</SelectItem>
        </Select>

        {hasFilters && (
          <Button
            variant="flat"
            color="danger"
            startContent={<X className="w-4 h-4" />}
            onPress={onClearFilters}
            className="sm:col-span-2 lg:col-span-1"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
