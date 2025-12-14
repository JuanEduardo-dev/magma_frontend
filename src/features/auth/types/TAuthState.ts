import type { IUser, Company } from "./IUser";

export interface TAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  userInfo: IUser | null;
  companies: Company[] | null;
  defaultCompanyId: string | null;
  currentCompanyId: string | null;

  setTokens: (
    accessToken: string,
    refreshToken?: string,
    companies?: Company[],
    defaultCompanyId?: string | null,
  ) => void;
  clearAuth: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setUserInfo: (userInfo: IUser) => void;
  setCurrentCompanyId: (companyId: string) => void;
  getUserFromToken: () => IUser | null;
  getIsAuthenticated: () => boolean;
}
