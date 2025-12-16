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
  Avatar,
  Checkbox,
} from "@heroui/react";
import { Search } from "lucide-react";
import { mockUsersForDepartment } from "../data/mockData";

interface NewDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDepartmentModal({
  isOpen,
  onClose,
}: NewDepartmentModalProps) {
  const [departmentName, setDepartmentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const filteredUsers = mockUsersForDepartment.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserToggle = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSubmit = () => {
    console.log("Creating department:", departmentName, selectedUsers);
    setDepartmentName("");
    setSearchQuery("");
    setSelectedUsers(new Set());
    onClose();
  };

  const handleClose = () => {
    setDepartmentName("");
    setSearchQuery("");
    setSelectedUsers(new Set());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>Crear departamento</ModalHeader>
        <ModalBody className="overflow-x-hidden">
          <div className="space-y-4">
            <Input
              label="Nombre de departamento"
              labelPlacement="outside"
              placeholder="Escribir nombre de departamento"
              value={departmentName}
              onValueChange={setDepartmentName}
              variant="bordered"
            />

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Añadir usuario
              </span>
              <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-none">
                <CardBody className="p-4 space-y-3">
                  <Input
                    placeholder="Buscar usuario..."
                    startContent={<Search className="w-4 h-4 text-zinc-500" />}
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    variant="bordered"
                    size="sm"
                  />{" "}
                  <div className="overflow-y-auto overflow-x-hidden max-h-64">
                    <div className="space-y-2">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          <Checkbox
                            isSelected={selectedUsers.has(user.id)}
                            onValueChange={() => handleUserToggle(user.id)}
                          />
                          <Avatar
                            name={user.name}
                            src={user.avatar}
                            size="sm"
                          />
                          <span className="text-sm min-w-0 truncate">
                            {user.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="sticky bottom-0 backdrop-blur-sm bg-white/95 dark:bg-zinc-900/95 py-4">
          <Button variant="flat" onPress={handleClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!departmentName.trim()}
          >
            Crear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
