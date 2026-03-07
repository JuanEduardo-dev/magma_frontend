import type { IUser } from "../types/IUser";

interface FakeTokenPayload {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  exp: number;
}

// Mock token decoder - decodifica tokens falsos sin usar JWT real
export const getUserFromToken = (token: string): IUser | null => {
  try {
    // Decodificar token falso creado con btoa
    const decoded = JSON.parse(atob(token)) as FakeTokenPayload;
    return {
      id: decoded.user.id,
      permissions: ["*"], // Todos los permisos
      isActive: true,
    };
  } catch (error) {
    console.error("Error decoding fake token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    // Decodificar token falso
    const decoded = JSON.parse(atob(token)) as FakeTokenPayload;
    const currentTime = Date.now();
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding fake token:", error);
    return true;
  }
};
