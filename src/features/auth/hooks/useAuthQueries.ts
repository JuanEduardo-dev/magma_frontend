import { authStore } from "../store/authStore";
import { login } from "../services/authService/login";
import { logout } from "../services/authService/logout";
import { switchCompany } from "../services/authService/switchCompany";
import type { LoginCredentials } from "../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/shared/constants/routes";

export const useAuthQueries = () => {
  const queryClient = useQueryClient();
  const {
    userInfo,
    getUserFromToken,
    getIsAuthenticated,
    isLoading,
    error,
    setTokens,
    clearAuth,
    setIsLoading,
    setError,
    companies,
    currentCompanyId,
    setCurrentCompanyId,
  } = authStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: async (data) => {
      setTokens(
        data.accessToken,
        data.refreshToken,
        data.companies,
        data.defaultCompanyId,
      );
      setIsLoading(false);
    },
    onError: (error: Error | unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
      setIsLoading(false);
    },
  });

  // Switch company mutation
  const switchCompanyMutation = useMutation({
    mutationFn: (companyId: string) => switchCompany(companyId),
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: async (data) => {
      setTokens(
        data.accessToken,
        data.refreshToken,
        data.companies,
        data.defaultCompanyId,
      );
      setCurrentCompanyId(data.defaultCompanyId || "");
      setIsLoading(false);
    },
    onError: (error: Error | unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Error al cambiar de empresa";
      setError(errorMessage);
      setIsLoading(false);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Capturar el token AHORA, antes de que sea borrado
      const currentToken = authStore.getState().accessToken;
      return logout(currentToken || undefined);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      setIsLoading(false);
      window.location.href = ROUTES.LOGIN;
    },
    onError: (error: Error | unknown) => {
      console.error("Error during logout:", error);
      clearAuth();
      queryClient.clear();
      setIsLoading(false);
    },
  });

  const handleLogin = async (credentials: LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const handleSwitchCompany = async (companyId: string) => {
    return switchCompanyMutation.mutateAsync(companyId);
  };

  const handleLogout = async () => {
    return logoutMutation.mutateAsync();
  };

  const user = userInfo || getUserFromToken();

  return {
    user,
    isAuthenticated: getIsAuthenticated(),
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      logoutMutation.isPending ||
      switchCompanyMutation.isPending,
    error,
    login: handleLogin,
    logout: handleLogout,
    switchCompany: handleSwitchCompany,
    companies,
    currentCompanyId,
  };
};
