import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grupo Magma - Sistema de Gestión",
    template: "%s | Grupo Magma",
  },
  description:
    "Sistema integral de gestión empresarial para Grupo Magma. Administra recursos humanos, departamentos, peticiones, configuración y más.",
  keywords: [
    "Grupo Magma",
    "sistema de gestión",
    "RRHH",
    "gestión empresarial",
    "administración",
  ],
  authors: [{ name: "Grupo Magma" }],
  creator: "Grupo Magma",
  publisher: "Grupo Magma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
