import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import component files
import { CardHeader } from './index';

const meta: Meta<typeof CardHeader> = {
  component: CardHeader,
  args: {
    children: 'This is a card header'
  },
  parameters: {
    worksWith: 'Cards'
  }
};

export default meta;

type Story = StoryObj<typeof CardHeader>;

export const Default: Story = {};

export const PrimaryHeader: Story = {
  args: {
    bg: 'primary'
  }
};

export const SecondaryHeader: Story = {
  args: {
    bg: 'secondary'
  }
};

export const SuccessHeader: Story = {
  args: {
    bg: 'success'
  }
};

export const WarningHeader: Story = {
  args: {
    bg: 'warning'
  }
};

export const DangerHeader: Story = {
  args: {
    bg: 'danger'
  }
};

export const InfoHeader: Story = {
  args: {
    bg: 'info'
  }
};
