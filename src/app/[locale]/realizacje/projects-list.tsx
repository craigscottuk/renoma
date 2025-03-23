// cSpell:disable
"use client";
import clsx from "clsx";
import Image from "next/image";
import {
  Card,
  // CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { FadeInSection } from "@/components/fade-in-section";

interface ProjectsListProps {
  projectCardData: {
    title: string;
    location: string;
    timeframe: string;
    cardDescription?: string; // Made optional
    imageUrl: string;
    slug: string;
    draft?: boolean;
  }[];
  paddingY: string;
}

interface ProjectCardProps {
  project: {
    title: string;
    location: string;
    timeframe: string;
    cardDescription?: string;
    imageUrl: string;
    slug: string;
  };
}

export default function ProjectsList({
  projectCardData,
  paddingY,
}: ProjectsListProps) {
  return (
    <section className={clsx("bg-zinc-200 text-zinc-950", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-2 lg:gap-y-24 xl:grid-cols-3">
          {projectCardData
            .filter((project) => !project.draft)
            .map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <FadeInSection translateY>
      <Card
        className={clsx(
          "flex h-full flex-col overflow-hidden border border-none border-zinc-300 bg-zinc-100 shadow-none",
        )}
      >
        <div className="relative aspect-[4/3]">
          {/* <a href={`/realizacje/${project.slug}`}> */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* </a> */}
        </div>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle className="font-bolder text-[1.25rem] leading-snug tracking-[-0.010em] text-zinc-800">
              <h2>
                {/* <a href={`/realizacje/${project.slug}`}> */}
                {fixPolishOrphans(project.title)}
                {/* </a> */}
              </h2>
            </CardTitle>
          </div>
        </CardHeader>
        {/* <CardContent
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

          {project.cardDescription && (
            <p className="">
              {fixPolishOrphans(project.cardDescription)}
            </p>
          )}
        </CardContent> */}
        {/* <CardFooter> */}
        {/* <AnimatedLink
            className="text-`zinc-900 text-base"
            href={`/realizacje/${project.slug}`}
          >
            Zobacz cały projekt
          </AnimatedLink> */}
        {/* </CardFooter> */}
      </Card>
    </FadeInSection>
  );
}
