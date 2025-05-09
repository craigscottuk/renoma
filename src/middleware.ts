import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(de|en|pl)/:path*",

    // Enable locale redirects for everything EXCEPT /api, /admin, /_next, /_vercel, or files
    "/((?!api|_next|_vercel|admin|.*\\..*|sitemap\\.xml|robots\\.txt).*)",
  ],
};
