import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  SwatchBook,
  Droplets,
  FlaskRoundIcon as Flask,
} from "lucide-react";
import clsx from "clsx";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";

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
  SwatchBook,
  Flask,
  Droplets,
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
    card: "border-zinc-700 bg-zinc-900 text-zinc-50",
    cardContent: "text-zinc-100",
    sectionTitle: "white",
  },
  zincLight: {
    section: "text-zinc-950 bg-zinc-200",
    card: "border-zinc-300 bg-zinc-100",
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
  collaborationDescription,
  paddingY,
  colorScheme = "zincLight",
}: LabOfferProps) {
  const selectedColorScheme =
    cardColorSchemes[colorScheme] || cardColorSchemes.zincLight;

  return (
    <>
      <section className={clsx("", selectedColorScheme.section, paddingY)}>
        <MaxWidthWrapper>
          <div className="space-y-10">
            <div className="justify-left flex">
              <SectionTitle
                title={title}
                textColor={selectedColorScheme.sectionTitle}
                textAlign="right"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {offers.map((offer, index) => {
                const IconComponent = iconComponents[offer.icon] || Microscope;
                return (
                  <Card className={selectedColorScheme.card} key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-6 w-6 text-gold-800" />
                        <CardTitle className="text-[1.6rem] leading-tight tracking-[-0.015em]">
                          {offer.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent
                      className={clsx(
                        "text-[1.1rem]",
                        selectedColorScheme.cardContent,
                      )}
                    >
                      <PortableText
                        value={offer.content}
                        components={portableTextComponents}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <p className="mx-auto mt-8 px-5 py-10 text-center text-[1.1rem] text-zinc-900 md:max-w-[60rem]">
              {collaborationDescription}
            </p>
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
