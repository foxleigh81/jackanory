import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './index';
import { Label } from '../../data-input/label';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  args: {
    name: 'Textarea',
    rows: 5
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
      <Label text="Label for the input" id="textarea">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Please enter your textarea...'
  }
};

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

export const ExtraRows: Story = {
  args: {
    rows: 10
  }
};
