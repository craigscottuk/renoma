// cSpell:disable

import { setRequestLocale } from "next-intl/server";
// import { client } from "@/sanity/client";

// const QUERY = `

// `;

// const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  powitanie: string;
  wiadomosc: string;
}

export default async function RenomaLab({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  // const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">RenomaLab</h1>
      <p>RenomaLab</p>
    </main>
  );
}
