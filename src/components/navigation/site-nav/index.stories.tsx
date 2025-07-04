import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SiteNav, { type SiteNavLink } from './index';

const meta = {
  component: SiteNav,
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    links: {
      control: 'object',
      description:
        'An array of link objects, each with href and label properties.'
    },
    activeHref: {
      control: 'text',
      description: 'The href of the link to be marked as active.'
    },
    currentLink: {
      control: 'text',
      description:
        'The href of the current page link (makes it bold, underlined, and inactive).'
    },
    ariaLabel: {
      control: 'text',
      description: 'Optional aria-label for the navigation element.'
    }
  }
} satisfies Meta<typeof SiteNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const internalLinks: SiteNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const mixedLinks: SiteNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: 'https://jackanory.spacenectar.io/', label: 'Jackanory' }
];

/**
 * Default navigation with internal links only.
 */
export const InternalLinks: Story = {
  args: {
    links: internalLinks
  }
};

/**
 * Navigation with mixed internal and external links.
 * External links open in a new tab.
 */
export const MixedLinks: Story = {
  args: {
    links: mixedLinks
  }
};

/**
 * Navigation with an active link highlighted.
 */
export const ActiveLink: Story = {
  args: {
    links: internalLinks,
    activeHref: '/about'
  }
};

/**
 * Navigation with current page link (bold, underlined, and inactive).
 * Current links are non-clickable and represent the page you're currently on.
 */
export const CurrentLink: Story = {
  args: {
    links: internalLinks,
    currentLink: '/'
  }
};
