import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
