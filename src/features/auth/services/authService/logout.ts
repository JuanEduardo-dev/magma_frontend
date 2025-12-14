import { authStore } from "../../store/authStore";

export interface LogoutResponse {
  message: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const logout = async (token?: string): Promise<void> => {
  try {
    // Si no se pasa el token, intentamos obtenerlo del store
    const accessToken = token || authStore.getState().accessToken;

    console.log("🔑 Logout - Token disponible:", !!accessToken);

    if (!accessToken) {
      console.warn("⚠️ No token available, clearing auth locally");
      authStore.getState().clearAuth();
      return;
    }

    // Hacer la solicitud con fetch para garantizar que el token se envíe
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Logout error response:", errorData);
    }

    authStore.getState().clearAuth();
  } catch (error) {
    console.error("Error during logout:", error);
    // Limpiar auth incluso si falla el logout
    authStore.getState().clearAuth();
  }
};
