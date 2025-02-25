import { withNextVideo } from "next-video/process";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true, // Enable SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add a strict CSP for security
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "", // Leave empty if no specific port is used
        pathname: "/**", // Match all paths on this domain
      },
    ],
    unoptimized: true, // Disable image optimization
  },

  async redirects() {
    return [
      {
        source: "/:locale(en|de|pl)/admin",
        destination: "/admin",
        permanent: true,
      },
      // {
      //   source: "/((?!pl).*)",
      //   has: [{ type: "host", value: "pkzrenoma.com" }],
      //   destination: "https://pkzrenoma.com/pl/:path*",
      //   permanent: false, // false means temporary redirect (302)
      // },
      // {
      //   source: "/((?!pl).*)",
      //   has: [{ type: "host", value: "pkzrenoma.pl" }],
      //   destination: "https://pkzrenoma.com/pl/:path*",
      //   permanent: false,
      // },
      // {
      //   source: "/((?!pl).*)",
      //   has: [{ type: "host", value: "pkzrenoma.com" }],
      //   destination: "https://pkzrenoma.com/pl/:path*",
      //   permanent: false,
      // },
      // {
      //   source: "/((?!pl).*)",
      //   has: [{ type: "host", value: "pkzrenoma.pl" }],
      //   destination: "https://pkzrenoma.com/pl/:path*",
      //   permanent: false,
      // },
    ];
  },
};

export default withNextVideo(withNextIntl(nextConfig));
