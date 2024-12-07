import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "../max-width-wrapper";
import SectionTitle from "../section-title";
import clsx from "clsx";

// Define the type for our feature items
interface WhatWeOfferProps {
  sectionTitle: string;
  offers: { title: string; description: string }[];
}

interface WhatWeOfferComponentProps {
  paddingY: string;
}

export default function WhatWeOffer({
  sectionTitle,
  offers,
  paddingY,
}: WhatWeOfferProps & WhatWeOfferComponentProps) {
  return (
    <section className={clsx("mx-auto bg-black text-white/90", paddingY)}>
      <MaxWidthWrapper>
        <SectionTitle
          title={sectionTitle}
          className="mb-20"
          textColor="white"
        />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((feature, index) => (
            <Card
              key={index}
              className="border-zinc-800 bg-zinc-950 text-white"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-amber-500 bg-transparent p-2">
                    <Check className="h-4 w-4 text-amber-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
