import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    dangerouslyAllowSVG: true, // Enable SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add a strict CSP for security
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
