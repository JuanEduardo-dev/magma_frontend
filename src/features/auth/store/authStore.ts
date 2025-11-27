import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TAuthState } from "../types/TAuthState";
import { getUserFromToken, isTokenExpired } from "../helpers/authHelpers";
import { setCookie, deleteCookie, getCookie } from "../helpers/cookieHelpers";
import type { IUser } from "../types/IUser";

export const authStore = create<TAuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      userInfo: null,

      setTokens: (accessToken: string, refreshToken?: string) => {
        const userInfo = accessToken ? getUserFromToken(accessToken) : null;

        // Guardar en cookies para que el middleware pueda acceder
        setCookie("accessToken", accessToken);
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }

        if (refreshToken !== undefined) {
          set({ accessToken, refreshToken, userInfo });
        } else {
          set({ accessToken, userInfo });
        }
      },

      clearAuth: () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        set({
          accessToken: null,
          refreshToken: null,
          userInfo: null,
          error: null,
        });
      },

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      setUserInfo: (userInfo: IUser) => set({ userInfo }),

      getUserFromToken: () => {
        const { accessToken } = get();
        if (!accessToken) return null;
        return getUserFromToken(accessToken);
      },

      getIsAuthenticated: () => {
        const { accessToken } = get();
        const cookieToken = getCookie("accessToken");
        const token = accessToken || cookieToken;
        return !!token && !isTokenExpired(token);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userInfo: state.userInfo,
      }),
    },
  ),
);
