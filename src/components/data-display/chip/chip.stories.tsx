import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Chip } from './index';

const meta: Meta<typeof Chip> = {
  component: Chip,
  args: {
    text: 'Example',
    onDelete: undefined
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['default', 'success', 'warning', 'danger', 'info']
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Chip>;

const deleteFunction = () => {
  alert('Chip deleted');
};

export const Default: Story = {};

export const WithCancel: Story = {
  args: {
    onDelete: deleteFunction,
    'aria-label': 'Delete example chip'
  }
};

export const SuccessStatus: Story = {
  args: {
    status: 'success'
  }
};

export const WarningStatus: Story = {
  args: {
    status: 'warning'
  }
};

export const DangerStatus: Story = {
  args: {
    status: 'danger'
  }
};

export const InfoStatus: Story = {
  args: {
    status: 'info'
  }
};
