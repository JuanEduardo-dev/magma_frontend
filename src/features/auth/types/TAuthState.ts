import type { IUser } from "./IUser";

export interface TAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  userInfo: IUser | null;

  setTokens: (accessToken: string, refreshToken?: string) => void;
  clearAuth: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setUserInfo: (userInfo: IUser) => void;
  getUserFromToken: () => IUser | null;
  getIsAuthenticated: () => boolean;
}
