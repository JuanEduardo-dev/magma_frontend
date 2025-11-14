"use client";

import { Search, X } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

interface PeticionesFiltersProps {
  onApplyFilters: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
}

export function PeticionesFilters({
  onApplyFilters,
  onClearFilters,
}: PeticionesFiltersProps) {
  return (
    <Card className="border border-zinc-200 dark:border-zinc-800 mb-6">
      <CardBody className="p-6 dark:bg-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Buscar por empleado */}
          <div className="space-y-2">
            <label htmlFor="search-empleado" className="text-sm font-medium">
              Buscar empleado
            </label>
            <Input
              id="search-empleado"
              placeholder="Nombre del empleado"
              startContent={<Search className="w-4 h-4 text-zinc-500" />}
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <label htmlFor="estado" className="text-sm font-medium">
              Estado
            </label>
            <Select
              id="estado"
              placeholder="Todos los estados"
              aria-label="Estado"
              classNames={{
                trigger: "bg-zinc-100",
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
            <label htmlFor="tipo" className="text-sm font-medium">
              Tipo de petición
            </label>
            <Select
              id="tipo"
              placeholder="Todos los tipos"
              aria-label="Tipo de petición"
              classNames={{
                trigger: "bg-zinc-100",
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
            <label htmlFor="departamento" className="text-sm font-medium">
              Departamento
            </label>
            <Select
              id="departamento"
              placeholder="Todos los departamentos"
              aria-label="Departamento"
              classNames={{
                trigger: "bg-zinc-100",
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
            <label htmlFor="fecha-inicio" className="text-sm font-medium">
              Fecha de inicio
            </label>
            <Input id="fecha-inicio" type="date" />
          </div>
          <div className="space-y-2">
            <label htmlFor="fecha-fin" className="text-sm font-medium">
              Fecha de fin
            </label>
            <Input id="fecha-fin" type="date" />
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
