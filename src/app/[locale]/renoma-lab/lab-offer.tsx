// src/app/[locale]/renoma-lab/lab-offer.tsx
"use client";
import clsx from "clsx";
import React from "react";
import SectionTitle from "@/components/section-title";
import { Separator } from "@/components/ui/separator";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import { FadeInSection } from "@/components/fade-in-section";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  Layers,
  Droplets,
  FlaskRoundIcon as Flask,
  Lightbulb,
  Users,
} from "lucide-react";

interface LabOfferProps {
  title: string;
  offers: {
    icon: string;
    title: string;
    content: PortableTextBlock[];
  }[];
  collaborationDescription: string;
  paddingY: string;
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

interface Offer {
  icon: string;
  title: string;
  content: PortableTextBlock[];
}

function LabServicesList({ newOffers }: { newOffers: Offer[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {newOffers.map((offer, index) => {
        const IconComponent = iconComponents[offer.icon];
        return (
          <FadeInSection translateY key={index}>
            <Card className="h-full border-zinc-300 bg-zinc-100 md:p-3 lg:p-8">
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
                  "text-zinc-700",
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
  );
}

export default function LabOffer({ title, offers, paddingY }: LabOfferProps) {
  const newOffers = offers.map((offer) => {
    const newContent = transformPortableTextBlocks(offer.content);
    return { ...offer, content: newContent };
  });

  return (
    <>
      <section className={clsx("", "bg-zinc-200 text-zinc-950", paddingY)}>
        <MaxWidthWrapper>
          <div>
            <div className="justify-left mb-7 flex">
              <FadeInSection translateY>
                <SectionTitle
                  title={title}
                  textColor="black"
                  textAlign="right"
                />
              </FadeInSection>
            </div>

            <FadeInSection translateY>
              <Separator className="mb-10" />
            </FadeInSection>
            <LabServicesList newOffers={newOffers} />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
