"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/contexts/ThemeContext";
import { UserDropdown } from "./UserDropdown";
import { ChangeCompanyModal } from "./ChangeCompanyModal";

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
}

export function TopBar({
  title = "",
  userName = "Junior García",
  userRole = "Software Engineer",
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Buscar"
            classNames={{
              base: "w-[320px]",
              inputWrapper:
                "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
            }}
            startContent={<Search className="w-4 h-4 text-zinc-500" />}
          />

          {/* Icons */}
          <button
            type="button"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>

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

          <button
            type="button"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors relative"
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
