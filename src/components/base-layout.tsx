import { clsx } from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import Navigation from "@/components/navigation/main-navigation";
import Footer from "@/components/footer";
import localFont from "next/font/local";
import Header from "./header";

const helveticaNeueLight = localFont({
  src: "./fonts/HelveticaNeueLight.otf",
  variable: "--font-helvetica-neue-light",
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <head>
        {/* Meta tag for responsive layout on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={clsx(
          helveticaNeueLight.variable,
          "h-full font-sans antialiased",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
