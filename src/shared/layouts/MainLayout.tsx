"use client";

import type { ReactNode } from "react";
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
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar */}
        <TopBar title={title} userName={userName} userRole={userRole} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
