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
  const isAdminRoute = pathname.startsWith("/admin");
  const isPortalRoute = pathname.startsWith("/portal");
  const isAuthRoute = pathname.startsWith("/auth");

  // Already logged in → skip login page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Not logged in → redirect protected areas to login (defense-in-depth;
  // server layouts remain the authoritative role/identity check)
  if ((isAdminRoute || isPortalRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Only run proxy on admin, portal and auth routes
export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/auth/:path*"],
};
