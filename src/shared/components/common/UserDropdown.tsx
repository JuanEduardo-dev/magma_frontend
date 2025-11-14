"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { User, Building2, LogOut, UserCog } from "lucide-react";

interface UserDropdownProps {
  userName: string;
  userRole: string;
  onChangeCompany: () => void;
}

export function UserDropdown({
  userName,
  userRole,
  onChangeCompany,
}: UserDropdownProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg p-2 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden">
            <User className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium leading-tight text-zinc-900 dark:text-zinc-100">
              {userName}
            </p>
            <p className="text-[#797979] text-xs leading-tight">{userRole}</p>
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem
          key="profile"
          startContent={<UserCog className="w-4 h-4" />}
          className="text-zinc-700 dark:text-zinc-300"
        >
          Editar perfil
        </DropdownItem>
        <DropdownItem
          key="company"
          startContent={<Building2 className="w-4 h-4" />}
          onPress={onChangeCompany}
          className="text-zinc-700 dark:text-zinc-300"
        >
          Cambiar de empresa
        </DropdownItem>
        <DropdownItem
          key="logout"
          startContent={<LogOut className="w-4 h-4" />}
          className="text-danger"
          color="danger"
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
