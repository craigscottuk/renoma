"use client";

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

type NavItem = {
  label: string;
  link: string;
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

export default function SideNavigation({ navItems }: { navItems: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 top-4 z-50 xl:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0 sm:w-[400px]">
        <SheetHeader className="p-4">
          <SheetTitle className="mb-6 text-2xl font-bold">Menu</SheetTitle>
          <SheetClose asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4"
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
