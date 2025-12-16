"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar } from "../components/common/Sidebar";
import { TopBar } from "../components/common/TopBar";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  userName?: string;
  userRole?: string;
}

export function MainLayout({
  children,
  title,
  userName,
  userRole,
}: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Sidebar - Manages its own responsive behavior */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content - Full width on mobile, flexible on desktop */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        {/* TopBar */}
        <TopBar
          title={title}
          userName={userName}
          userRole={userRole}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900 p-4 lg:p-6 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
