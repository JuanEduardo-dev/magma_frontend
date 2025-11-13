export const ROUTES = {
  // Auth
  LOGIN: "/login",

  // Features
  PETICIONES: "/peticiones",
  PERSONAL: "/personal",
  DEPARTAMENTOS: "/departamentos",
  FORMULARIOS: "/formularios",
  HORARIOS: "/horarios",

  // Main
  HOME: "/",
} as const;

export type RouteKey = keyof typeof ROUTES;
