import { authStore } from "../store/authStore";
import { login } from "../services/authService/login";
import { logout } from "../services/authService/logout";
import type { LoginCredentials } from "../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  } = authStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: async (data) => {
      setTokens(data.accessToken, data.refreshToken);
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

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      setIsLoading(false);
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

  const handleLogout = async () => {
    return logoutMutation.mutateAsync();
  };

  const user = userInfo || getUserFromToken();

  return {
    user,
    isAuthenticated: getIsAuthenticated(),
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};
