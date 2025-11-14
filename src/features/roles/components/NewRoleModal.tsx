"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Checkbox,
  Avatar,
} from "@heroui/react";
import { Search } from "lucide-react";
import { mockUsersForAssignment } from "../data/mockData";

interface NewRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewRoleModal({ isOpen, onClose }: NewRoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsersForAssignment.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleCreate = () => {
    // Aquí iría la lógica de creación
    console.log("Creando cargo:", roleName, "Usuarios:", selectedUsers);
    onClose();
    setRoleName("");
    setSelectedUsers([]);
    setSearchQuery("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">Nuevo cargo</h3>
        </ModalHeader>
        <ModalBody className="gap-4 overflow-x-hidden">
          <Input
            label="Nombre del cargo"
            labelPlacement="outside"
            placeholder="Escribir nombre del cargo"
            variant="bordered"
            isRequired
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />

          <div className="space-y-2 min-w-0">
            <label
              htmlFor="search-users"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Añadir usuario
            </label>
            <Card className="border border-zinc-200 dark:border-zinc-800 shadow-none">
              <CardBody className="p-4 space-y-3">
                <Input
                  id="search-users"
                  placeholder="Buscar usuarios"
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="max-h-64 overflow-y-auto overflow-x-hidden space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar
                          name={user.name}
                          size="sm"
                          className="shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.name}
                        </span>
                      </div>
                      <Checkbox
                        isSelected={selectedUsers.includes(user.id)}
                        onValueChange={() => handleUserToggle(user.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleCreate}
            isDisabled={!roleName.trim()}
          >
            Crear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
