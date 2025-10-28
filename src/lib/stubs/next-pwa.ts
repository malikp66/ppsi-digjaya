import type { NextConfig } from "next";

type PwaOptions = {
  dest?: string;
  register?: boolean;
  skipWaiting?: boolean;
  disable?: boolean;
};

const withPWA = (options: PwaOptions = {}) => (nextConfig: NextConfig) => {
  return {
    ...nextConfig,
    env: {
      ...nextConfig.env,
      NEXT_PUBLIC_PWA_ENABLED: options.disable ? "false" : "true",
    },
  } as NextConfig;
};

export default withPWA;
