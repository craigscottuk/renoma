// cSpell:disable

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidhthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1680px] px-2.5 md:px-20", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidhthWrapper;
