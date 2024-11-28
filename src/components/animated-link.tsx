import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  showArrow?: boolean;
}

export default function AnimatedLink({
  href,
  children,
  className = "",
  variant = "light",
  showArrow = true,
}: AnimatedLinkProps) {
  const lightClasses = "text-black";
  const darkClasses = "text-white";

  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-2 text-[1.1rem]",
        variant === "light" ? lightClasses : darkClasses,
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-current transition-all group-hover:w-full" />
      </span>
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
