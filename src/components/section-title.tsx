"use client";
import { ElementType } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left" | "blur-up";
  textColor?: "black" | "white";
  textAlign?: "left" | "right" | "center";
  label?: string;
  animateOnView?: boolean;
  animationDirection?: "left" | "right" | "up";
  delay?: number;
  id?: string;
}

export default function SectionTitle({
  title,
  as: Tag = "h2",
  className,
  motionPreset,
  textColor = "black",
  textAlign = "left",
  label,
  animateOnView = false,
  animationDirection = "right",
  delay = 0,
  id,
}: SectionTitleProps) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView,
    threshold: 0.6,
    once: true, // Animate only once
  });

  const createMotionVariants = (additionalDelay = 0): Variants => ({
    hidden: {
      opacity: 0,
      filter: animateOnView ? "blur(2px)" : "none",
      x: animateOnView
        ? animationDirection === "right"
          ? 3
          : animationDirection === "left"
            ? -3
            : 0
        : 0,
      y: animateOnView && animationDirection === "up" ? 3 : 0,
    },
    visible: {
      opacity: 1,
      filter: animateOnView ? "blur(0px)" : "none",
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
        "max-w-[22rem] sm:max-w-[33rem] md:max-w-[36rem] lg:max-w-[43rem]",
        textAlign === "center" && "mx-auto",
      )}
      aria-label={label || title}
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
              textColor === "black" ? "text-zinc-950/90" : "text-zinc-100/90",
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
          id={id}
          className={clsx(
            `motion-preset-${motionPreset}`,
            "text-balance text-[2.75rem] font-light leading-[1.06] md:text-[3rem] md:leading-[1.06] lg:text-6xl",
            className,
            textColor === "black" ? "text-zinc-950" : "text-zinc-100",
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
