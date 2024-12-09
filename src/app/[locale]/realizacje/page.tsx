// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Link } from "@/i18n/routing";
import PageHeader from "@/components/page-header-section";

const QUERY = `
{
  "projects": *[_type == "caseStudyEntry" && language == $locale]{
    title,
    slug,
    language,
},
  "caseStudyHeader": *[_type == "caseStudyHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Projects {
  title: string;
  slug: {
    current: string;
  };
}

export default async function Realizacje({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const { projects, caseStudyHeader } = await client.fetch(
    QUERY,
    {
      locale,
    },
    OPTIONS,
  );

  console.log(projects);

  return (
    <>
      {/* Page Header Section */}
      <PageHeader
        label={caseStudyHeader.label}
        title={caseStudyHeader.title}
        description={caseStudyHeader.description}
        image={caseStudyHeader.image}
        imageAlt={caseStudyHeader.imageAlt}
      />

      <section className="py-12 md:py-24">
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
    </>
  );
}
