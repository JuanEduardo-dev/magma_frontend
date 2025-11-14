"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Button,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@heroui/react";
import { Search, FileDown, Plus, Pencil, Trash2 } from "lucide-react";
import { NewUserPanel } from "../components/NewUserPanel";
import { DeleteUserModal } from "../components/DeleteUserModal";
import usersData from "../data/users.json";
import type { User } from "../types/users";

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewUserPanelOpen, setIsNewUserPanelOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({ column: "name", direction: "ascending" });

  const users = usersData as User[];

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [users, searchQuery]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof User];
      const second = b[sortDescriptor.column as keyof User];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredUsers, sortDescriptor]);

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // No functionality - just UI
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs>
        <BreadcrumbItem href="/configuration">Configuración</BreadcrumbItem>
        <BreadcrumbItem>Gestión de usuarios</BreadcrumbItem>
      </Breadcrumbs>

      {/* Search and Actions */}
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Buscar usuarios..."
          startContent={<Search className="w-4 h-4 text-zinc-500" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex-1"
          variant="bordered"
        />
        <Button
          variant="bordered"
          color="primary"
          startContent={<FileDown className="w-4 h-4" />}
        >
          Exportar
        </Button>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => setIsNewUserPanelOpen(true)}
        >
          Nuevo usuario
        </Button>
      </div>

      {/* Users Table with Filters */}
      <Card className="border border-zinc-200 dark:border-zinc-800 shadow-none">
        <CardBody className="p-6 space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Empresa"
              labelPlacement="outside"
              placeholder="Todas las empresas"
              variant="bordered"
            >
              <SelectItem key="all">Todas las empresas</SelectItem>
              <SelectItem key="magma">Sala magma S.L.</SelectItem>
              <SelectItem key="raco">Raco explanada S.L.</SelectItem>
            </Select>
            <Select
              label="Roles"
              labelPlacement="outside"
              placeholder="Todos los roles"
              variant="bordered"
            >
              <SelectItem key="all">Todos los roles</SelectItem>
              <SelectItem key="admin">Administrador</SelectItem>
              <SelectItem key="manager">Gerente</SelectItem>
              <SelectItem key="employee">Empleado</SelectItem>
            </Select>
            <Select
              label="Estado"
              labelPlacement="outside"
              placeholder="Activos"
              variant="bordered"
            >
              <SelectItem key="active">Activos</SelectItem>
              <SelectItem key="inactive">Inactivos</SelectItem>
              <SelectItem key="all">Todos</SelectItem>
            </Select>
            <Select
              label="Mostrar empleados"
              labelPlacement="outside"
              placeholder="De mis locales"
              variant="bordered"
            >
              <SelectItem key="my">De mis locales</SelectItem>
              <SelectItem key="all">Todos</SelectItem>
            </Select>
          </div>

          {/* Table */}
          <Table
            aria-label="Tabla de usuarios"
            sortDescriptor={sortDescriptor}
            onSortChange={(descriptor) =>
              setSortDescriptor({
                column: descriptor.column as string,
                direction: descriptor.direction as "ascending" | "descending",
              })
            }
            removeWrapper
          >
            <TableHeader>
              <TableColumn key="name" allowsSorting>
                Nombre
              </TableColumn>
              <TableColumn key="email" allowsSorting>
                Email
              </TableColumn>
              <TableColumn key="workplace" allowsSorting>
                Centros de trabajo
              </TableColumn>
              <TableColumn key="role" allowsSorting>
                Roles
              </TableColumn>
              <TableColumn key="system" allowsSorting>
                Sistema
              </TableColumn>
              <TableColumn key="actions">Acción</TableColumn>
            </TableHeader>
            <TableBody items={sortedUsers}>
              {(user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.workplace}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.role}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.system}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* New User Panel */}
      <NewUserPanel
        isOpen={isNewUserPanelOpen}
        onClose={() => setIsNewUserPanelOpen(false)}
      />

      {/* Delete Modal */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userName={selectedUser?.name || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
