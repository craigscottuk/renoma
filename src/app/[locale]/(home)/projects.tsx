"use client";
// cSpell:disable
import clsx from "clsx";
import { motion } from "framer-motion";
import ProjectCard from "../realizacje/project-card";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface DiscoverProjectsProps {
  projectCardData: {
    title: string;
    location: string;
    timeframe: string;
    description: string;
    imageUrl: string;
    slug: string;
  }[];
  paddingY: string;
}

function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView: true,
    threshold: 0.3,
    once: true, // Animate only once
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DiscoverProjects({
  projectCardData,
  paddingY,
}: DiscoverProjectsProps) {
  // Generate the header image URL from Sanity or use the raw string URL
  // const imageUrl =
  //   typeof image === "string" ? image : image ? urlFor(image, 1200) : "";

  return (
    <section className={clsx("mx-auto", paddingY)}>
      <MaxWidthWrapper>
        <div className="mb-16 grid gap-0 md:grid-cols-2 md:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="mb-6 md:hidden">
            <SectionTitle
              label={"WYBRANE REALIZACJE"}
              title={"Nasze realizacje"}
              as="h2"
              motionPreset="blur-up"
              textColor="black"
              animateOnView={true}
              animationDirection="left"
            />
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6"></div>

          {/* Right Column (Heading, Title, and Button) for Desktop */}
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle
              label={"WYBRANE REALIZACJE"}
              title={"Nasze realizacje"}
              as="h2"
              motionPreset="blur-right"
              textColor="black"
              textAlign="right"
              animateOnView={true}
              animationDirection="right"
            />
          </div>

          {/* Button for Mobile, Hidden on Desktop */}
          <div className="text-left md:hidden"></div>
        </div>
      </MaxWidthWrapper>

      <FadeInSection>
        <ProjectCard
          projectCardData={projectCardData}
          paddingY="py-36"
          colorScheme="zincLight"
        />
      </FadeInSection>
    </section>
  );
}
