"use client";
// cSpell:disable

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import clsx from "clsx";
import { RoutePaths } from "@/lib/routes";
import { useNavItems } from "@/lib/navItems";

type NavItem = {
  label: string;
  link: RoutePaths;
};

const SideNavItem = ({ item, index }: { item: NavItem; index: number }) => {
  return (
    <div
      className={`translate-x-5 transform opacity-0 transition-opacity duration-500 ease-in-out delay-[${index * 100}ms]`}
      style={{ opacity: 1, transform: "translateX(0)" }}
    >
      <a
        href={item.link}
        className="block transform px-6 py-4 text-lg font-medium text-gray-800 transition-all duration-200 ease-in-out hover:-translate-x-1 hover:bg-gray-100 hover:text-gray-500"
      >
        {item.label}
      </a>
    </div>
  );
};

export default function SideNavigation() {
  const navItems = useNavItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="z-50 mt-1 flex h-9 w-8 items-center justify-center border-black text-black hover:bg-zinc-950 hover:text-white xl:hidden"
        >
          <Menu className="min-h-5 min-w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={clsx(
          "w-5/6",
          "md:w-1/2",
          // "bg-white/10", // Use this line to position the icon
        )}
      >
        <SheetHeader className="p-4">
          <SheetTitle className="mb-6 text-2xl font-bold">Menu</SheetTitle>
          <SheetClose asChild>
            <Button
              variant="outline"
              size="icon"
              className={clsx(
                "absolute",
                "right-3",
                "top-5",
                "h-11",
                "w-10",
                // "bg-white/10", // // Use this line to position the icon
              )}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close navigation menu</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <nav className="mt-8">
          {navItems.map((item, index) => (
            <SideNavItem key={item.link} item={item} index={index} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
