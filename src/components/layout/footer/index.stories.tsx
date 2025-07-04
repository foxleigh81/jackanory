import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from './index';
import { expect, waitFor } from 'storybook/test';

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    version: {
      control: 'text',
      description: 'The application version number.'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '100px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    version: '1.01'
  },
  play: async ({ canvasElement, step }) => {
    const footer = canvasElement.querySelector('footer');
    await step('Footer is rendered', async () => {
      expect(footer).toBeInTheDocument();
    });
  }
};
