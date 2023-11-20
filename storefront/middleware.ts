import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token");

  if (!accessToken && request.nextUrl.pathname.includes("dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (request.nextUrl.pathname.includes("auth") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
