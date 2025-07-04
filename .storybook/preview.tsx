import type { Preview } from '@storybook/nextjs-vite';

import '@/theme/index.scss';

import {
  Meta,
  Story,
  Canvas,
  Description,
  ArgTypes,
  IconGallery,
  IconItem,
  ColorPalette,
  ColorItem,
  Subtitle,
  Primary,
  Source,
  Controls,
  Stories
} from '@storybook/addon-docs/blocks';

import Badge from './doc-blocks/badge';
import Tip from './doc-blocks/tip';
import WorksWith from './doc-blocks/works-with';
import Title from './doc-blocks/title';

const viewports = {
  iPhone15: {
    name: 'iPhone 15',
    styles: {
      width: '390px',
      height: '844px'
    }
  },
  iPhone15ProMax: {
    name: 'iPhone 15 Pro Max',
    styles: {
      width: '430px',
      height: '932px'
    }
  },
  iPhoneSE: {
    name: 'iPhone SE',
    styles: {
      width: '375px',
      height: '667px'
    }
  },
  samsungS24: {
    name: 'Samsung Galaxy S24',
    styles: {
      width: '393px',
      height: '853px'
    }
  },
  samsungS24Ultra: {
    name: 'Samsung Galaxy S24 Ultra',
    styles: {
      width: '480px',
      height: '1020px'
    }
  },
  googlePixel8: {
    name: 'Google Pixel 8',
    styles: {
      width: '411px',
      height: '869px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (10th Gen)',
    styles: {
      width: '820px',
      height: '1180px'
    }
  },
  samsungTabS9: {
    name: 'Samsung Galaxy Tab S9',
    styles: {
      width: '800px',
      height: '1280px'
    }
  },
  desktop: {
    name: 'Desktop (FHD)',
    styles: {
      width: '1920px',
      height: '1080px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '3440px',
      height: '1440px'
    }
  }
};

const parameters = {
  docs: {
    page: () => (
      <>
        <Title />
        <WorksWith />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
      </>
    ),
    components: {
      Meta,
      Story,
      Canvas,
      Primary,
      Source,
      Controls,
      Description,
      ArgTypes,
      IconGallery,
      IconItem,
      Badge,
      Title,
      Tip,
      WorksWith,
      ColorPalette,
      ColorItem
    }
  },

  options: {
    showSearchBox: true,
    storySort: {
      method: 'configure',
      includeName: true,
      order: [
        'Documentation',
        [
          'Introduction',
          'Getting Started',
          'Development Guide',
          'Experience Builder',
          'Styling Guide',
          'Widget Development',
          'Testing',
          'Roadmap',
          'Known Issues',
          'Changelog',
          'Architectural Decisions'
        ],
        'Widgets',
        ['Docs', ['Docs']]
      ]
    }
  },

  layout: 'centered',

  viewport: {
    viewports
  },

  controls: {
    expanded: true
  },

  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo'
  }
};

// Add global styles
const globalStyles = `
  body {
    font-family: 'Calibri', 'Helvetica', 'Arial', sans-serif;
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <style>{globalStyles}</style>
        <Story />
      </>
    )
  ],
  parameters
};

export default preview;
