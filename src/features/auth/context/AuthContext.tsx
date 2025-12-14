"use client";

import { createContext, type ReactNode, useContext } from "react";
import { useAuthQueries } from "../hooks/useAuthQueries";
import { useInitializeAuth } from "../hooks/useInitializeAuth";
import type { LoginCredentials, Company } from "../services/authService";
import type { IUser } from "../types/IUser";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  companies: Company[] | null;
  currentCompanyId: string | null;
  login: (credentials: LoginCredentials) => Promise<unknown>;
  logout: () => Promise<void>;
  switchCompany: (companyId: string) => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useInitializeAuth(); // Inicializar auth desde cookies
  const auth = useAuthQueries();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
