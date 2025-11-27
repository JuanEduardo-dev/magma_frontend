"use client";

import { useEffect } from "react";
import { authStore } from "../store/authStore";
import { getCookie } from "../helpers/cookieHelpers";

export function useInitializeAuth() {
  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    // Si hay tokens en cookies pero no en el store, sincronizarlos
    const currentAccessToken = authStore.getState().accessToken;

    if (accessToken && !currentAccessToken) {
      authStore.getState().setTokens(accessToken, refreshToken || undefined);
    }
  }, []);
}
