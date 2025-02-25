"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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

function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView: true,
    threshold: 0.3,
    once: true, // Animate only once
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LogoShowcase({
  label,
  title,
  logos,
  paddingY = "py-20 md:py-48",
}: LogoShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Removed the duplication logic, so there's only one .scroll-content row
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    // No more cloning...
  }, []);

  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="mb-20">
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle
              animateOnView={true}
              animationDirection="right"
              label={label}
              title={title}
              textAlign="right"
            />
          </div>
          <div className="md:hidden">
            <SectionTitle
              label="NASI KLIENCI"
              title="Zaufali nam"
              textAlign="left"
              animateOnView={true}
              animationDirection="left"
            />
          </div>
        </div>

        <FadeInSection>
          <div ref={scrollRef} className="relative w-full overflow-hidden">
            <div className="scroll-content animate-scroll-mobile flex min-w-max shrink-0 flex-nowrap items-center gap-4 bg-white grayscale md:animate-scroll md:gap-10">
              {logos.map((logo: Logo, index: number) => (
                <Link
                  key={index}
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-auto w-auto flex-shrink-0 items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.company}
                    className="h-[100px] w-auto object-contain md:h-[130px]"
                    width={240}
                    height={112}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 240px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      </MaxWidthWrapper>
    </section>
  );
}
