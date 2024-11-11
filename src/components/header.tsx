import LocaleSwitcher from "./locale-switcher";
import MainNavigation from "./main-navigation";
import MaxWidthWrapper from "./max-width-wrapper";
import SideNavigation from "./side-navigation";
import { Link } from "@/i18n/routing";

export default function Header() {
  return (
    <header className="fixed left-0 z-30 h-24 w-[100vw] bg-blue-200">
      <MaxWidthWrapper>
        <div className="relative flex w-full">
          {/* Logo */}
          <Link href="/">
            <img className="h-[65px]" src="/renoma-logo.svg" alt="Renoma PKZ" />
          </Link>

          {/* Nav Items */}
          <div className="ml-auto flex items-end">
            <MainNavigation />
            {/* Locale Switcher */}
            <LocaleSwitcher className="hidden xl:flex" />
            {/* Side Navigation */}
            <SideNavigation />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
