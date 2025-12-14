import axios from "axios";
import { refreshTokenFn, authStore } from "@/features/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = authStore.getState();
    const token = accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "✅ Token agregado al header:",
        token.substring(0, 20) + "...",
      );
    } else {
      console.warn("⚠️ No hay token disponible para la solicitud");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para manejar errores de autenticación y refrescar tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = authStore.getState().refreshToken;

      if (refreshToken) {
        try {
          const { accessToken, refreshToken: newRefreshToken } =
            await refreshTokenFn(refreshToken);
          authStore.getState().setTokens(accessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          authStore.getState().clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        authStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);
