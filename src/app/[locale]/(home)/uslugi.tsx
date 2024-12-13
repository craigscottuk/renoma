// cSpell:disable
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionDescription from "@/components/section-description";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedLink from "@/components/animated-link";

interface SectionUslugiHomeProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
  servicesGroup: {
    serviceGroupOne: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
    serviceGroupTwo: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
    serviceGroupThree: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
  };
}

export default function SectionUslugiHome({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44",
  servicesGroup,
}: SectionUslugiHomeProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-900 text-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="relative grid items-center gap-6 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={label}
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="white"
            textAlign="left"
          />

          {/* Right Column */}
          <div className="flex flex-col md:items-end">
            <div className="md:max-w-[38rem]">
              <SectionDescription
                description={description}
                textAlign="left"
                textColor="white"
              />
              <div className="w-full text-left">
                <CustomButton variant="dark" href="/uslugi">
                  {sectionCTA}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>

        <ServicesCards servicesGroup={servicesGroup} />
      </MaxWidthWrapper>
    </section>
  );
}

function ServicesCards({
  servicesGroup,
}: {
  servicesGroup: SectionUslugiHomeProps["servicesGroup"];
}) {
  const serviceGroups = [
    servicesGroup.serviceGroupOne,
    servicesGroup.serviceGroupTwo,
    servicesGroup.serviceGroupThree,
  ];

  return (
    <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
      {serviceGroups.map((group, index) => (
        <Card key={index} className="border border-white/40 bg-[#09090B]">
          <CardHeader className="text-white">
            <CardTitle className="font-regular text-[1.6rem] text-white/95 md:text-[1.8rem]">
              {group.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 text-white/80">
            <Accordion type="multiple" className="w-full">
              {group.services.map((item, itemIndex) => (
                <AccordionItem
                  className="border-white/60"
                  key={itemIndex}
                  value={`item-${itemIndex}`}
                >
                  <AccordionTrigger className="text-left text-[1.2rem]">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-balance text-[1.1rem]">
                    <p className="mb-10">{item.shortDescription}</p>
                    <AnimatedLink
                      href={`/uslugi#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      variant="dark"
                    >
                      Więcej szczegółów
                    </AnimatedLink>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
