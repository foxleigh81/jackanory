import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { RadioGroup } from './index';

import options from '@/libs/mocks/options';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  args: {
    options,
    name: 'form-group',
    groupLabel: 'Radio group',
    onChange: (e) => action('You have selected:')(e.target.value)
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  }
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const VerticalLayout: Story = {
  args: {
    orientation: 'vertical'
  }
};

export const DefaultChecked: Story = {
  args: {
    name: 'form-group-checked',
    options: [
      ...options,
      {
        label: 'Option 4',
        value: '4',
        checked: true
      }
    ]
  }
};

export const DisabledOption: Story = {
  args: {
    name: 'form-group-disabled',
    options: [
      ...options,
      {
        label: 'Option 4',
        value: '4',
        disabled: true
      }
    ]
  }
};
