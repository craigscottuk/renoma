import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Link } from "@/i18n/routing";
import clsx from "clsx";

interface ProjectsListProps {
  projects: Projects[];
  paddingY: string;
}

interface Projects {
  title: string;
  slug: {
    current: string;
  };
}

export default function ProjectsList({
  projects,
  paddingY,
}: ProjectsListProps) {
  return (
    <section className={clsx("mx-auto", paddingY)}>
      <MaxWidthWrapper>
        <h1 className="mb-8 text-4xl">Projects</h1>
        <ul className="flex flex-col gap-y-4">
          {/* use slug or id instead of index */}
          {projects.map((project: Projects, index: number) => (
            <li className="hover:underline" key={index}>
              <Link
                href={{
                  pathname: "/realizacje/[slug]",
                  params: { slug: project.slug.current },
                }}
              >
                <h2 className="text-xl">{project.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </MaxWidthWrapper>
    </section>
  );
}
