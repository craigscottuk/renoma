"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "@/i18n/routing";

export default function NavigationLink({
  href,
  className,
  isHovered,
  isAnyHovered,
  onHover,
  ...rest
}: ComponentProps<typeof Link> & {
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "group motion-preset-blur-up inline-block py-0.5 uppercase leading-none tracking-[0.04em] antialiased transition-colors duration-300 ease-in-out",
        className,
        isActive
          ? "text-gold-800 underline decoration-gold-800 decoration-1 underline-offset-8"
          : isHovered
            ? "text-gold-800"
            : isAnyHovered
              ? "text-zinc-400"
              : "text-zinc-950 hover:text-zinc-950",
      )}
      href={href}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      {...rest}
    >
      <span className="relative">
        {rest.children}
        {!isActive && (
          <span className="absolute inset-x-0 -bottom-1 h-px w-0 bg-current transition-all group-hover:w-full" />
        )}
      </span>
    </Link>
  );
}
