import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  sassOptions: {
    quietDeps: true,
    outputStyle: 'expanded',
    indentWidth: 4,
    additionalData: `
      @use '@/theme/vars' as *;
      @use '@/theme/breakpoints' as bp;
      @use '@/theme/typography' as type;
      @use '@/theme/colours' as col;
      @use '@/theme/utilities' as util;
      @use '@/theme/animations' as animate;
    `
  },
  output: 'export'
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

// Only use the bundle analyser when ANALYZE environment variable is set to true
const exportedConfig =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

export default exportedConfig;
