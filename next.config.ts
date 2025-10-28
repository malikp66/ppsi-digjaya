import type { NextConfig } from "next";
import withPWA from "next-pwa";

const withAnalyzer = (config: NextConfig): NextConfig => {
  if (process.env.ANALYZE === "true") {
    try {
      // Dynamically require to avoid build errors when the package is unavailable
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const withBundleAnalyzer = require("@next/bundle-analyzer")({
        enabled: true,
      });
      return withBundleAnalyzer(config);
    } catch (error) {
      console.warn("Bundle analyzer unavailable:", error);
    }
  }
  return config;
};

const withPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const baseConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  i18n: {
    defaultLocale: "id",
    locales: ["id", "su"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": require("path").join(__dirname, "src/components"),
      "@/lib": require("path").join(__dirname, "src/lib"),
      "@/data": require("path").join(__dirname, "src/data"),
      "@/styles": require("path").join(__dirname, "src/styles"),
      zustand: require("path").join(__dirname, "src/lib/stubs/zustand"),
      "react-hook-form": require("path").join(
        __dirname,
        "src/lib/stubs/react-hook-form",
      ),
      zod: require("path").join(__dirname, "src/lib/stubs/zod"),
      "@hookform/resolvers/zod": require("path").join(
        __dirname,
        "src/lib/stubs/hookform-resolvers-zod",
      ),
      "next-themes": require("path").join(
        __dirname,
        "src/lib/stubs/next-themes",
      ),
      "next-intl": require("path").join(
        __dirname,
        "src/lib/stubs/next-intl",
      ),
      "next-intl/server": require("path").join(
        __dirname,
        "src/lib/stubs/next-intl-server",
      ),
      qrcode: require("path").join(__dirname, "src/lib/stubs/qrcode"),
      recharts: require("path").join(__dirname, "src/lib/stubs/recharts"),
      "next-pwa": require("path").join(__dirname, "src/lib/stubs/next-pwa"),
    };
    return config;
  },
};

const nextConfig = withAnalyzer(withPwa(baseConfig));

export default nextConfig;
