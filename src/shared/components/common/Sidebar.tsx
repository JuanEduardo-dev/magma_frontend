"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ShieldCheck,
  DollarSign,
  Gift,
  FolderOpen,
  Package,
  Shield,
  Cog,
  ChevronDown,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import { ROUTES } from "@/shared/constants/routes";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  href?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  className?: string;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export function Sidebar({
  className = "",
  isMobileMenuOpen = false,
  onCloseMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(["rrhh"]);

  const menuStructure: { category: string; items: MenuItem[] }[] = [
    {
      category: "Operación",
      items: [
        {
          id: "inicio",
          label: "Inicio",
          icon: LayoutDashboard,
          href: ROUTES.HOME,
        },
        {
          id: "eventos",
          label: "Eventos y tickets",
          icon: CalendarCheck,
          href: "#",
        },
        {
          id: "validacion",
          label: "Validación de accesos",
          icon: ShieldCheck,
          href: "#",
        },
      ],
    },
    {
      category: "BackOffice",
      items: [
        {
          id: "rrhh",
          label: "RRHH",
          icon: Users,
          children: [
            {
              id: "departments",
              label: "Departamentos",
              href: ROUTES.DEPARTMENTS,
            },
            {
              id: "forms",
              label: "Formularios",
              href: ROUTES.FORMS,
            },
            { id: "staff", label: "Personal", href: ROUTES.STAFF },
            { id: "schedules", label: "Horarios", href: ROUTES.SCHEDULES },
            { id: "requests", label: "Peticiones", href: ROUTES.REQUESTS },
          ],
        },
        {
          id: "tesoreria",
          label: "Tesorería y facturación",
          icon: DollarSign,
          href: "#",
        },
        { id: "fidelidad", label: "Fidelidad", icon: Gift, href: "#" },
        { id: "dms", label: "DMS / Formulario", icon: FolderOpen, href: "#" },
      ],
    },
    {
      category: "Operaciones avanzadas",
      items: [
        { id: "stock", label: "Stock y compras", icon: Package, href: "#" },
      ],
    },
    {
      category: "Plataforma",
      items: [
        {
          id: "seguridad",
          label: "Seguridad y auditoria",
          icon: Shield,
          href: "#",
        },
        {
          id: "configuration",
          label: "Configuración",
          icon: Cog,
          href: ROUTES.CONFIGURATION,
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const Icon = item.icon;
    const isActive = item.href ? pathname === item.href : false;
    const isExpanded = expandedSections.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    const handleNavigation = () => {
      // Cerrar el menú móvil al navegar
      if (onCloseMobileMenu) {
        onCloseMobileMenu();
      }
    };

    const buttonContent = (
      <>
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon className="w-5 h-5" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-current" />
          )}
          <span className="text-sm">{item.label}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        )}
      </>
    );

    const buttonClasses = `flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors ${
      level > 0 ? "pl-12" : ""
    } ${isActive ? "bg-zinc-200 dark:bg-zinc-700" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`;

    return (
      <div key={item.id}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggleSection(item.id)}
            className={buttonClasses}
          >
            {buttonContent}
          </button>
        ) : (
          <Link
            href={item.href || "#"}
            className={buttonClasses}
            onClick={handleNavigation}
          >
            {buttonContent}
          </Link>
        )}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onCloseMobileMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCloseMobileMenu?.();
            }
          }}
          aria-label="Cerrar menú"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-zinc-950 h-screen flex flex-col border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto
        fixed lg:relative
        w-64 lg:w-auto
        transition-transform duration-300 ease-in-out lg:transition-none
        z-50 lg:z-auto
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${className}`}
      >
        {/* Logo Header */}
        <div className="relative shrink-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          {/* Mobile Close Button
          <button
            type="button"
            onClick={onCloseMobileMenu}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>*/}

          <div className="flex flex-col items-center justify-center px-6 py-7 gap-2.5">
            <Logo />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm text-nowrap whitespace-pre">
              Sistema de gestión
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          {menuStructure.map((section) => (
            <div key={section.category} className="py-4">
              <div className="px-6 mb-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                  {section.category}
                </p>
              </div>
              <nav className="flex flex-col gap-1 px-2">
                {section.items.map((item) => renderMenuItem(item))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
