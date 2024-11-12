interface SectionDescriptionProps {
  description: string;
  className?: string;
  motionPreset?: "blur-right" | "blur-left";
  textColor?: "black" | "white";
  textAlign?: "left" | "right";
  marginTop?: boolean;
}

export default function SectionDescription({
  description,
  className,
  motionPreset,
  textColor = "black",
  textAlign = "left",
  marginTop = false,
}: SectionDescriptionProps) {
  const textColorClass =
    textColor === "black" ? "text-black/90" : "text-white/90";

  return (
    <div className={`${marginTop ? "mt-10" : ""}`}>
      <p
        className={`max-w-sm text-balance text-[1.1rem] leading-relaxed ${textColorClass} ${textAlign} ${className} md:max-w-[30rem]`}
      >
        {description}
      </p>
    </div>
  );
}
