import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Radio } from './index';
import { Label } from '../../data-input/label';

const meta: Meta<typeof Radio> = {
  component: Radio,
  args: {
    name: 'Radio'
  },
  argTypes: {
    onChange: { action: 'onChange' }
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Radio" id="radio" position="after">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Unchecked: Story = {
  args: {
    checked: false
  }
};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
