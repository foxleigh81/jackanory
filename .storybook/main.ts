import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    {
      directory: './.docs',
      titlePrefix: 'Documentation',
      files: '**/*.mdx'
    },
    {
      titlePrefix: 'Components',
      directory: '../src/components',
      files: '**/*.@(mdx|stories.@(ts|tsx))'
    },
    {
      titlePrefix: 'Partials',
      directory: '../src/partials',
      files: '**/*.@(mdx|stories.@(ts|tsx))'
    },
    {
      titlePrefix: 'Pages',
      directory: '../src/app',
      files: '**/*.@(mdx|stories.@(ts|tsx))'
    }
  ],
  addons: [
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add alias resolution
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@/helpers/*': path.resolve(__dirname, '../src/libs/helpers/*'),
          '@/mocks/*': path.resolve(__dirname, '../src/libs/mocks/*'),
          '@/types/*': path.resolve(__dirname, '../src/libs/types/*')
        }
      },
      // Add dependencies to pre-bundle
      optimizeDeps: {
        include: ['storybook-dark-mode']
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @use '@/theme/vars' as *;
              @use '@/theme/breakpoints' as bp;
              @use '@/theme/typography' as type;
              @use '@/theme/colors' as col;
              @use '@/theme/utilities' as util;
              @use '@/theme/animations' as animate;
            `
          }
        }
      }
    });
  },
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
    {
      from: './.docs/images',
      to: '/images'
    },
    {
      from: './.docs/images',
      to: '/docs/images'
    }
  ]
};
export default config;
