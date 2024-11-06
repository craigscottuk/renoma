// cSpell:disable

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1680px] px-2.5 md:px-12", className)}
    >
      {children}
    </div>
  );
}
