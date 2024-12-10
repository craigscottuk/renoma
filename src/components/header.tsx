import { Link } from "@/i18n/routing";
import MaxWidthWrapper from "./max-width-wrapper";
import LocaleSwitcher from "./navigation/locale-switcher";
import MainNavigation from "./navigation/main-navigation";
import SideNavigation from "./navigation/side-navigation";

export default function Header() {
  // test classes: sm:bg-slate-200 md:h-24 md:bg-slate-400 lg:bg-slate-600

  return (
    <header className="fixed left-0 z-30 h-20 w-[100vw] bg-white lg:h-24">
      <MaxWidthWrapper className="h-full">
        <div className="flex h-full w-full items-center">
          {/* Logo */}
          <Link href="/">
            <img
              className="motion-preset-blur-up-sm h-[50px] md:h-[65px]"
              src="/renoma-logo.svg"
              alt="Renoma PKZ"
            />
          </Link>

          {/* Nav Items */}
          <div className="ml-auto flex h-full items-center pt-2.5 md:pt-5">
            <MainNavigation />
            {/* Locale Switcher */}
            <LocaleSwitcher className="motion-preset-blur-up-sm hidden xl:flex" />
            {/* Side Navigation */}
            <SideNavigation />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
