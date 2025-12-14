import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TAuthState } from "../types/TAuthState";
import { getUserFromToken, isTokenExpired } from "../helpers/authHelpers";
import { setCookie, deleteCookie, getCookie } from "../helpers/cookieHelpers";
import type { IUser, Company } from "../types/IUser";

export const authStore = create<TAuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      userInfo: null,
      companies: null,
      defaultCompanyId: null,
      currentCompanyId: null,

      setTokens: (
        accessToken: string,
        refreshToken?: string,
        companies?: Company[],
        defaultCompanyId?: string | null,
      ) => {
        const userInfo = accessToken ? getUserFromToken(accessToken) : null;

        // Guardar en cookies para que el middleware pueda acceder
        setCookie("accessToken", accessToken);
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }

        const currentCompanyId = defaultCompanyId || companies?.[0]?.id || null;

        if (refreshToken !== undefined) {
          set({
            accessToken,
            refreshToken,
            userInfo,
            companies: companies || null,
            defaultCompanyId: defaultCompanyId || null,
            currentCompanyId,
          });
        } else {
          set({
            accessToken,
            userInfo,
            companies: companies || null,
            defaultCompanyId: defaultCompanyId || null,
            currentCompanyId,
          });
        }
      },

      clearAuth: () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        set({
          accessToken: null,
          refreshToken: null,
          userInfo: null,
          companies: null,
          defaultCompanyId: null,
          currentCompanyId: null,
          error: null,
        });
      },

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      setUserInfo: (userInfo: IUser) => set({ userInfo }),

      setCurrentCompanyId: (companyId: string) => {
        set({ currentCompanyId: companyId });
      },

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
        companies: state.companies,
        defaultCompanyId: state.defaultCompanyId,
        currentCompanyId: state.currentCompanyId,
      }),
    },
  ),
);
