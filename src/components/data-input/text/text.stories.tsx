import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from './index';
import { Label } from '../../data-input/label';

const meta: Meta<typeof Text> = {
  component: Text,
  args: {
    name: 'text',
    type: 'text'
  },
  argTypes: {
    name: {
      description: 'The name of the input'
    },
    onChange: {
      description: 'The function to call when the input value changes',
      action: 'onChange',
      table: {
        disable: true
      }
    },
    type: {
      description: 'The type of input to render',
      options: [undefined, 'text', 'number', 'email', 'url', 'tel', 'password'],
      control: {
        type: 'select'
      }
    },
    status: {
      control: {
        type: 'select'
      }
    },
    value: {
      description: 'The value of the input',
      control: 'text'
    },
    placeholder: {
      description: 'The placeholder text to display when the input is empty',
      control: 'text'
    }
  },
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the input" id="text">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Please enter your text...'
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

export const OtherTypes: Story = {
  args: {
    type: 'number'
  }
};

export const Tel: Story = {
  args: {
    type: 'number'
  }
};

export const Email: Story = {
  args: {
    type: 'email'
  }
};

export const URL: Story = {
  args: {
    type: 'url'
  }
};
