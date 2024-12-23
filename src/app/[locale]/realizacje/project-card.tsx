// cSpell:disable
import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import AnimatedLink from "@/components/animated-link";

interface ProjectCardProps {
  projectCardData: {
    title: string;
    location: string;
    timeframe: string;
    description: string;
    imageUrl: string;
    slug: string;
  }[];
  paddingY: string;
  colorScheme: keyof typeof cardColorSchemes;
}

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
    cardContent: "text-zinc-800 leading-relaxed text-balance",
    sectionTitle: "black",
  },
  goldDark: {
    section: "bg-gold-950 text-gold-50",
    card: "border-gold-700 bg-gold-900 text-gold-50",
    cardContent: "text-gold-200",
    sectionTitle: "white",
  },
};

export default function ProjectCard({
  projectCardData,
  paddingY,
  colorScheme = "zincLight",
}: ProjectCardProps) {
  const selectedColorScheme =
    cardColorSchemes[colorScheme] || cardColorSchemes.zincDark;

  return (
    <section
      className={clsx("bg-white", paddingY, selectedColorScheme.section)}
    >
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {projectCardData.map((project, index) => (
            <Card
              key={index}
              className={clsx(
                "flex flex-col overflow-hidden",
                selectedColorScheme.card,
              )}
            >
              <div className="relative h-64 md:h-80 lg:h-80">
                <a href={`/realizacje/${project.slug}`}>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </a>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CardTitle className="font-regular text-[1.7rem] leading-tight tracking-[-0.015em] text-zinc-800">
                    <h2>
                      <a href={`/realizacje/${project.slug}`}>
                        {project.title}
                      </a>
                    </h2>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent
                className={clsx(
                  "text-[1.1rem]",
                  selectedColorScheme.cardContent,
                )}
              >
                <div className="mb-4 space-y-1">
                  <h3 className="text-base text-zinc-600">
                    <strong>Lokalizacja:</strong> {project.location}
                  </h3>
                  <h3 className="text-base text-zinc-600">
                    <strong>Czas trwania:</strong> {project.timeframe}
                  </h3>
                </div>
                <Separator className="mb-4" />

                <p className="">{project.description}</p>
              </CardContent>
              <CardFooter>
                <AnimatedLink
                  className="text-`zinc-900 text-base"
                  href={`/realizacje/${project.slug}`}
                >
                  Czytaj więcej
                </AnimatedLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
