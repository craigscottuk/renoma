"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { StaticRoutePaths } from "@/lib/routes";
import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavigationLinkItemProps {
  href: StaticRoutePaths;
  children: ReactNode;
  className?: string;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: (hovered: boolean) => void;
}

export default function NavigationLinkItem({
  href,
  children,
  className,
  isHovered,
  isAnyHovered,
  onHover,
}: NavigationLinkItemProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition-colors duration-200 ease-in-out",
        isActive
          ? "text-gold-800 underline decoration-gold-800 decoration-1 underline-offset-8"
          : isHovered
            ? "text-gold-800"
            : isAnyHovered
              ? "text-zinc-400"
              : "text-zinc-950 hover:text-zinc-950",
        className,
      )}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <span className="block transform transition-all duration-200 ease-in-out">
        {children}
      </span>
    </Link>
  );
}
