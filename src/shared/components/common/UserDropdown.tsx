"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { User, Building2, LogOut, UserCog, Search, Bell } from "lucide-react";
import { useAuthContext } from "@/features/auth";

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
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };
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
          {/* Nombre y cargo solo visibles en desktop */}
          <div className="hidden sm:flex flex-col items-start">
            <p className="text-sm font-medium leading-tight text-zinc-900 dark:text-zinc-100">
              {userName}
            </p>
            <p className="text-[#797979] text-xs leading-tight">{userRole}</p>
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        {/* Información del usuario - Solo visible en móvil */}
        <DropdownSection showDivider className="sm:hidden">
          <DropdownItem
            key="user-info"
            isReadOnly
            className="opacity-100 cursor-default"
            textValue={userName}
          >
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {userName}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {userRole}
              </p>
            </div>
          </DropdownItem>
        </DropdownSection>

        {/* Acciones móvil - Solo visibles en móvil */}
        <DropdownSection showDivider className="sm:hidden">
          <DropdownItem
            key="search"
            startContent={<Search className="w-4 h-4" />}
            className="text-zinc-700 dark:text-zinc-300"
          >
            Buscar
          </DropdownItem>
          <DropdownItem
            key="notifications"
            startContent={<Bell className="w-4 h-4" />}
            className="text-zinc-700 dark:text-zinc-300"
          >
            Notificaciones
          </DropdownItem>
        </DropdownSection>

        {/* Acciones principales */}
        <DropdownSection showDivider>
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
        </DropdownSection>

        {/* Cerrar sesión */}
        <DropdownSection>
          <DropdownItem
            key="logout"
            startContent={<LogOut className="w-4 h-4" />}
            className="text-danger"
            color="danger"
            onPress={handleLogout}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
