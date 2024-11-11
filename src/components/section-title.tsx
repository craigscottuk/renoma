import { ElementType } from "react";
import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
  textColor?: "black" | "white";
  textAlign?: "left" | "right";
  label?: string;
}

export default function HeroTitle({
  title,
  as: Tag = "h2",
  className,
  motionPreset = "blur-right",
  textColor = "black",
  textAlign = "left",
  label,
}: SectionTitleProps) {
  const LabelTag = Tag === "h1" ? "h2" : "p";

  return (
    <div className="max-w-[22rem] sm:max-w-[33rem] md:max-w-[43rem]">
      {label && (
        <LabelTag
          className={clsx(
            "mb-6 text-sm uppercase tracking-wide",
            textAlign === "left" ? "text-left" : "text-right",
          )}
        >
          {label}
        </LabelTag>
      )}
      <Tag
        className={clsx(
          `motion-preset-${motionPreset}`,
          "text-balance text-5xl font-light leading-[1.06] md:text-6xl md:leading-[1.06]",
          className,
          textColor === "black" ? "text-black" : "text-white",
          textAlign === "left" ? "text-left" : "text-right",
        )}
      >
        {title}
      </Tag>
    </div>
  );
}
