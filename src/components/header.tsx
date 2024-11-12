import Image from "next/image";
import LocaleSwitcher from "./navigation/locale-switcher";
import MainNavigation from "./navigation/main-navigation";
import MaxWidthWrapper from "./max-width-wrapper";
import SideNavigation from "./navigation/side-navigation";
import { Link } from "@/i18n/routing";

export default function Header() {
  return (
    <header className="fixed left-0 z-30 h-24 w-[100vw] bg-white">
      <MaxWidthWrapper className="h-full">
        <div className="flex h-full w-full items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              className="h-[65px]"
              src="/renoma-logo.svg"
              alt="Renoma PKZ"
              width={180}
              height={65}
            />
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
