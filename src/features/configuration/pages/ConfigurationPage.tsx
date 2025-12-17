"use client";

import { ConfigurationCard } from "../components/ConfigurationCard";
import type { ConfigurationOption } from "../types";
import {
  AccountIcon,
  UsersIcon,
  RolesIcon,
} from "../components/ConfigurationIcons";
import type { ReactElement } from "react";

export default function ConfigurationPage() {
  const configurationOptions: Array<
    Omit<ConfigurationOption, "icon"> & { icon: ReactElement }
  > = [
    {
      id: "account",
      title: "Gestión de cuenta",
      description:
        "Actualiza tu información personal, cambia tu contraseña y configura tus preferencias de seguridad.",
      icon: <AccountIcon className="text-primary" />,
      href: "/configuration/account",
    },
    {
      id: "users",
      title: "Gestión de usuarios",
      description:
        "Administra la información de tus empleados. Crea, edita o desactiva perfiles de usuario individuales.",
      icon: <UsersIcon className="text-primary" />,
      href: "/configuration/users",
    },
    {
      id: "roles",
      title: "Gestión de cargos",
      description:
        "Establece la estructura jerárquica de tu empresa. Crea, edita y asigna los cargos o puestos de trabajo a los empleados.",
      icon: <RolesIcon className="text-primary" />,
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
