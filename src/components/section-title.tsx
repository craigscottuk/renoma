"use client";
import { ElementType, useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
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
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 1.0 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animateOnView, controls]);

  const LabelTag = Tag === "h1" ? "h2" : "p";

  const labelMotionVariants: Variants = {
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
      transition: { duration: 0.5, delay: delay > 0.2 ? delay - 0.2 : 0 }, // Label appears first
    },
  };

  const titleMotionVariants: Variants = {
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
      transition: { duration: 0.5, delay }, // Use delay prop here
    },
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "max-w-[22rem] sm:max-w-[33rem] md:max-w-[43rem]",
        textAlign === "center" && "mx-auto",
      )}
    >
      {label && (
        <motion.div
          initial={animateOnView ? "hidden" : "visible"}
          animate={controls}
          variants={labelMotionVariants}
        >
          <LabelTag
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
          </LabelTag>
        </motion.div>
      )}
      <motion.div
        initial={animateOnView ? "hidden" : "visible"}
        animate={controls}
        variants={titleMotionVariants}
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
