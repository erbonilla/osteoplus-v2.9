import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es",
        permanent: false,
      },
    ];
  },
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

export default withPWA(withNextIntl(nextConfig));
