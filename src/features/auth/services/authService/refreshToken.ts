// Mock refresh token - sin conexión al backend
export const refreshTokenFn = async (
  _refreshToken: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
  permissions: string[];
  companies?: { id: string; name: string }[];
  defaultCompanyId?: string | null;
}> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Crear nuevos tokens falsos
  const fakeAccessToken = btoa(
    JSON.stringify({
      user: {
        email: "demo@demo.com",
        name: "Usuario Demo",
        role: "admin",
        id: "1",
      },
      exp: Date.now() + 3600000, // 1 hora
    }),
  );

  const fakeRefreshToken = btoa(
    JSON.stringify({
      userId: "1",
      exp: Date.now() + 86400000, // 24 horas
    }),
  );

  return {
    accessToken: fakeAccessToken,
    refreshToken: fakeRefreshToken,
    permissions: ["*"],
    companies: [
      { id: "1", name: "Empresa Demo" },
      { id: "2", name: "Empresa Secundaria" },
    ],
    defaultCompanyId: "1",
  };
};
