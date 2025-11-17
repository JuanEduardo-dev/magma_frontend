import { jwtDecode } from "jwt-decode";
import type { IUser } from "../types/IUser";

interface JWTPayload {
  id: string;
  permissions: string[];
  isActive: boolean;
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): IUser | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return {
      id: decoded.id,
      permissions: decoded.permissions,
      isActive: decoded.isActive,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
