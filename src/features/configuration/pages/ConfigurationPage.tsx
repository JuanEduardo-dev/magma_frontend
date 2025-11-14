"use client";

import { ConfigurationCard } from "../components/ConfigurationCard";
import type { ConfigurationOption } from "../types";
import accountIcon from "@/assets/icons/configuration/config-1.svg";
import usersIcon from "@/assets/icons/configuration/config-2.svg";
import rolesIcon from "@/assets/icons/configuration/config-3.svg";

export default function ConfigurationPage() {
  const configurationOptions: ConfigurationOption[] = [
    {
      id: "account",
      title: "Gestión de cuenta",
      description:
        "Actualiza tu información personal, cambia tu contraseña y configura tus preferencias de seguridad.",
      icon: accountIcon,
      href: "/configuration/account",
    },
    {
      id: "users",
      title: "Gestión de usuarios",
      description:
        "Administra la información de tus empleados. Crea, edita o desactiva perfiles de usuario individuales.",
      icon: usersIcon,
      href: "/configuration/users",
    },
    {
      id: "roles",
      title: "Gestión de cargos",
      description:
        "Establece la estructura jerárquica de tu empresa. Crea, edita y asigna los cargos o puestos de trabajo a los empleados.",
      icon: rolesIcon,
      href: "/configuration/roles",
    },
  ];

  return (
    <div className="w-full max-w-3xl space-y-4">
      {configurationOptions.map((option) => (
        <ConfigurationCard key={option.id} option={option} />
      ))}
    </div>
  );
}
