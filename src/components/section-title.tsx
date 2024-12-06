"use client";

import { ElementType } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left"; // Consider dynamic usage or remove
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
  motionPreset = "blur-right", // Optional dynamic implementation
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
      transition: { duration: 0.5, delay: delay + additionalDelay },
    },
  });

  const labelVariants = createMotionVariants(-0.2); // Label appears earlier
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
              "mb-6 text-sm uppercase tracking-wide",
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
            `motion-preset-${motionPreset}`, // Keep for dynamic styling
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
