// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact-form";

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

  return (
    <>
      <div className="min-h-screen p-6 text-black md:p-8 lg:p-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <ContactForm />
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p>+48 555 555 555</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>info@pkzrenoma.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Biuro</h3>
                  <p>ul. Jana Mohna 71/3,</p>
                  <p>87-100 Toruń, Polska</p>
                  <Link href="#" className="text-sm underline">
                    Zobacz na mapie
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FileText className="h-6 w-6" />
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
        </div>
      </div>
    </>
  );
}
