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
  Avatar,
  Checkbox,
} from "@heroui/react";
import { Search } from "lucide-react";
import { mockUsersForDepartment } from "../data/mockData";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
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
    console.log("Adding members:", selectedUsers);
    setSearchQuery("");
    setSelectedUsers(new Set());
    onClose();
  };

  const handleClose = () => {
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
        <ModalHeader>Añadir integrante</ModalHeader>
        <ModalBody className="overflow-x-hidden">
          <div className="space-y-3">
            <Input
              placeholder="Buscar usuarios"
              startContent={<Search className="w-4 h-4 text-zinc-500" />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              variant="bordered"
              size="sm"
            />

            <div className="overflow-y-auto overflow-x-hidden max-h-96">
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
                    <Avatar name={user.name} src={user.avatar} size="sm" />
                    <span className="text-sm min-w-0 truncate">
                      {user.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        {selectedUsers.size > 0 && (
          <ModalFooter className="sticky bottom-0 backdrop-blur-sm bg-white/95 dark:bg-zinc-900/95 py-4">
            <Button color="primary" onPress={handleSubmit} className="w-full">
              Agregar Usuarios
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
