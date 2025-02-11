"use client";

import { CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import { FadeInSection } from "@/components/fade-in-section";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

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
    <section className={clsx("mx-auto bg-zinc-900 text-zinc-50", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection translateY>
          <SectionTitle title={title} className="mb-20" textColor="white" />
        </FadeInSection>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((feature, index) => (
            <FadeInSection translateY key={index}>
              <Card className="h-full border-zinc-700 bg-zinc-800 text-zinc-100/90">
                <CardHeader>
                  <div className="flex flex-col items-start">
                    <CircleCheck className="mb-4 h-8 w-8 text-gold-900" />
                    <CardTitle className="font-regular text-[1.7rem] leading-tight tracking-[-0.015em]">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[1.1rem] text-zinc-300">
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
