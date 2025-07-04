import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import component files
import { CardBody } from './index';

const meta: Meta<typeof CardBody> = {
  component: CardBody,
  args: {
    children: 'This is an example of a card body'
  },
  parameters: {
    worksWith: 'Cards'
  }
};

export default meta;

type Story = StoryObj<typeof CardBody>;

export const Default: Story = {};
