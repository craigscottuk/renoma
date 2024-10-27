import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en|pl)/:path*',

    // Enable redirects that add missing locales,
    // but exclude the `/admin` path
    '/((?!_next|_vercel|admin|.*\\..*).*)',
  ],
};
