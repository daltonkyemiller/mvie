// @ts-check
import {clientEnv} from "./src/env/schema.mjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [clientEnv.NEXT_PUBLIC_TMDB_IMAGE_URL || '']
  },
  // Enables hot-reload and easy integration for local packages
  transpilePackages: ['@acme/api', '@acme/db'],
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
