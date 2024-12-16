import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { StaticRoutePaths } from "@/lib/routes";

interface AnimatedLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  showArrow?: boolean;
  target?: "_self" | "_blank";
}

export default function AnimatedLink({
  href,
  onClick,
  children,
  className = "",
  variant = "light",
  showArrow = true,
  target = "_self",
}: AnimatedLinkProps) {
  const lightClasses = "text-black";
  const darkClasses = "text-white";

  const commonClasses = clsx(
    "group inline-flex items-center gap-2 text-[1.1rem]",
    variant === "light" ? lightClasses : darkClasses,
    className,
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={commonClasses}>
        <span className="relative">
          {children}
          <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-current transition-all group-hover:w-full" />
        </span>
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <Link
      href={href as StaticRoutePaths}
      className={commonClasses}
      target={target}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-current transition-all group-hover:w-full" />
      </span>
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
