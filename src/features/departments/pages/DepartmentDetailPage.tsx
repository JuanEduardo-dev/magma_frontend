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
import { Search, Plus, Trash2 } from "lucide-react";
import { mockDepartments } from "../data/mockData";
import { AddMemberModal } from "../components/AddMemberModal";
import { DeleteMemberModal } from "../components/DeleteMemberModal";

interface DepartmentDetailPageProps {
  departmentId: string;
}

export function DepartmentDetailPage({
  departmentId,
}: DepartmentDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState("");

  const department = mockDepartments.find((d) => d.id === departmentId);
  const [departmentName, setDepartmentName] = useState(department?.name || "");

  const filteredMembers =
    department?.members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const handleDeleteMember = (memberName: string) => {
    setSelectedMemberName(memberName);
    setIsDeleteMemberModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs>
        <BreadcrumbItem href="/departments">Departamentos</BreadcrumbItem>
        <BreadcrumbItem>{department?.name || "Detalle"}</BreadcrumbItem>
      </Breadcrumbs>

      {/* Search and Add Member */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <Input
          placeholder="Buscar integrante"
          startContent={<Search className="w-4 h-4 text-zinc-500" />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex-1"
          variant="bordered"
        />
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => setIsAddMemberModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Añadir integrante
        </Button>
      </div>

      {/* Department Name Input */}
      <Input
        label="Nombre de departamento"
        labelPlacement="outside"
        value={departmentName}
        onValueChange={setDepartmentName}
        variant="bordered"
        className="pt-6"
      />

      {/* Members Table */}
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table
              removeWrapper
              aria-label="Tabla de integrantes del departamento"
            >
              <TableHeader>
                <TableColumn>Integrantes del departamento</TableColumn>
                <TableColumn align="end">Eliminar</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.name)}
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
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
      />
      <DeleteMemberModal
        isOpen={isDeleteMemberModalOpen}
        onClose={() => setIsDeleteMemberModalOpen(false)}
        memberName={selectedMemberName}
      />
    </div>
  );
}
