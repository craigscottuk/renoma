// cSpell:disable
//src/app/[locale]/polityka-prywatnosci/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import Privacy from "@/app/[locale]/polityka-prywatnosci/privacy";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const QUERY = `
{
  "privacyHeader": *[_type == "privacyHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "backgroundColor": backgroundColor
  },
  "privacyBody": *[_type == "privacyBody"][0]{
    "content": coalesce(content[$locale], [])
  },
  "privacyPageMeta": *[_type == "privacyPageMeta"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}`;

const OPTIONS = { next: { revalidate: 10 } };
// 604800

type Props = {
  params: { locale: string };
};

interface Content {
  privacyHeader: {
    label: string;
    title: string;
    backgroundColor?: "black" | "white";
  };
  privacyBody: {
    content: PortableTextBlock[];
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const { privacyPageMeta } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: privacyPageMeta?.pageTitle,
    description: privacyPageMeta?.metaDescription,
    openGraph: {
      title: privacyPageMeta?.ogTitle,
      description: privacyPageMeta?.ogDescription,
      images: privacyPageMeta?.ogImage
        ? [{ url: privacyPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: privacyPageMeta?.ogTitle,
      description: privacyPageMeta?.ogDescription,
    },
  };
}

export default async function PolitykaPrywatnosci({
  params: { locale },
}: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { privacyHeader, privacyBody } = content;

  return (
    <>
      {/* Page Header */}
      {privacyHeader && (
        <div
          className={
            privacyHeader.backgroundColor === "black"
              ? "bg-zinc-900"
              : "bg-white"
          }
        >
          <MaxWidthWrapper className="mt-24 pb-40 pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <SectionTitle
                label={privacyHeader.label}
                title={privacyHeader.title}
                as="h1"
                motionPreset="blur-up"
                textColor={
                  privacyHeader.backgroundColor === "black" ? "white" : "black"
                }
              />
            </div>
          </MaxWidthWrapper>
        </div>
      )}

      {/* Privacy Policy text content */}
      {privacyBody && (
        <Privacy content={privacyBody.content} paddingY="pt-28 pb-36" />
      )}
    </>
  );
}
