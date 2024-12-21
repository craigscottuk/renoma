// cSpell:disable
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface ProjectCardProps {
  projectCardData: {
    title: string;
    location: string;
    timeframe: string;
    description: string;
    imageUrl: string;
    slug: string;
  }[];
}

export default function ProjectCard({ projectCardData }: ProjectCardProps) {
  return (
    <section className="bg-white py-32">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectCardData.map((project, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
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
              <div className="flex flex-grow flex-col p-6">
                <h2 className="mb-2 text-xl font-semibold">{project.title}</h2>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Lokalizacja:</strong> {project.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Czas trwania:</strong> {project.timeframe}
                  </p>
                </div>
                <p className="mb-4 flex-grow text-gray-700">
                  {project.description}
                </p>
                <a
                  href={`/realizacje/${project.slug}`}
                  className="mt-auto inline-flex items-center text-blue-600 transition-colors duration-200 hover:text-blue-800"
                >
                  Czytaj więcej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
