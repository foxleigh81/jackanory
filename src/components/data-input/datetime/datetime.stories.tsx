import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from '../../data-input/label';
import { Datetime } from './index';

const meta: Meta<typeof Datetime> = {
  component: Datetime,
  args: {
    name: 'Datetime'
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
      <Label text="Label for the input" id="datetime">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Datetime>;

export const Default: Story = {};
export const Disabled: Story = {
  args: {
    disabled: true
  }
};
