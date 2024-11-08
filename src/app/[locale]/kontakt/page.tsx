// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import Image from "next/image";

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

export default async function Kontakt({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  // const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  // Define theme as either 'light' or 'dark'
  const theme = "dark"; // or 'dark'

  return (
    <>
      <div className="relative">
        {/* White Section */}
        <section className="relative mt-24 bg-white py-12 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="max-w-xl">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">
                    KONTAKT
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    Skontaktuj się z nami
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    W razie pytań lub potrzeby uzyskania pomocy, Renoma
                    pozostaje do pełnej dyspozycji. Chętnie udzielimy wszelkich
                    informacji. Zachęcamy do kontaktu.
                  </p>
                </div>
              </div>
              <div className="relative z-10 h-[680px] w-[560px] lg:absolute lg:right-[5%] lg:top-0">
                <div className="relative h-full w-full">
                  <Image
                    src="/test-image.png"
                    alt="Building exterior with technical equipment"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`min-h-screen p-6 md:p-8 lg:p-12 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-36 lg:grid-cols-2">
            <div className="space-y-8">
              <ContactForm theme={theme} />
            </div>

            {/* Contact Information in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-1 lg:gap-12 xl:grid-cols-2 xl:gap-x-1 xl:gap-y-10 xl:place-self-end">
              {/* Phone Section */}
              <div className="flex max-w-48 items-start gap-4">
                <Phone className="h-6 w-6" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p>+48 555 555 555</p>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex max-w-48 items-start gap-4">
                <Mail className="h-6 w-6" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>info@pkzrenoma.com</p>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex max-w-48 items-start gap-4">
                <MapPin className="h-7 w-7" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Biuro</h3>
                  <p>ul. Jana Mohna 71/3,</p>
                  <p>87-100 Toruń, Polska</p>
                  <Link href="#" className="text-sm underline">
                    Zobacz na mapie
                  </Link>
                </div>
              </div>

              {/* Invoice Information Section */}
              <div className="flex max-w-48 items-start gap-4">
                <FileText className="h-10 w-10" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Dane do faktur</h3>
                  <p>RENOMA IGOR GÓŹDŹ</p>
                  <p>ul. Jana Mohna 71/3, 87-100 Toruń</p>
                  <p>NIP: 7632077673</p>
                  <p>REGON: 302752730</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
