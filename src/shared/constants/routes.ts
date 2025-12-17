export const ROUTES = {
  // Auth
  LOGIN: "/login",

  // Features
  REQUESTS: "/requests",
  STAFF: "/staff",
  DEPARTMENTS: "/departments",
  FORMS: "/forms",
  SCHEDULES: "/schedules",
  DMS: "/dms",
  INVENTORY: "/inventory",
  CONFIGURATION: "/configuration",
  CONFIGURATION_ACCOUNT: "/configuration/account",
  CONFIGURATION_USERS: "/configuration/users",
  CONFIGURATION_ROLES: "/configuration/roles",

  // Main
  HOME: "/",
} as const;

export type RouteKey = keyof typeof ROUTES;
