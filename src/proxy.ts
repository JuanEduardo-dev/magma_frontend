import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar archivos estáticos y API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login", "/reset-password", "/verification"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  console.log("🔒 Proxy Debug:", {
    pathname,
    hasToken: !!accessToken,
    isPublicRoute,
  });

  // Si no hay token y no es ruta pública, redirigir a login
  if (!accessToken && !isPublicRoute) {
    console.log("❌ No token, redirecting to /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token y está en login, redirigir a peticiones
  if (accessToken && pathname === "/login") {
    console.log("✅ Has token, redirecting to /peticiones");
    const peticionesUrl = new URL("/requests", request.url);
    return NextResponse.redirect(peticionesUrl);
  }

  console.log("✅ Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, other static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
