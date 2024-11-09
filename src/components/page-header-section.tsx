// cSpell:disable
import Image from "next/image";

interface PageHeaderSectionProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionButton?: string;
  headerImage?: string;
}

export default function PageHeaderSection({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionButton,
  headerImage,
}: PageHeaderSectionProps) {
  return (
    <section className="relative mt-24 bg-white py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                {sectionLabel}
              </p>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {sectionTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {sectionDescription}
              </p>
            </div>
          </div>
          {headerImage && (
            <div className="relative z-10 h-[680px] w-[560px] lg:absolute lg:right-[5%] lg:top-0">
              <div className="relative mt-24 h-full w-full">
                <Image
                  src={headerImage}
                  alt="Header Image"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
