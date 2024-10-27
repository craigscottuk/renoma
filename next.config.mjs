import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale(en|de|pl)/admin',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
