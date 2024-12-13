"use client";

import { ElementType } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left" | "fade-in";
  textColor?: "black" | "white";
  textAlign?: "left" | "right" | "center";
  label?: string;
  animateOnView?: boolean;
  animationDirection?: "left" | "right" | "up";
  delay?: number;
}

export default function SectionTitle({
  title,
  as: Tag = "h2",
  className,
  motionPreset = "blur-right",
  textColor = "black",
  textAlign = "left",
  label,
  animateOnView = false,
  animationDirection = "right",
  delay = 0.2,
}: SectionTitleProps) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView,
    threshold: 0.6, // Ensure consistency
    once: true, // Animate only once
  });

  const createMotionVariants = (additionalDelay = 0): Variants => ({
    hidden: {
      opacity: 0,
      filter: motionPreset === "fade-in" ? "blur(2px)" : "blur(2px)",
      x:
        animationDirection === "right"
          ? 3
          : animationDirection === "left"
            ? -3
            : 0,
      y: animationDirection === "up" ? 3 : 0,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay: delay + additionalDelay },
    },
  });

  const labelVariants = createMotionVariants(-0.1); // Label appears earlier
  const titleVariants = createMotionVariants();

  return (
    <div
      ref={ref}
      className={clsx(
        "max-w-[22rem] sm:max-w-[33rem] md:max-w-[43rem]",
        textAlign === "center" && "mx-auto",
      )}
      aria-label={label || title} // Accessibility improvement
    >
      {label && (
        <motion.div
          initial={animateOnView ? "hidden" : "visible"}
          animate={controls}
          variants={labelVariants}
        >
          <p
            className={clsx(
              "mb-4 text-sm uppercase tracking-wide md:mb-6",
              textAlign === "left"
                ? "text-left"
                : textAlign === "right"
                  ? "text-right"
                  : "text-center",
            )}
          >
            {label}
          </p>
        </motion.div>
      )}
      <motion.div
        initial={animateOnView ? "hidden" : "visible"}
        animate={controls}
        variants={titleVariants}
      >
        <Tag
          className={clsx(
            `motion-preset-${motionPreset}`,
            "text-balance text-5xl font-light leading-[1.06] md:text-6xl md:leading-[1.06]",
            className,
            textColor === "black" ? "text-black" : "text-white",
            textAlign === "left"
              ? "text-left"
              : textAlign === "right"
                ? "text-right"
                : "text-center",
          )}
        >
          {title}
        </Tag>
      </motion.div>
    </div>
  );
}
