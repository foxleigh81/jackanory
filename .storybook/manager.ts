import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const startCase = (str: string) =>
  str
    ? str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> camel Case
        .replace(/[-_]/g, ' ') // kebab-case snake_case -> kebab case snake case
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // URLShort -> URL Short
        .toLowerCase()
        .split(/[^a-z0-9]+/) // Split by non-alphanumeric
        .filter(Boolean) // Remove empty parts
        .map((w: string) => w[0].toUpperCase() + w.slice(1)) // Capitalize first letter
        .join(' ') // Join with spaces
    : '';

addons.setConfig({
  sidebar: {
    showRoots: false,
    collapsedRoots: ['src'],
    renderLabel: ({ name, type }) => {
      if (type === 'story') {
        // Extract just the widget name from the full path
        const parts = name.split('/');
        return parts[parts.length - 1];
      }
      return startCase(name);
    }
  },
  theme: create({
    base: 'dark',
    brandTitle: 'Jackanory Design System',
    brandImage: './jackanory-text-logo.png',
    brandTarget: '_self',
    appBg: '#081c40'
  })
});
