import type { LoginCredentials } from "./types";

// Mock login - acepta cualquier credencial sin validar contra backend
export const login = async (
  credentials: LoginCredentials,
): Promise<{
  accessToken: string;
  refreshToken: string;
  permissions: string[];
  companies?: { id: string; name: string }[];
  defaultCompanyId?: string | null;
}> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Crear un token falso con información básica del usuario
  const fakeUser = {
    email: credentials.email,
    name: "Usuario Demo",
    role: "admin",
    id: "1",
  };

  // Token JWT falso (no es un JWT real, solo para almacenar)
  const fakeAccessToken = btoa(
    JSON.stringify({
      user: fakeUser,
      exp: Date.now() + 3600000, // 1 hora
    }),
  );

  const fakeRefreshToken = btoa(
    JSON.stringify({
      userId: fakeUser.id,
      exp: Date.now() + 86400000, // 24 horas
    }),
  );

  return {
    accessToken: fakeAccessToken,
    refreshToken: fakeRefreshToken,
    permissions: ["*"], // Todos los permisos
    companies: [
      { id: "1", name: "Empresa Demo" },
      { id: "2", name: "Empresa Secundaria" },
    ],
    defaultCompanyId: "1",
  };
};
