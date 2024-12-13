"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Logo {
  company: string;
  src: string;
  link: string;
}

interface LogoShowcaseProps {
  label: string;
  title: string;
  logos: Logo[];
  paddingY: string;
}

export default function LogoShowcase({
  label,
  title,
  logos,
  paddingY = "py-20 md:py-48",
}: LogoShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the logos to ensure smooth infinite scrolling
    const content = scrollContainer.querySelector(".scroll-content");
    if (content) {
      scrollContainer.appendChild(content.cloneNode(true));
    }
  }, []);

  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="mb-20">
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle label={label} title={title} textAlign="right" />
          </div>
          <div className="md:hidden">
            <SectionTitle
              label="NASI KLIENCI"
              title="Zaufali nam"
              textAlign="left"
            />
          </div>
        </div>
        <div ref={scrollRef} className="relative flex w-full overflow-hidden">
          <div className="scroll-content flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8">
            {logos.map((logo: Logo, index: number) => (
              <Link
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-auto w-auto items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.company}
                  className="h-[130px] w-full object-contain"
                  width={240}
                  height={112}
                />
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
