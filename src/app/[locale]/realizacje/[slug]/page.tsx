// cSpell:disable
// app/[locale]/realizacje/[slug]/page.tsx
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
import NoTranslationMessage from "@/components/NoTranslationMessage";
import ContentSection from "@/app/[locale]/realizacje/[slug]/content-section";
import ProjectDetailsSection from "./details";
import { CaseStudySectionContent } from "@/types";
import PageHeader from "@/components/page-header";
import ComparisonSection from "./comparison-section";
import BibliographySection from "./bibliography-section";
import CTA from "@/components/cta";
import { ctaContent } from "@/lib/ctaContent";

const QUERY = `
*[_type == "caseStudyEntry" && slug.current == $slug][0]{
  language,
  title,
  slug,
  summary,
  "image": image,
  "imageAlt": imageAlt,
  imageLayout,
  backgroundColor,

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
  sectionThree {
    title,
    content[]{
      ...,
      _type == "textAndImageGallery" => {
        layout
      }
    }
  },
  sectionFour {
    title,
    content[]{
      ...,
      _type == "textAndImageGallery" => {
        layout
      }
    }
  },
  sectionFive {
    title,
    content[]{
      ...,
      _type == "textAndImageGallery" => {
        layout
      }
    }
  },
  sectionSix {
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

const comparisons = [
  {
    id: 1,
    title: "Elewacja zewnętrzna",
    imageBefore: "/fallback-image.svg",
    imageAfter: "/fallback-image.svg",
  },
  {
    id: 2,
    title: "Wnętrze - Sala główna",
    imageBefore: "/fallback-image.svg",
    imageAfter: "/fallback-image.svg",
  },
  {
    id: 3,
    title: "Dach i zwieńczenie",
    imageBefore: "/fallback-image.svg",
    imageAfter: "/fallback-image.svg",
  },
];

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
  image?: string;
  imageAlt?: string;
  imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
  backgroundColor?: "black" | "white";
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
  sectionThree: {
    title: string;
    content: CaseStudySectionContent[];
  };
  sectionFour: {
    title: string;
    content: CaseStudySectionContent[];
  };
  sectionFive: {
    title: string;
    content: CaseStudySectionContent[];
  };
  sectionSix: {
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

  const OPTIONS = { next: { revalidate: 86400 } };
  // 86400

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

  return (
    <>
      {translation || project.slug.current === slug ? (
        <>
          {project.title && project.summary && project.image && (
            <PageHeader
              label={project.label}
              title={project.title}
              description={project.summary}
              image={project.image}
              imageAlt={project.imageAlt}
              imageLayout={project.imageLayout}
              backgroundColor={project.backgroundColor}
            />
          )}
          {project.details && (
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
                      {
                        label: "Typ obiektu",
                        value: project.details.typObiektu,
                      },
                      { label: "Rola", value: project.details.rola },
                      {
                        label: "Zakres prac",
                        value: project.details.zakresPrac,
                      },
                    ]
                  : []
              }
            />
          )}
          {/* 01. Rys Historyczny */}
          {project.sectionOne?.content?.length > 0 && (
            <ContentSection
              title={project.sectionOne.title}
              content={project.sectionOne.content}
            />
          )}

          {/* 02. Stan zachowania */}
          {project.sectionTwo?.content?.length > 0 && (
            <ContentSection
              title={project.sectionTwo.title}
              content={project.sectionTwo.content}
            />
          )}

          {/* 03. Założenia konserwatorskie */}
          {project.sectionThree?.content?.length > 0 && (
            <ContentSection
              title={project.sectionThree.title}
              content={project.sectionThree.content}
            />
          )}

          {/* 04. Przebieg prac konserwatorskich i restauratorskich oraz budowlanych */}
          {project.sectionFour?.content?.length > 0 && (
            <ContentSection
              title={project.sectionFour.title}
              content={project.sectionFour.content}
            />
          )}

          {/* 05. Efekty prac konserwatorskich i restauratorskich oraz budowlanych */}
          {project.sectionFive?.content?.length > 0 && (
            // <ContentSection
            //   title={project.sectionFive.title}
            //   content={project.sectionFive.content}
            // />
            <ComparisonSection
              title="5. Efekty prac konserwatorskich i restauratorskich oraz budowlanych"
              comparisons={comparisons}
            />
          )}

          {/* 06. Bibliografia */}
          {project.sectionSix?.content?.length > 0 && (
            // <ContentSection
            //   title={project.sectionSix.title}
            //   content={project.sectionSix.content}
            // />

            <BibliographySection title="6. Wybrana bibliografia" />
          )}
          <BibliographySection title="6. Wybrana bibliografia" />
          <CTA
            title={ctaContent.title}
            description={ctaContent.description}
            buttonText={ctaContent.buttonText}
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
