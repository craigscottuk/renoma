// cSpell:disable
"use client";

import NavigationLinkItem from "./navigation-link-item";
import { useNavItems } from "@/lib/navItems";
import { useState, useCallback } from "react";
import { StaticRoutePaths } from "@/lib/routes";

export default function MainNavigation() {
  const navItems = useNavItems();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isAnyHovered = hoveredIndex !== null;

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  return (
    <nav className="hidden w-full items-end justify-between gap-x-1 uppercase lg:flex lg:max-w-[800px] lg:gap-x-2 lg:pl-10 xl:max-w-[1000px] xl:gap-x-3">
      {navItems.map((item, index) => {
        const { link, label } = item;
        return (
          <NavigationLinkItem
            className="whitespace-nowrap px-0.5 text-[0.85rem] tracking-[0.03em] lg:px-1 lg:text-[0.95rem] xl:text-base"
            key={index}
            href={link as StaticRoutePaths}
            isHovered={hoveredIndex === index}
            isAnyHovered={isAnyHovered}
            onHover={(hovered) => handleHover(hovered ? index : null)}
          >
            {label}
          </NavigationLinkItem>
        );
      })}
    </nav>
  );
}
