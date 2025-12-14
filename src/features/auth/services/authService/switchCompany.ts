import { axiosInstance } from "@/shared/services/axiosInstance";
import type { SwitchCompanyResponse } from "./types";

export const switchCompany = async (
  companyId: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
  permissions: string[];
  companies?: { id: string; name: string }[];
  defaultCompanyId?: string | null;
}> => {
  const { data } = await axiosInstance.post<SwitchCompanyResponse>(
    "/auth/switch-company",
    {},
    {
      headers: {
        "x-company-id": companyId,
      },
    },
  );

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    permissions: data.permissions,
    companies: data.companies,
    defaultCompanyId: data.defaultCompanyId,
  };
};
