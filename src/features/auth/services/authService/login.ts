import { axiosInstance } from "@/shared/services/axiosInstance";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  permissions: string[];
  refresh_token: string;
}

export const login = async (
  credentials: LoginCredentials,
): Promise<{
  accessToken: string;
  refreshToken: string;
  permissions: string[];
}> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    permissions: data.permissions,
  };
};
