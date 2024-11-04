// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";

const QUERY = `
*[_type == "dom"][0]{
    "powitanie": coalesce(powitanie[_key == $locale][0].value, powitanie[_key == $locale][0].value),
    "wiadomosc": coalesce(wiadomosc[_key == $locale][0].value, wiadomosc[_key == $locale][0].value)
  }
`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  powitanie: string;
  wiadomosc: string;
}

export default async function IndexPage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, options);

  console.log(
    `Content for locale "${locale}":`,
    JSON.stringify(content, null, 2),
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">{content.powitanie}</h1>
      <p>{content.wiadomosc}</p>
    </main>
  );
}
