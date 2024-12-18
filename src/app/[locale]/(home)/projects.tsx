"use client";
// cSpell:disable
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
// import { PortableText, PortableTextBlock } from "@portabletext/react";
// import { portableTextComponents } from "@/lib/portableTextComponents";
import SectionTitle from "@/components/section-title";
// import { urlFor } from "@/sanity/lib/image";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface DiscoverProjectsProps {
  // title: string;
  // criteria: PortableTextBlock[];
  // image: SanityImageSource | string;
  // imageAlt: string;
  // applyButtonText: string;
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

export default function DiscoverProjects(
  {
    // title,
    // criteria,
    // image,
    // imageAlt,
    // applyButtonText,
    // paddingY,
  }: DiscoverProjectsProps,
) {
  // Generate the header image URL from Sanity or use the raw string URL
  // const imageUrl =
  //   typeof image === "string" ? image : image ? urlFor(image, 1200) : "";

  return (
    <section
      className={clsx(
        "mx-auto py-32",
        //  paddingY
      )}
    >
      <MaxWidthWrapper>
        <div className="mb-16 grid gap-0 md:grid-cols-2 md:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="mb-6 md:hidden">
            <SectionTitle
              label={"WYBRANE REALIZACJE"}
              title={"Nasze realizacje"}
              as="h2"
              motionPreset="fade-in"
              textColor="black"
              animateOnView={true}
              animationDirection="left"
            />
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6"></div>

          {/* Right Column (Heading, Title, and Button) for Desktop */}
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle
              label={"WYBRANE REALIZACJE"}
              title={"Nasze realizacje"}
              as="h2"
              motionPreset="blur-right"
              textColor="black"
              textAlign="right"
              animateOnView={true}
              animationDirection="right"
            />
          </div>

          {/* Button for Mobile, Hidden on Desktop */}
          <div className="text-left md:hidden"></div>
        </div>

        <FadeInSection>
          <Card className="border-none bg-zinc-100 px-6 pb-10 pt-16">
            <CardContent className="">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="">
                  {/* <SectionTitle
                    label="WYBRANE REALIZACJE"
                    title="Projekt Bastion Wschodni we Fromborku"
                    textColor="black"
                    as="h2"
                    className="mb-10"
                  /> */}
                  <h3 className="mb-10 max-w-[24rem] text-pretty font-bolder text-[1.9rem] leading-tight tracking-[-0.015em]">
                    Projekt Bastion Wschodni we Fromborku
                  </h3>
                  {/* <PortableText
                    value={criteria}
                    components={portableTextComponents}
                  /> */}

                  <div className="mb-4 max-w-[26rem] text-pretty text-[1.1rem]">
                    Baszta Ferbera jest jednym z najbardziej oryginalnych
                    elementów fortyfikacji Wzgórza Katedralnego we Fromborku.
                    Nasz zespół podjął się zadania konserwacji budowli, której
                    stan ze względu na destrukcję materiałów z których jest
                    wzniesiona wykluczał jej użytkowanie. Przeprowadzone w 2024
                    roku prace przywróciły walory estetyczne budynku oraz
                    znacznie poprawiły jego stan techniczny, umożliwiając dalsze
                    prace mające na celu ewentualną jego adaptację do nowych
                    funkcji.
                  </div>

                  <CustomButton animateOnView={false}>
                    ZOBACZ PROJEKT
                  </CustomButton>
                </div>
                <div className="relative h-full w-full">
                  {/* <Image
                    src={imageUrl}
                    alt={imageAlt || "Header image"}
                    fill
                    style={{
                      objectFit: "cover", //
                      objectPosition: "center",
                    }}
                  /> */}

                  <Image
                    src={"/basteja.webp"}
                    alt={
                      // imageAlt ||
                      "Header image"
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>
      </MaxWidthWrapper>
    </section>
  );
}
