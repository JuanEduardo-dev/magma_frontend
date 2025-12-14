"use client";

import { useAuthContext } from "../context/AuthContext";

export const useSwitchCompany = () => {
  const { switchCompany, isLoading, error, companies, currentCompanyId } =
    useAuthContext();

  const handleSwitchCompany = async (companyId: string) => {
    try {
      await switchCompany(companyId);
    } catch (err) {
      console.error("Error switching company:", err);
      throw err;
    }
  };

  return {
    switchCompany: handleSwitchCompany,
    isLoading,
    error,
    companies,
    currentCompanyId,
  };
};
