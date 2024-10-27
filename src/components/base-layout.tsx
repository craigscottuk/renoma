import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from '@/components/navigation';
import localFont from 'next/font/local';

const helveticaNeueLight = localFont({
  src: './fonts/HelveticaNeue-Light.woff2',
  variable: '--font-helvetica-neue-light',
  weight: '300',
});

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className='h-full' lang={locale}>
      <body
        className={clsx(
          helveticaNeueLight.variable,
          ' font-sans antialiased flex h-full flex-col'
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
