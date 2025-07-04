import type { StoryObj, Meta } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, expect } from 'storybook/test';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';

import { Button, buttonVariants } from './index';
import type { IconTypes } from '../../data-display/icon';
import icons from '../../data-display/icon';

// Define a limited set of icons for Storybook controls
const builtInIcons = ['edit', 'delete', 'add', 'check', 'close'] as const;

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    variant: 'primary',
    label: 'Button',
    onClick: action('onClick')
  },
  argTypes: {
    onClick: {
      action: 'onClick'
    },
    variant: {
      options: buttonVariants
    },
    icon: {
      control: {
        type: 'select'
      },
      options: [undefined, ...builtInIcons]
    },
    alignIcon: {
      control: {
        type: 'inline-radio'
      },
      options: ['left', 'right'],
      if: { arg: 'icon' }
    },
    hideLabel: {
      control: {
        type: 'boolean'
      },
      if: { arg: 'icon' }
    },
    small: {
      control: {
        type: 'boolean'
      }
    },
    transparent: {
      control: {
        type: 'boolean'
      }
    },
    circular: {
      control: {
        type: 'boolean'
      }
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    },
    loadingIndicator: {
      control: {
        type: 'text'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    link: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    status: 'alpha',
    controls: {
      exclude: ['onClick'],
      sort: 'requiredFirst'
    },
    storySource: {
      source: '<Button />',
      importPath: "import { Button } from 'components"
    },
    permutation: {
      scope: {
        Button
      },
      deactivate: ['icon']
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary = {
  args: {
    variant: 'secondary'
  }
};

export const Transparent = {
  args: {
    transparent: true
  }
};

export const Disabled: Story = {
  name: 'disabled',
  args: {
    disabled: true
  }
};

// Create and destroy buttons

export const Create: Story = {
  args: {
    variant: 'create',
    label: 'Create'
  }
};

export const Destroy: Story = {
  args: {
    variant: 'destroy',
    label: 'Destroy'
  }
};

export const WithChildren: Story = {
  args: {
    variant: 'primary',
    label: undefined,
    children: <span>Children instead of props</span>
  }
};

export const DisplayAsLink: Story = {
  args: {
    link: true,
    label: 'Still a button'
  }
};

// Circular buttons

export const Circular: Story = {
  args: {
    label: 'add',
    circular: true
  }
};

// Icon buttons

export const WithIcon: Story = {
  args: {
    icon: 'edit',
    label: 'Edit'
  }
};

export const IconLeft: Story = {
  args: {
    icon: 'edit',
    alignIcon: 'left',
    label: 'Edit'
  }
};

export const IconRight: Story = {
  args: {
    icon: 'edit',
    alignIcon: 'right',
    label: 'Edit'
  }
};

export const IconOnly: Story = {
  args: {
    hideLabel: true,
    label: 'Edit',
    icon: 'edit'
  }
};

// Custom React icons

export const WithCustomIcon: Story = {
  args: {
    icon: <FaStar />,
    label: 'Star'
  },
  parameters: {
    controls: {
      exclude: ['icon']
    }
  }
};

export const CustomIconOnly: Story = {
  args: {
    icon: <FaStar />,
    label: 'Star',
    hideLabel: true,
    circular: true
  },
  parameters: {
    controls: {
      exclude: ['icon']
    }
  }
};

export const CustomIconRight: Story = {
  args: {
    icon: <FaEdit />,
    label: 'Edit',
    alignIcon: 'right'
  },
  parameters: {
    controls: {
      exclude: ['icon']
    }
  }
};

export const CustomIconWithVariant: Story = {
  args: {
    icon: <FaTrash />,
    label: 'Delete',
    variant: 'destroy'
  },
  parameters: {
    controls: {
      exclude: ['icon']
    }
  }
};

// Small buttons

export const Small: Story = {
  args: {
    small: true,
    label: 'Small'
  }
};

export const SmallWithIcon: Story = {
  args: {
    small: true,
    label: 'Edit',
    hideLabel: true,
    icon: 'edit'
  }
};

export const SmallWithIconAndLabel: Story = {
  args: {
    small: true,
    icon: 'edit',
    label: 'Edit'
  }
};

// Loading state

export const Loading: Story = {
  args: {
    label: 'Loading',
    isLoading: true,
    loadingIndicator: 'Loading...'
  }
};

export const ButtonWithAction: Story = {
  args: {
    label: 'Click me'
  },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    expect(button).toHaveTextContent(args.label as string);
  }
};
