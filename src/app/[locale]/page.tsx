// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import Image from "next/image";

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

  return (
    <>
      <div className="relative" style={{ height: "calc(100vh - 96px)" }}>
        <Image
          src="/cover-img.png"
          alt="Cover Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <section className="mx-auto bg-white py-16 md:py-44">
        <MaxWidthWrapper>
          <div className="grid gap-12 md:grid-cols-2 md:gap-24">
            {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
            <div className="space-y-4 md:hidden">
              <p className="text-left text-sm tracking-wide">KIM JESTEŚMY</p>
              <h2 className="text-6xl font-light leading-tight">
                Nasza pasja do zachowania historii
              </h2>
            </div>

            {/* Left Column (Text Content) */}
            <div className="flex h-full flex-col justify-center space-y-6">
              <p className="max-w-md text-base leading-relaxed">
                Renoma to firma, która od 2012 roku łączy pasję z wiedzą,
                specjalizując się w konserwacji i restauracji zabytków
                kulturowych. Rozpoczynając jako rodzinne przedsiębiorstwo,
                staliśmy się liderem w dziedzinie ochrony dziedzictwa. Nasze
                usługi obejmują zarówno renowację architektury, jak i zabytków
                ruchomych, a nasza troska o jakość i precyzję sprawia, że każdy
                projekt jest realizowany na najwyższym poziomie.
              </p>
            </div>

            {/* Right Column (Heading, Title, and Button) for Desktop */}
            <div className="hidden space-y-8 md:flex md:flex-col md:items-end">
              <p className="text-sm uppercase tracking-wide">KIM JESTEŚMY</p>
              <h2 className="text-right text-4xl font-light leading-tight md:text-6xl">
                Nasza pasja do zachowania historii
              </h2>
              <div>
                <CustomButton variant="light" href="/o-nas">
                  ODKRYJ NASZE DOŚWIADCZENIE
                </CustomButton>
              </div>
            </div>

            {/* Button for Mobile, Hidden on Desktop */}
            <div className="text-left md:hidden">
              <CustomButton variant="light" href="/o-nas">
                ODKRYJ NASZE DOŚWIADCZENIE
              </CustomButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="container mx-auto">
        <h1 className="mb-8 text-4xl font-bold">{content.powitanie}</h1>
        <p>{content.wiadomosc}</p>
      </div>

      {/* Section with Black Background */}
      <section className="mx-auto bg-black py-16 text-white md:py-44">
        <MaxWidthWrapper>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-8">
              <p className="text-sm uppercase tracking-wide">CO ROBIMY</p>
              <h2 className="text-4xl font-light leading-tight md:text-6xl">
                Specjalistyczne prace konserwatorskie i rewitalizacyjne
              </h2>
            </div>

            {/* Right Column */}
            <div className="max-w-lg space-y-6 md:text-left">
              <p className="max-w-prose text-base leading-relaxed">
                Renoma oferuje szeroki zakres usług konserwatorskich,
                dopasowanych do specyficznych potrzeb każdego zabytku. Z troską
                o detale i zrozumieniem wartości historycznych, dbamy o
                długotrwałe zachowanie dziedzictwa kulturowego.
              </p>
              <div>
                <CustomButton variant="dark" href="/uslugi">
                  POZNAJ NASZE USŁUGI
                </CustomButton>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
