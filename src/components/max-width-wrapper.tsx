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
      className={cn(
        "mx-auto w-full max-w-[1600px] px-3 md:px-6 lg:px-9 xl:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
