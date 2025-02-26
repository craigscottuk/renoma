import { clsx } from "clsx";

import Header from "./header";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/sections-footer/footer";
// import { Analytics } from "@vercel/analytics/react";

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
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
