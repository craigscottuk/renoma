// src/app/[locale]/renoma-lab/lab-offer.tsx

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  Layers,
  Droplets,
  FlaskRoundIcon as Flask,
  Lightbulb,
  Users,
} from "lucide-react";
import clsx from "clsx";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import { Separator } from "@/components/ui/separator";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

interface LabOfferProps {
  title: string;
  offers: {
    icon: string;
    title: string;
    content: PortableTextBlock[];
  }[];
  collaborationDescription: string;
  paddingY: string;
  colorScheme: keyof typeof cardColorSchemes;
}

const iconComponents: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Microscope,
  Layers,
  Flask,
  Droplets,
  Lightbulb,
  Users,
};

const cardColorSchemes: Record<
  string,
  {
    section: string;
    card: string;
    cardContent: string;
    sectionTitle: "white" | "black";
  }
> = {
  zincDark: {
    section: "bg-zinc-900 text-zinc-50",
    card: "border-zinc-700 bg-zinc-900 text-zinc-50 h-full",
    cardContent: "text-zinc-100",
    sectionTitle: "white",
  },
  zincLight: {
    section: "text-zinc-950 bg-zinc-200",
    card: "border-zinc-300 bg-zinc-100 h-full",
    cardContent: "text-zinc-700",
    sectionTitle: "black",
  },
  goldDark: {
    section: "bg-gold-950 text-gold-50",
    card: "border-gold-700 bg-gold-900 text-gold-50",
    cardContent: "text-gold-200",
    sectionTitle: "white",
  },
};

export default function LabOffer({
  title,
  offers,
  // collaborationDescription,
  paddingY,
  colorScheme = "zincLight",
}: LabOfferProps) {
  const selectedColorScheme =
    cardColorSchemes[colorScheme] || cardColorSchemes.zincLight;

  const newOffers = offers.map((offer) => {
    // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
    const newContent = transformPortableTextBlocks(offer.content);
    return { ...offer, content: newContent };
  });

  return (
    <>
      <section className={clsx("", selectedColorScheme.section, paddingY)}>
        <MaxWidthWrapper>
          <div>
            <div className="justify-left mb-7 flex">
              <FadeInSection translateY>
                <SectionTitle
                  title={title}
                  textColor={selectedColorScheme.sectionTitle}
                  textAlign="right"
                />
              </FadeInSection>
            </div>

            <FadeInSection translateY>
              <Separator className="mb-10" />
            </FadeInSection>
            <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
              {newOffers.map((offer, index) => {
                const IconComponent = iconComponents[offer.icon] || Microscope;
                return (
                  <FadeInSection translateY key={index}>
                    <Card
                      className={`${selectedColorScheme.card} md:p-3 lg:p-8`}
                    >
                      <CardHeader>
                        <div className="items-left flex flex-col space-y-3 lg:flex-row lg:items-start lg:space-x-3 lg:space-y-0">
                          <IconComponent className="h-8 w-8 text-gold-800" />
                          <CardTitle className="mb-3 text-left font-bolder text-[1.7rem] leading-tight tracking-[-0.015em] lg:text-left">
                            {fixPolishOrphans(offer.title)}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent
                        className={clsx(
                          "list-indented text-pretty text-[1.1rem]",
                          selectedColorScheme.cardContent,
                        )}
                      >
                        <PortableText
                          value={offer.content}
                          components={portableTextComponents}
                        />
                      </CardContent>
                    </Card>
                  </FadeInSection>
                );
              })}
            </div>
            {/* <p className="mx-auto mt-8 px-5 py-10 text-center text-[1.1rem] text-zinc-900 md:max-w-[60rem]">
              {collaborationDescription}
            </p> */}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* <div className="bg-white">
        <MaxWidthWrapper>
          <p className="mt-8 py-10 text-left text-zinc-900">
            {collaborationDescription}
          </p>
        </MaxWidthWrapper>
      </div> */}
    </>
  );
}
