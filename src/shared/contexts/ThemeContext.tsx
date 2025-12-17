/**
 * Este archivo solo re-exporta next-themes para mantener
 * compatibilidad con imports existentes.
 *
 * next-themes maneja automáticamente:
 * - Sin flash en la carga
 * - Sincronización entre pestañas
 * - Preferencia del sistema
 * - localStorage
 */

export { useTheme } from "next-themes";
export { ThemeProvider } from "next-themes";
