import { Metadata } from '@/libs/types/metadata';

export const SITE_NAME = 'Jackanory';
export const VERSION = '1.0.0';

export const DEFAULT_METADATA: Metadata = {
  title: `${SITE_NAME}`,
  description: `${SITE_NAME} is a modern design system, component library and application development kit built with Next.js`
};

export const MAIN_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];
