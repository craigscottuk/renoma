import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Link } from "@/i18n/routing";
import { RoutePaths } from "@/lib/routes";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  variant?: "light" | "dark";
  href?: RoutePaths;
}

export default function CustomButton({
  children,
  onClick,
  className = "",
  ariaLabel,
  variant = "light",
  href,
}: ButtonProps) {
  const defaultClasses =
    "group inline-flex items-center text-base transition-opacity";
  const lightClasses = "text-black border-black hover:text-black";
  const darkClasses = "text-white border-white hover:text-white";

  const buttonContent = (
    <div className="mt-16 flex w-full">
      <span
        className={clsx(
          "relative mr-3 flex items-center uppercase tracking-[0.045em] group-hover:text-current md:mr-4",
        )}
        style={{ userSelect: "none" }}
      >
        {children}
        <span
          className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-current transition-transform duration-300 group-hover:scale-x-100"
          style={{ transformOrigin: "left" }}
        ></span>
      </span>
      <div
        className={clsx(
          "flex h-10 w-8 items-center justify-center border border-current p-2 transition-colors delay-200 duration-200 group-hover:delay-0",
          variant === "light"
            ? "group-hover:bg-black group-hover:text-white"
            : "group-hover:bg-white group-hover:text-black",
        )}
      >
        <ChevronRight className="transform transition-transform" />
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      className={clsx(
        defaultClasses,
        variant === "light" ? lightClasses : darkClasses,
        className,
      )}
      style={{ userSelect: "none" }}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        defaultClasses,
        variant === "light" ? lightClasses : darkClasses,
        className,
      )}
      style={{ userSelect: "none" }}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
}
