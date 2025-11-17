"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { AuthProvider } from "@/features/auth";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutos
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HeroUIProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </HeroUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
