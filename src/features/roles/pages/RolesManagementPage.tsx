"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { Search, Download, Plus, Pencil, Trash2 } from "lucide-react";
import { mockRoles } from "../data/mockData";
import type { Role } from "../types";
import { NewRoleModal } from "../components/NewRoleModal";
import { DeleteRoleModal } from "../components/DeleteRoleModal";

export function RolesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = mockRoles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (roleId: string) => {
    window.location.href = `/configuration/roles/${roleId}`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs>
        <BreadcrumbItem href="/configuration">Configuración</BreadcrumbItem>
        <BreadcrumbItem>Gestión de cargos</BreadcrumbItem>
      </Breadcrumbs>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <Input
          placeholder="Buscar cargo..."
          startContent={<Search className="w-4 h-4 text-zinc-500" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex-1"
          variant="bordered"
        />
        <div className="flex gap-3">
          <Button
            variant="bordered"
            color="primary"
            startContent={<Download className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          >
            Exportar
          </Button>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => setIsNewRoleModalOpen(true)}
            className="flex-1 sm:flex-none"
          >
            Nuevo cargo
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6"
        shadow="none"
      >
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table aria-label="Tabla de cargos" removeWrapper>
              <TableHeader>
                <TableColumn>Nombre del cargo</TableColumn>
                <TableColumn align="end">Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {role.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Total de usuarios:{" "}
                          <span className="text-gray-900 dark:text-white">
                            {role.userCount}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleEdit(role.id)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(role)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Modals */}
      <NewRoleModal
        isOpen={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}
      />
      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        roleName={selectedRole?.name || ""}
      />
    </div>
  );
}
