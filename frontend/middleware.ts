import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/admin/login",
  "/mentor/login",
  "/intern/login",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/assets",
  "/public",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  console.log(accessToken);

  const validateToken = async (token: string | undefined) => {
    if (!token) return { valid: false, role: null };

    try {
      const response = await fetch(`http://localhost:8000/api/validate-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return {
        valid: response.ok && data.valid,
        role: data.user?.role || null,
      };
    } catch (error) {
      console.error("Token validation failed:", error);
      return { valid: false, role: null };
    }
  };

  const { valid, role } = await validateToken(accessToken);
  console.log(valid);

  if (!valid) {
    if (pathname.startsWith("/intern")) {
      return NextResponse.redirect(new URL("/intern/login", request.url));
    } else if (pathname.startsWith("/mentor")) {
      return NextResponse.redirect(new URL("/mentor/login", request.url));
    } else if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/intern/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path((?!login$).*)",
    "/mentor/:path((?!login$).*)",
    "/intern/:path((?!login$).*)",
  ],
};
