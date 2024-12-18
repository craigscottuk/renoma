"use client";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionDescriptionProps {
  description: string;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
  textColor?: "black" | "white";
  textAlign?: "left" | "right";
  marginTop?: boolean;
  textStyle?: "text-wrap" | "text-balance" | "text-normal";
  animateOnView?: boolean;
  animationDirection?: "left" | "right" | "up";
  delay?: number;
}

export default function SectionDescription({
  description,
  className,
  motionPreset = "blur-right",
  textColor = "black",
  textAlign = "left",
  marginTop = false,
  textStyle = "text-balance",
  animateOnView = false,
  animationDirection = "right",
  delay = 0.2,
}: SectionDescriptionProps) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView,
    threshold: 0.6,
    once: true,
  });

  const textColorClass =
    textColor === "black" ? "text-zinc-950/90" : "text-zinc-100/90";

  const createMotionVariants = (additionalDelay = 0): Variants => ({
    hidden: {
      opacity: 0,
      filter:
        motionPreset === "blur-right" || motionPreset === "blur-left"
          ? "blur(2px)"
          : "blur(2px)",
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

  const descriptionVariants = createMotionVariants();

  return (
    <div
      ref={ref}
      className={clsx(marginTop && "mt-10", `motion-preset-${motionPreset}`)}
    >
      <motion.p
        initial={animateOnView ? "hidden" : "visible"}
        animate={controls}
        variants={descriptionVariants}
        className={clsx(
          "max-w-sm text-[1.1rem] leading-relaxed",
          textColorClass,
          textAlign,
          textStyle,
          className,
          "md:max-w-[30rem]",
        )}
      >
        {description}
      </motion.p>
    </div>
  );
}
