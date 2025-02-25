import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// TODO: To restore multi-language support:
// 1. Change "/(pl)/:path*" back to "/(de|en|pl)/:path*"
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Temporarily only allow Polish language
    "/(pl)/:path*",
    // "(de|en|pl)" temporarily removed other languages

    // Enable locale redirects for everything EXCEPT /api, /admin, /_next, /_vercel, or files
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
  ],
};

// TODO: To restore multi-language support:
// 1) Change "/(pl)/:path*" back to "/(de|en|pl)/:path*"
// 2) This will allow multiple locale segments again
