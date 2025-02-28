"use client";

import { CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import { FadeInSection } from "@/components/fade-in-section";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import { Separator } from "@/components/ui/separator";

// Define the type for our feature items
interface WhatWeOfferProps {
  title: string;
  offers: { title: string; description: string }[];
}

interface WhatWeOfferComponentProps {
  paddingY: string;
}

export default function WhatWeOffer({
  title,
  offers,
  paddingY,
}: WhatWeOfferProps & WhatWeOfferComponentProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-200 text-zinc-950", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection translateY>
          <SectionTitle
            title={title}
            className="mb-8 md:mb-12 lg:mb-16"
            textColor="black"
          />
        </FadeInSection>
        <FadeInSection translateY>
          <Separator className="mb-8 md:mb-12 lg:mb-16" />
        </FadeInSection>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((feature, index) => (
            <FadeInSection translateY key={index}>
              <Card className="h-full border-zinc-300 bg-zinc-100 px-2 py-4 text-zinc-900/90">
                <CardHeader>
                  <div className="flex flex-col items-start">
                    <CircleCheck className="mb-4 min-h-8 min-w-8 text-gold-900" />
                    <CardTitle className="font-bolder text-[1.7rem] leading-tight tracking-[-0.015em]">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[1.1rem] text-zinc-800">
                    {fixPolishOrphans(feature.description)}
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
