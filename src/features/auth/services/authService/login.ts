import { axiosInstance } from "@/shared/services/axiosInstance";
import type { LoginCredentials, AuthResponse } from "./types";

export const login = async (
  credentials: LoginCredentials,
): Promise<{
  accessToken: string;
  refreshToken: string;
  permissions: string[];
  companies?: { id: string; name: string }[];
  defaultCompanyId?: string | null;
}> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    credentials,
  );

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    permissions: data.permissions,
    companies: data.companies,
    defaultCompanyId: data.defaultCompanyId,
  };
};
