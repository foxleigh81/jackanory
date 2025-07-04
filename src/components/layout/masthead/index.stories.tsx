import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Masthead from './index';

const meta: Meta<typeof Masthead> = {
  component: Masthead,
  parameters: {
    layout: 'fullscreen' // Use fullscreen layout as it's a header
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Masthead>;

const defaultNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' }
];

export const Default: Story = {
  args: {
    navLinks: defaultNavLinks
  }
};

/**
 * Masthead with current page highlighted (Home page).
 * Note: In Storybook, the current route will be detected automatically.
 */
export const WithCurrentPage: Story = {
  args: {
    navLinks: defaultNavLinks
  }
};

/**
 * Masthead with current page highlighted (About page).
 * Note: In Storybook, the current route will be detected automatically.
 */
export const WithCurrentAbout: Story = {
  args: {
    navLinks: defaultNavLinks
  }
};
