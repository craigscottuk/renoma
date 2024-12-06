// cSpell:disable
// app/[locale]/realizacje/[slug]/page.tsx
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
import NoTranslationMessage from "@/components/NoTranslationMessage";
import CaseStudyHeaderSection from "@/components/sections-case/case-study-header-section";
import ContentSection from "@/components/sections-case/content-section";
import ProjectDetailsSection from "@/components/sections-case/details";
import { CaseStudySectionContent } from "@/types";

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
    title,
    content[]{
      ...,
      _type == "textAndImageGallery" => {
        layout
      }
    }
  },
  sectionTwo {
    title,
    content[]{
      ...,
      _type == "textAndImageGallery" => {
        layout
      }
    }
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  }
}
`;

type Translation = {
  title: string;
  slug: { current: string };
  language: string;
};

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
    title: string;
    content: CaseStudySectionContent[];
  };
  sectionTwo: {
    title: string;
    content: CaseStudySectionContent[];
  };
  _translations: Translation[];
};

type Props = {
  params: { slug: string; locale: string };
};

export default async function ProjectPage({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);

  // Define options for ISR revalidation
  const OPTIONS = { next: { revalidate: 30 } };

  // Error handling for fetching data
  let project: Project | null = null;
  try {
    project = await client.fetch(QUERY, { slug }, OPTIONS);
  } catch (error) {
    console.error("Error fetching project data:", error);
    return <div>Error loading project. Please try again later.</div>;
  }

  if (!project) {
    return <div>Project not found.</div>; // Optionally, redirect to a 404 page
  }

  // Determine the translation for the selected locale
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

  const {
    headerImage,
    details,
    sectionOne,
    sectionTwo,
    summary,
    title,
    _translations,
  } = project;

  return (
    <>
      {translation ? (
        <>
          <CaseStudyHeaderSection
            title={title}
            summary={summary}
            image={headerImage?.image}
            imageAlt={headerImage?.imageAlt}
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
          {/* 01. Rys Historyczny (lub inny) */}
          <ContentSection
            title={sectionOne.title}
            content={sectionOne.content}
          />

          {/* 02. Stan zachowania (lub inny) */}
          <ContentSection
            title={sectionTwo.title}
            content={sectionTwo.content}
          />
        </>
      ) : (
        <NoTranslationMessage locale={locale} translations={_translations} />
      )}
    </>
  );
}
