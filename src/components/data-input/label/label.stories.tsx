import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './index';
import { Text } from '../../data-input/text';
import { Checkbox } from '../../data-input/checkbox';

const meta: Meta<typeof Label> = {
  component: Label,
  args: {
    text: 'Label text',
    id: 'text'
  }
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Text name="text" />
      </div>
    )
  ]
};
export const Required: Story = {
  args: {
    required: true
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Text name="text" />
      </div>
    )
  ]
};

export const Large: Story = {
  args: {
    larger: true
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Text name="text" />
      </div>
    )
  ]
};

export const Simulated: Story = {
  args: {
    simulated: true,
    id: undefined
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <span style={{ display: 'block' }}>Not an input</span>
      </div>
    )
  ]
};

export const InputAsChild: Story = {
  args: {
    parent: true,
    children: <Text name="text" />
  }
};

export const PositionBefore: Story = {
  args: {
    position: 'before',
    id: 'checkbox',
    children: <Checkbox name="checkbox" />
  }
};

export const PositionAfter: Story = {
  args: {
    position: 'after',
    id: 'checkbox',
    children: <Checkbox name="checkbox" />
  }
};
