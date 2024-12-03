// cSpell:disable
// app/[locale]/realizacje/[slug]/page.tsx
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
import NoTranslationMessage from "@/components/NoTranslationMessage";
import CaseStudyHeaderSection from "@/components/sections-case/case-study-header-section";
import ContentSection from "@/components/sections-case/content-section";
import ProjectDetailsSection from "@/components/sections-case/details";

//TD: coalesce all values

const QUERY = `
*[_type == "wpisRealizacji" && slug.current == $slug][0]{
  language,
  title,
  slug,
  summary,
  headerImage {
    image,
    imageAlt
  },
  details {
    lokalizacja,
    status,
    czasTrwania,
    typObiektu,
    rola,
    zakresPrac
  },
  sectionOne {
    sectionOneTitle,
    sectionOneContent
  },
  sectionTwo {
    sectionTwoTitle,
    sectionTwoContent
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  }
}
`;

type Project = {
  label: string;
  title: string;
  slug: { current: string };
  language: string;
  summary: string;
  headerImage: {
    image: string;
    imageAlt: string;
  };
  details: {
    lokalizacja: string;
    status: string;
    czasTrwania: string;
    typObiektu: string;
    rola: string[];
    zakresPrac: string[];
  };
  sectionOne: {
    sectionOneTitle: string;
    sectionOneContent: string;
  };
  sectionTwo: {
    sectionTwoTitle: string;
    sectionTwoContent: string;
  };
  _translations: Translation[];
};

type Translation = {
  title: string;
  slug: { current: string };
  language: string;
};

type Props = {
  params: { slug: string; locale: string };
};

export default async function ProjectPage({ params: { slug, locale } }: Props) {
  // Set the locale for the page rendering
  setRequestLocale(locale);

  // Define options for ISR revalidation
  const OPTIONS = { next: { revalidate: 30 } };

  // Fetch the project data with the revalidate option
  const project: Project = await client.fetch(QUERY, { slug }, OPTIONS);

  // Determine the translation for the selected locale or fallback to the original language if unavailable
  const translation = project._translations.find((t) => t.language === locale);

  // If the URL slug does not match the translation's slug, redirect
  if (translation && translation.slug.current !== slug) {
    redirect({
      href: {
        pathname: "/realizacje/[slug]",
        params: { slug: translation.slug.current },
      },
      locale,
    });
  }

  return (
    <>
      {translation ? (
        <>
          <CaseStudyHeaderSection
            label={
              locale === "en"
                ? "Case Study"
                : locale === "pl"
                  ? "Realizacja"
                  : locale === "de"
                    ? "Fallstudie"
                    : "Case Study"
            }
            title={project.title ?? "Default Title"} // Add optional chaining with default value
            summary={project.summary ?? "Default Summary"} // Add optional chaining with default value
            image={project.headerImage?.image} // Add optional chaining
            imageAlt={project.headerImage?.imageAlt} // Add optional chaining
          />
          <ProjectDetailsSection
            details={
              project.details
                ? [
                    {
                      label: "Lokalizacja",
                      value: project.details.lokalizacja,
                    },
                    { label: "Status", value: project.details.status },
                    {
                      label: "Czas trwania",
                      value: project.details.czasTrwania,
                    },
                    { label: "Typ obiektu", value: project.details.typObiektu },
                    { label: "Rola", value: project.details.rola },
                    { label: "Zakres prac", value: project.details.zakresPrac },
                  ]
                : []
            }
          />
          <ContentSection
            sectionOne={project.sectionOne}
            sectionTwo={project.sectionTwo}
          />
        </>
      ) : (
        <NoTranslationMessage
          locale={locale}
          translations={project._translations}
        />
      )}
    </>
  );
}
