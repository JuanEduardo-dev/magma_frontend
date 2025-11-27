import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, days = 7) => {
  if (typeof window === "undefined") return;
  Cookies.set(name, value, { expires: days, path: "/", sameSite: "lax" });
};

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  return Cookies.get(name) || null;
};

export const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;
  Cookies.remove(name, { path: "/" });
};
