import { clsx } from "clsx";
import Header from "./header";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/sections-footer/footer";
import { client } from "@/sanity/client";

const helveticaNeueLight = localFont({
  src: "./fonts/HelveticaNeueLight.otf",
  variable: "--font-helvetica-neue-light",
});

const helveticaNeueRegular = localFont({
  src: "./fonts/HelveticaNeueRegular.otf",
  variable: "--font-helvetica-neue-regular",
});

const helveticaNeueMedium = localFont({
  src: "./fonts/HelveticaNeueMedium.otf",
  variable: "--font-helvetica-neue-medium",
});

const QUERY = `
{
  "serviceGroups": *[_type == "servicesGroup"][0]{
    "serviceGroupOne": {
      "title": coalesce(serviceGroupOne.title, "Brak tłumaczenia"),
      "services": serviceGroupOne.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia")
      }
    },
    "serviceGroupTwo": {
      "title": coalesce(serviceGroupTwo.title, "Brak tłumaczenia"),
      "services": serviceGroupTwo.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia")
      }
    },
    "serviceGroupThree": {
      "title": coalesce(serviceGroupThree.title, "Brak tłumaczenia"),
      "services": serviceGroupThree.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia")
      }
    }
  },
  "socialMediaLinks": *[_type == "socialMediaLinks"][0]{
    "facebook": coalesce(facebook, ""),
    "instagram": coalesce(instagram, ""),
    "linkedIn": coalesce(linkedIn, "")
  }
}
`;

const OPTIONS = { next: { revalidate: 86400 } };

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  let messages = {};
  try {
    messages = await getMessages();
  } catch (error) {
    console.error("Error loading messages:", error);
  }

  const footerData = await client.fetch(QUERY, { locale }, OPTIONS);
  const serviceGroups = [
    footerData.serviceGroups.serviceGroupOne,
    footerData.serviceGroups.serviceGroupTwo,
    footerData.serviceGroups.serviceGroupThree,
  ];

  return (
    <html className="h-full" lang={locale}>
      <body
        className={clsx(
          helveticaNeueLight.variable,
          helveticaNeueRegular.variable,
          helveticaNeueMedium.variable,
          "smooth-scroll h-full font-sans antialiased",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer
              locale={locale}
              serviceGroups={serviceGroups}
              socialMediaLinks={footerData.socialMediaLinks}
            />
          </div>
        </NextIntlClientProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
