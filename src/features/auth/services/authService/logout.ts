import { authStore } from "../../store/authStore";

export interface LogoutResponse {
  message: string;
}

// Mock logout - sin conexión al backend
export const logout = async (_token?: string): Promise<void> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Simplemente limpiar el estado local
  authStore.getState().clearAuth();
};
