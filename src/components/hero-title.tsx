import { ElementType } from "react";
import clsx from "clsx";

interface HeroTitleProps {
  title: string;
  as?: ElementType;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
}

export default function HeroTitle({
  title,
  as: Tag = "h2",
  className,
  motionPreset = "blur-right",
}: HeroTitleProps) {
  return (
    <Tag
      className={clsx(
        `motion-preset-${motionPreset}`,
        "text-5xl font-light leading-[1.06] md:text-6xl",
        className,
      )}
    >
      {title}
    </Tag>
  );
}
