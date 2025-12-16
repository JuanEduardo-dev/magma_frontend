"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/shared/contexts/ThemeContext";
import { UserDropdown } from "./UserDropdown";
import { ChangeCompanyModal } from "./ChangeCompanyModal";

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
  onMenuClick?: () => void;
}

export function TopBar({
  title = "",
  userName = "Junior García",
  userRole = "Software Engineer",
  onMenuClick,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button + Title */}
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5 text-zinc-900 dark:text-white" />
            </button>
          )}
          <h2 className="text-lg lg:text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search Bar - Hidden on mobile */}
          <Input
            type="text"
            placeholder="Buscar"
            classNames={{
              base: "hidden md:block w-[200px] lg:w-[320px]",
              inputWrapper:
                "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
            }}
            startContent={<Search className="w-4 h-4 text-zinc-500" />}
          />

          {/* Theme Toggle - Always visible */}
          <button
            type="button"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-zinc-700" />
            ) : (
              <Sun className="w-5 h-5 text-zinc-300" />
            )}
          </button>

          {/* Notifications - Only desktop */}
          <button
            type="button"
            className="hidden sm:block p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors relative"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar */}
          <UserDropdown
            userName={userName}
            userRole={userRole}
            onChangeCompany={() => setIsCompanyModalOpen(true)}
          />
        </div>
      </div>

      {/* Change Company Modal */}
      <ChangeCompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
      />
    </div>
  );
}
