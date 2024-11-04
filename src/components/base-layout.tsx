import { clsx } from "clsx";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import Navigation from "@/components/main-navigation";
import Footer from "@/components/footer";
import localFont from "next/font/local";

const helveticaNeueLight = localFont({
  src: "./fonts/HelveticaNeue-Light.woff2",
  variable: "--font-helvetica-neue-light",
  weight: "300",
});

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={clsx(
          helveticaNeueLight.variable,
          "h-full font-sans antialiased",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
