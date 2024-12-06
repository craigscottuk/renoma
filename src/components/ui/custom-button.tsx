"use client";

import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Link } from "@/i18n/routing";
import { StaticRoutePaths } from "@/lib/routes";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion, Variants } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  variant?: "light" | "dark";
  href?: StaticRoutePaths;
  animateOnView?: boolean;
  animationDirection?: "left" | "right" | "up";
  delay?: number;
}

export default function CustomButton({
  children,
  onClick,
  className = "",
  ariaLabel,
  variant = "light",
  href,
  animateOnView = false,
  animationDirection = "right",
  delay = 0.2,
}: ButtonProps) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView,
    threshold: 0.6, // Consistent threshold
    once: true, // Animate only once
  });

  const defaultClasses =
    "group inline-flex items-center text-base transition-opacity";
  const lightClasses = "text-black border-black hover:text-black";
  const darkClasses = "text-white border-white hover:text-white";

  const motionVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(3px)",
      x:
        animationDirection === "right"
          ? 5
          : animationDirection === "left"
            ? -5
            : 0,
      y: animationDirection === "up" ? 5 : 0,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay },
    },
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      initial={animateOnView ? "hidden" : "visible"}
      animate={controls}
      variants={motionVariants}
      className="mt-16 flex w-full"
    >
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
    </motion.div>
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
      aria-label={ariaLabel || `Navigate to ${href}`}
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
      aria-label={ariaLabel || "Custom Button"}
    >
      {buttonContent}
    </button>
  );
}
