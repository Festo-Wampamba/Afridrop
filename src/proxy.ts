import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: named "proxy" export replaces the old "middleware" export
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for NextAuth session cookie (edge-compatible, no heavy imports)
  const sessionCookie =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("__Secure-next-auth.session-token");

  const isLoggedIn = !!sessionCookie?.value;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/auth");

  // Already logged in → skip login page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Not logged in → redirect to login
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Only run proxy on admin and auth routes
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
