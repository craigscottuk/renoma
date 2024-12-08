// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import SectionDescription from "../section-description";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/routing";
import { services } from "@/lib/serviceCardData";
import AnimatedLink from "../animated-link";

interface SectionUslugiHomeProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function SectionUslugiHome({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
}: SectionUslugiHomeProps) {
  return (
    // <section
    //   className={clsx("relative mx-auto bg-black text-white", paddingY)}
    //   style={{ backgroundImage: 'url("/path/to/your/image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    // >
    <section className={clsx("mx-auto bg-black text-white", paddingY)}>
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

        <ServicesCards />
      </MaxWidthWrapper>
    </section>
  );
}

function ServicesCards() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
      {services.map((service, index) => (
        <Card key={index} className="border border-white/40 bg-black">
          <CardHeader className="bg-black text-white">
            <CardTitle className="font-regular text-[1.6rem] text-white/95 md:text-[1.8rem]">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 bg-black text-white/80">
            <Accordion type="multiple" className="w-full">
              {service.items.map((item, itemIndex) => (
                <AccordionItem
                  className="border-white/60"
                  key={itemIndex}
                  value={`item-${itemIndex}`}
                >
                  <AccordionTrigger className="text-left text-[1.2rem]">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-balance text-[1.1rem]">
                    <p className="mb-10">{item.content}</p>

                    <AnimatedLink
                      className="mb-3 text-sm"
                      variant="dark"
                      href={item.href}
                    >
                      Dowiedz się więcej
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
