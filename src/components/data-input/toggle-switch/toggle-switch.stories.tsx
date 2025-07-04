import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToggleSwitch } from './index';
import { Label } from '../../data-input/label';
import { action } from 'storybook/actions';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  tags: ['autodocs'],
  args: {
    name: 'toggle-switch',
    onChange: action('onChange')
  },
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the toggle" id="toggle">
        <Story />
      </Label>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    readOnly: true
  }
};

export const OnByDefault: Story = {
  args: {
    checked: true
  }
};
