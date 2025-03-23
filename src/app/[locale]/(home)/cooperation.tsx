"use client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FadeInSection } from "@/components/fade-in-section";
import { Separator } from "@/components/ui/separator";

interface Logo {
  company: string;
  src: string;
  link: string;
}

interface CooperationSectionProps {
  label?: string;
  title: string;
  logos: Logo[];
  paddingY?: string;
  skzLogo?: string;
  skzDescription?: string;
  link?: string;
}

export default function CooperationSection({
  label,
  title,
  logos,
  paddingY = "py-20 md:py-48",
  skzLogo,
  skzDescription,
  link,
}: CooperationSectionProps) {
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
              label={label}
              title={title}
              textAlign="left"
              animateOnView={true}
              animationDirection="left"
            />
          </div>
        </div>
        <LogoSection logos={logos} />
        {skzLogo && skzDescription && (
          <SkzSection
            skzLogo={skzLogo}
            skzDescription={skzDescription}
            link={link}
          />
        )}
      </MaxWidthWrapper>
    </section>
  );
}

// Scrolling logos section
const LogoSection = ({ logos }: { logos: Logo[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
  }, []);

  return (
    <FadeInSection>
      <div ref={scrollRef} className="relative w-full overflow-hidden">
        <div className="scroll-content flex min-w-max shrink-0 animate-scroll-mobile flex-nowrap items-center gap-4 bg-white grayscale md:animate-scroll md:gap-10">
          {logos.map((logo: Logo, index: number) => (
            <Link
              key={index}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-auto w-auto flex-shrink-0 items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.company}
                className="h-[100px] w-auto object-contain md:h-[130px]"
                width={240}
                height={112}
              />
            </Link>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

// SKZ membership section
const SkzSection = ({
  skzLogo,
  skzDescription,
  link,
}: {
  skzLogo: string;
  skzDescription: string;
  link?: string;
}) => (
  <>
    <FadeInSection>
      <Separator className="my-24" />
    </FadeInSection>
    <FadeInSection>
      <Link
        href={link || "http://www.skz.pl/skz_files/index.php"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center space-x-6"
      >
        <img
          src={skzLogo}
          alt={"SKZ"}
          className="h-[80px] w-auto object-contain md:h-[95px]"
          width={100}
          height={100}
        />
        <p className="max-w-sm text-pretty text-[0.90rem] leading-normal text-zinc-900 lg:text-[1.1rem] lg:leading-relaxed">
          {skzDescription}
        </p>
      </Link>
    </FadeInSection>
  </>
);
