import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en', 'de'],
  defaultLocale: 'pl',
  // pathnames: {
  //   '/': '/',
  //   '/pathnames': {
  //     en: '/pathnames',
  //     de: '/pfadnamen',
  //     pl: '/pathnamepl',
  //   },
  // },
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
