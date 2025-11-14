"use client";

import { useState } from "react";
import { Card, CardBody, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { GeneralConfigurationTab } from "../components/GeneralConfigurationTab";
import { PasswordTab } from "../components/PasswordTab";

export default function AccountManagementPage() {
  const [activeTab, setActiveTab] = useState<"general" | "password">("general");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs>
        <BreadcrumbItem href="/configuration">Configuración</BreadcrumbItem>
        <BreadcrumbItem>Gestión de cuenta</BreadcrumbItem>
      </Breadcrumbs>

      {/* Card con Tabs */}
      <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <CardBody className="p-6">
          {/* Tabs Header */}
          <div className="flex gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === "general"
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:cursor-pointer"
              }`}
            >
              Configuración general
              {activeTab === "general" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === "password"
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:cursor-pointer"
              }`}
            >
              Contraseña
              {activeTab === "password" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Tabs Content */}
          <div>
            {activeTab === "general" ? (
              <GeneralConfigurationTab />
            ) : (
              <PasswordTab />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
