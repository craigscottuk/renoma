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
*[_type == "caseStudyEntry" && slug.current == $slug][0]{
  language,
  title,
  slug,
  summary,
  image {
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
  image: {
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

  const {
    image,
    details,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive,
    sectionSix,
    summary,
    title,
    _translations,
  } = project;

  return (
    <>
      {translation || project.slug.current === slug ? (
        <>
          {title && summary && image && (
            <CaseStudyHeaderSection
              title={title}
              summary={summary}
              image={image?.image}
              imageAlt={image?.imageAlt}
            />
          )}
          {details && (
            <ProjectDetailsSection
              details={
                project.details
                  ? [
                      {
                        label: "Lokalizacja",
                        value: details.lokalizacja,
                      },
                      { label: "Status", value: details.status },
                      {
                        label: "Czas trwania",
                        value: details.czasTrwania,
                      },
                      { label: "Typ obiektu", value: details.typObiektu },
                      { label: "Rola", value: details.rola },
                      { label: "Zakres prac", value: details.zakresPrac },
                    ]
                  : []
              }
            />
          )}
          {sectionOne?.content?.length > 0 && (
            <ContentSection
              title={sectionOne.title}
              content={sectionOne.content}
            />
          )}
          {sectionTwo?.content?.length > 0 && (
            <ContentSection
              title={sectionTwo.title}
              content={sectionTwo.content}
            />
          )}
          {sectionThree?.content?.length > 0 && (
            <ContentSection
              title={sectionThree.title}
              content={sectionThree.content}
            />
          )}
          {sectionFour?.content?.length > 0 && (
            <ContentSection
              title={sectionFour.title}
              content={sectionFour.content}
            />
          )}
          {sectionFive?.content?.length > 0 && (
            <ContentSection
              title={sectionFive.title}
              content={sectionFive.content}
            />
          )}
          {sectionSix?.content?.length > 0 && (
            <ContentSection
              title={sectionSix.title}
              content={sectionSix.content}
            />
          )}
        </>
      ) : (
        <NoTranslationMessage locale={locale} translations={_translations} />
      )}
    </>
  );
}
