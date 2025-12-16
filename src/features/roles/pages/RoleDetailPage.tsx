"use client";

import { useState } from "react";
import {
  Input,
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
  Checkbox,
} from "@heroui/react";
import { mockRoleDetails } from "../data/mockData";
import type { Permission } from "../types";

interface RoleDetailPageProps {
  roleId: string;
}

export function RoleDetailPage({ roleId }: RoleDetailPageProps) {
  const roleDetail = mockRoleDetails[roleId];
  const [roleName, setRoleName] = useState(roleDetail?.name || "");
  const [permissions, setPermissions] = useState<Permission[]>(
    roleDetail?.permissions || [],
  );

  const handlePermissionChange = (
    moduleIndex: number,
    field: keyof Omit<Permission, "module" | "subModules">,
  ) => {
    setPermissions((prev) => {
      const updated = [...prev];
      updated[moduleIndex] = {
        ...updated[moduleIndex],
        [field]: !updated[moduleIndex][field],
      };
      // Si se cambia el módulo padre, actualizar todos los submódulos
      const subModules = updated[moduleIndex].subModules;
      if (subModules) {
        updated[moduleIndex].subModules = subModules.map((sub) => ({
          ...sub,
          [field]: updated[moduleIndex][field],
        }));
      }
      return updated;
    });
  };

  const handleSubModulePermissionChange = (
    moduleIndex: number,
    subModuleIndex: number,
    field: keyof Omit<Permission, "module" | "subModules">,
  ) => {
    setPermissions((prev) => {
      const updated = [...prev];
      const subModules = updated[moduleIndex].subModules;
      if (subModules) {
        const updatedSubModules = [...subModules];
        updatedSubModules[subModuleIndex] = {
          ...updatedSubModules[subModuleIndex],
          [field]: !updatedSubModules[subModuleIndex][field],
        };
        updated[moduleIndex] = {
          ...updated[moduleIndex],
          subModules: updatedSubModules,
        };
      }
      return updated;
    });
  };

  if (!roleDetail) {
    return <div>Cargo no encontrado</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs>
        <BreadcrumbItem href="/configuration">Configuración</BreadcrumbItem>
        <BreadcrumbItem href="/configuration/roles">
          Gestión de cargos
        </BreadcrumbItem>
        <BreadcrumbItem>{roleName}</BreadcrumbItem>
      </Breadcrumbs>

      {/* Role Name Input */}
      <Input
        label="Nombre del cargo"
        labelPlacement="outside"
        variant="bordered"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="pt-6"
      />

      {/* Permissions Table */}
      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table removeWrapper aria-label="Tabla de permisos">
              <TableHeader>
                <TableColumn className="w-1/3">Funcionalidades</TableColumn>
                <TableColumn className="text-center">Ver (propios)</TableColumn>
                <TableColumn className="text-center">Ver (global)</TableColumn>
                <TableColumn className="text-center">Crear</TableColumn>
                <TableColumn className="text-center">Editar</TableColumn>
                <TableColumn className="text-center">Eliminar</TableColumn>
              </TableHeader>
              <TableBody>
                {permissions.map((permission, moduleIndex) => (
                  <>
                    {/* Module Row */}
                    <TableRow key={`${permission.module}-main`}>
                      <TableCell>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {permission.module}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Checkbox
                            isSelected={permission.viewOwn}
                            onValueChange={() =>
                              handlePermissionChange(moduleIndex, "viewOwn")
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Checkbox
                            isSelected={permission.viewGlobal}
                            onValueChange={() =>
                              handlePermissionChange(moduleIndex, "viewGlobal")
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Checkbox
                            isSelected={permission.create}
                            onValueChange={() =>
                              handlePermissionChange(moduleIndex, "create")
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Checkbox
                            isSelected={permission.edit}
                            onValueChange={() =>
                              handlePermissionChange(moduleIndex, "edit")
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Checkbox
                            isSelected={permission.delete}
                            onValueChange={() =>
                              handlePermissionChange(moduleIndex, "delete")
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Sub-modules Rows */}
                    {permission.subModules?.map((subModule, subIndex) => (
                      <TableRow
                        key={`${permission.module}-${subModule.name}`}
                        className="bg-zinc-50 dark:bg-zinc-900/50"
                      >
                        <TableCell>
                          <div className="pl-6 text-sm text-gray-700 dark:text-gray-300">
                            {subModule.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox
                              isSelected={subModule.viewOwn}
                              onValueChange={() =>
                                handleSubModulePermissionChange(
                                  moduleIndex,
                                  subIndex,
                                  "viewOwn",
                                )
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox
                              isSelected={subModule.viewGlobal}
                              onValueChange={() =>
                                handleSubModulePermissionChange(
                                  moduleIndex,
                                  subIndex,
                                  "viewGlobal",
                                )
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox
                              isSelected={subModule.create}
                              onValueChange={() =>
                                handleSubModulePermissionChange(
                                  moduleIndex,
                                  subIndex,
                                  "create",
                                )
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox
                              isSelected={subModule.edit}
                              onValueChange={() =>
                                handleSubModulePermissionChange(
                                  moduleIndex,
                                  subIndex,
                                  "edit",
                                )
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox
                              isSelected={subModule.delete}
                              onValueChange={() =>
                                handleSubModulePermissionChange(
                                  moduleIndex,
                                  subIndex,
                                  "delete",
                                )
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
