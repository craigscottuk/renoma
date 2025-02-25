"use client";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

interface SectionDescriptionProps {
  description: string;
  className?: string;
  motionPreset?: "blur-right" | "blur-left" | "blur-up";
  textColor?: "black" | "white";
  textAlign?: "left" | "right";
  marginTop?: boolean;
  textStyle?: "text-wrap" | "text-balance" | "text-normal" | "";
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
  textStyle = "",
  animateOnView = false,
  delay = 0.2,
}: SectionDescriptionProps) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView,
    threshold: 0.6,
    once: true,
  });

  const textColorClass =
    textColor === "black" ? "text-zinc-950/90" : "text-zinc-100/90";

  const createMotionVariants = (additionalDelay = 0): Variants => {
    const presetDirection =
      motionPreset === "blur-left" ? -3 : motionPreset === "blur-right" ? 3 : 0;
    const presetVertical = motionPreset === "blur-up" ? -3 : 0;
    return {
      hidden: {
        opacity: 0,
        filter: animateOnView ? "blur(2px)" : "none",
        x: animateOnView ? presetDirection : 0,
        y: animateOnView ? presetVertical : 0,
      },
      visible: {
        opacity: 1,
        filter: animateOnView ? "blur(0px)" : "none",
        x: 0,
        y: 0,
        transition: { duration: 0.5, delay: delay + additionalDelay },
      },
    };
  };

  const descriptionVariants = createMotionVariants();
  const finalDescription = fixPolishOrphans(description);

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
          "max-w-md text-[0.95rem] leading-relaxed lg:text-[1.1rem]",
          textColorClass,
          textAlign,
          textStyle,
          className,
          "lg:max-w-[32rem]",
        )}
      >
        {finalDescription}
      </motion.p>
    </div>
  );
}
