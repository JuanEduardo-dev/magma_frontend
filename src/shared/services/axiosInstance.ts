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
    const token = authStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
          const { accessToken } = await refreshTokenFn(refreshToken);
          authStore.getState().setTokens(accessToken, refreshToken);
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
