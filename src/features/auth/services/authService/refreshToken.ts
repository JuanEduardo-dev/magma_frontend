import { axiosInstance } from "@/shared/services/axiosInstance";

export interface RefreshTokenResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export const refreshTokenFn = async (
  refreshToken: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>(
    "/auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};
