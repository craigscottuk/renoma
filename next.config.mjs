import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|de|pl)/admin",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
