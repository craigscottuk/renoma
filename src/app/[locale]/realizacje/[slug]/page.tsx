// cSpell:disable
// app/[locale]/realizacje/[slug]/page.tsx
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { redirect } from "@/i18n/routing";
import NoTranslationMessage from "@/components/NoTranslationMessage";

//TD: coalesce all values

const QUERY = `
*[_type == "wpisRealizacji" && slug.current == $slug][0]{
  title,
  slug,
  language,
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
  title: string;
  slug: { current: string };
  language: string;
  _translations: Translation[];
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
        <section className="mt-48">
          <MaxWidthWrapper>
            <h2>{translation.title}</h2>
          </MaxWidthWrapper>
        </section>
      ) : (
        <NoTranslationMessage
          locale={locale}
          translations={project._translations}
        />
      )}
    </>
  );
}
