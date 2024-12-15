import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  SwatchBook,
  Droplets,
  FlaskRoundIcon as Flask,
  Ruler,
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
}

const iconComponents: Record<string, React.ComponentType<any>> = {
  Microscope,
  SwatchBook,
  Flask,
  Droplets,
};

export default function LabOffer({
  title,
  offers,
  collaborationDescription,
  paddingY,
}: LabOfferProps) {
  return (
    <section className={clsx("bg-zinc-100", paddingY)}>
      <MaxWidthWrapper>
        <div className="space-y-10 bg-zinc-100 p-8">
          <SectionTitle title={title} textColor="black" />
          <div className="grid gap-6 md:grid-cols-2">
            {offers.map((offer, index) => {
              const IconComponent = iconComponents[offer.icon] || Microscope;
              return (
                <Card className="bg-zinc-50" key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-6 w-6" />
                      <CardTitle>{offer.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PortableText
                      value={offer.content}
                      components={portableTextComponents}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="mt-8 text-left text-muted-foreground">
            {collaborationDescription}
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
