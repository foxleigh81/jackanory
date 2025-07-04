import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './index';
import icons from './components';
import { expect } from 'storybook/test';

const meta: Meta<typeof Icon> = {
  component: Icon,
  args: {
    use: 'edit',
    size: 50
  },
  argTypes: {
    use: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    },
    fill: {
      control: {
        type: 'color'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {};

Primary.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const svg = canvasElement.querySelector('svg');
  expect(svg).toBeInTheDocument();
  if (!svg) throw new Error('SVG element not found in Primary story');

  expect(svg.tagName.toLowerCase()).toBe('svg');
  expect(svg).toHaveAttribute('fill', 'currentColor');
  expect(svg).toHaveAttribute('width', '50');
  expect(svg).toHaveAttribute('xmlns');
  expect(svg).toHaveAttribute('viewBox');
};

export const CustomFill = {
  args: {
    fill: 'rebeccapurple'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const svg = canvasElement.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (!svg) throw new Error('SVG element not found in CustomFill story');

    expect(svg).toHaveAttribute('fill', 'rebeccapurple');
  }
};
