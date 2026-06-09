import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: named "proxy" export replaces the old "middleware" export
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session cookie (edge-compatible, no heavy imports)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");

  const isLoggedIn = !!sessionCookie?.value;
  const isAuthRoute = pathname.startsWith("/auth");
  // Protected areas. The cookie only proves *a* session exists; server layouts
  // remain the authoritative per-role identity check (defense-in-depth).
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/manager") ||
    pathname.startsWith("/attendant");

  // Already logged in → leave the login page. Role-correct home is resolved by
  // the login page after sign-in; "/" is a safe neutral landing for any role.
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged in → bounce protected areas to login.
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Only run proxy on protected and auth routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/manager/:path*",
    "/attendant/:path*",
    "/auth/:path*",
  ],
};
