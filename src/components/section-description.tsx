import clsx from "clsx";

interface SectionDescriptionProps {
  description: string;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
  textColor?: "black" | "white";
  textAlign?: "left" | "right";
  marginTop?: boolean;
  textStyle?: "text-wrap" | "text-balance" | "text-normal";
}

export default function SectionDescription({
  description,
  className,
  motionPreset = "blur-right",
  textColor = "black",
  textAlign = "left",
  marginTop = false,
  textStyle = "text-balance",
}: SectionDescriptionProps) {
  const textColorClass =
    textColor === "black" ? "text-black/90" : "text-white/90";

  return (
    <div
      className={clsx(marginTop && "mt-10", `motion-preset-${motionPreset}`)}
    >
      <p
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
      </p>
    </div>
  );
}
