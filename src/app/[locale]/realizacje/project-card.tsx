// cSpell:disable
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectCardData.map((project, index) => (
            <Card
              key={index}
              className={clsx(
                "flex flex-col overflow-hidden",
                selectedColorScheme.card,
              )}
            >
              <div className="relative h-48 lg:h-64">
                <a href={`/realizacje/${project.slug}`}>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-[1.6rem] leading-tight tracking-[-0.015em]">
                    {project.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent
                className={clsx(
                  "text-[1.1rem]",
                  selectedColorScheme.cardContent,
                )}
              >
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Lokalizacja:</strong> {project.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Czas trwania:</strong> {project.timeframe}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href={`/realizacje/${project.slug}`}
                  className="inline-flex items-center text-primary transition-colors duration-200 hover:text-primary/80"
                >
                  Czytaj więcej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
