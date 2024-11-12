// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const QUERY = `
*[_type == "realizacje" && language == $locale]{
  title,
}
`;

const OPTIONS = { next: { cache: "no-store" } };

type Props = {
  params: { locale: string };
};

interface Content {
  title: string;
}

export default async function Realizacje({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content[]>(QUERY, { locale });

  console.log("project content: ", content);

  return (
    <>
      <div className="mt-48">
        <MaxWidthWrapper>
          <div>Test</div>
          <div className="text-black">
            {content.map((item, index) => (
              <h2 key={index}>{item.title}</h2>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
