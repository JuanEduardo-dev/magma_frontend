import { axiosInstance } from "@/shared/services/axiosInstance";
import { authStore } from "../../store/authStore";

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout");
    authStore.getState().clearAuth();
  } catch (error) {
    console.error("Error during logout:", error);
    authStore.getState().clearAuth();
  }
};
