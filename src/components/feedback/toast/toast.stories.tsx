import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { action } from 'storybook/actions';

import { Toast } from './index';

const meta: Meta<typeof Toast> = {
  component: Toast,
  args: {
    children: 'This is an example of a default toast.',
    isVisible: true,
    autoClose: 5000,
    closeToast: action('Toast closed.')
  },
  parameters: {
    previewLayout: 'vertical'
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '5rem' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    type: 'success'
  }
};

export const Error: Story = {
  args: {
    type: 'error'
  }
};

export const Warning: Story = {
  args: {
    type: 'warning'
  }
};

export const Info: Story = {
  args: {
    type: 'info',
    closeToast: fn()
  },
  play: async ({ args, canvasElement, step }) => {
    const toast = within(canvasElement).getByRole('alert');
    const closeButton = within(toast).getByRole('button');

    await step('The toast renders with the info type.', () => {
      expect(toast).toHaveAttribute('class', expect.stringContaining('info'));
    });

    await step('The toast renders with the correct content.', () => {
      expect(toast).toHaveTextContent('This is an example of a default toast.');
    });

    await step(
      'Clicking the close button fires the closeToast method.',
      async () => {
        await userEvent.click(closeButton);
        expect(args.closeToast).toHaveBeenCalled();
      }
    );
  }
};
