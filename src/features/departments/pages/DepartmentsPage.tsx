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
  Avatar,
} from "@heroui/react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { mockDepartments } from "../data/mockData";
import type { Department } from "../types";
import { NewDepartmentModal } from "../components/NewDepartmentModal";
import { DeleteDepartmentModal } from "../components/DeleteDepartmentModal";

export function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewDepartmentModalOpen, setIsNewDepartmentModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const filteredDepartments = mockDepartments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (departmentId: string) => {
    window.location.href = `/departments/${departmentId}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <Input
          placeholder="Buscar departamento..."
          startContent={<Search className="w-4 h-4 text-zinc-500" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex-1"
          variant="bordered"
        />
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => setIsNewDepartmentModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Nuevo departamento
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table removeWrapper aria-label="Tabla de departamentos">
              <TableHeader>
                <TableColumn>Departamentos</TableColumn>
                <TableColumn>Integrantes del departamento</TableColumn>
                <TableColumn align="end">Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {department.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      {department.members.length > 0 ? (
                        <div className="flex items-center">
                          {department.members
                            .slice(0, 5)
                            .map((member, index) => (
                              <Avatar
                                key={member.id}
                                name={member.name}
                                src={member.avatar}
                                size="sm"
                                className="ring-2 ring-white dark:ring-zinc-900 pointer-events-none"
                                style={{
                                  marginLeft: index === 0 ? 0 : -8,
                                  zIndex: index,
                                }}
                              />
                            ))}
                          {department.members.length > 5 && (
                            <div
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium ring-2 ring-white dark:ring-zinc-900"
                              style={{ marginLeft: -8, zIndex: 5 }}
                            >
                              +{department.members.length - 5}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Sin integrantes
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleEdit(department.id)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(department)}
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
      <NewDepartmentModal
        isOpen={isNewDepartmentModalOpen}
        onClose={() => setIsNewDepartmentModalOpen(false)}
      />
      <DeleteDepartmentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        departmentName={selectedDepartment?.name || ""}
      />
    </div>
  );
}
