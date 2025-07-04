import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import Dots from './index';

const meta: Meta<typeof Dots> = {
  component: Dots,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 10 }
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 10 }
    },
    onChange: { action: 'page changed' }
  }
};

export default meta;
type Story = StoryObj<typeof Dots>;

export const Default: Story = {
  args: {
    count: 5,
    currentPage: 1
  }
};

export const ManyPages: Story = {
  args: {
    count: 10,
    currentPage: 3
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dots = canvas.getAllByRole('button');

    // Test that the correct initial page is marked as current
    await expect(dots[2]).toHaveAttribute('aria-current', 'page'); // currentPage: 3, so index 2

    // Test that other dots don't have aria-current
    await expect(dots[0]).not.toHaveAttribute('aria-current', 'page');
    await expect(dots[5]).not.toHaveAttribute('aria-current', 'page');

    // Test that all dots have proper aria-labels
    dots.forEach((dot, index) => {
      expect(dot).toHaveAttribute('aria-label', `Go to page ${index + 1}`);
    });
  }
};

export const WithoutTooltips: Story = {
  args: {
    count: 5,
    currentPage: 1,
    showTooltips: false
  }
};

export const WithPageDisplay: Story = {
  args: {
    count: 5,
    currentPage: 1
  },
  decorators: [
    (Story, context) => {
      const [currentPage, setCurrentPage] = useState(context.args.currentPage);
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Story
            args={{ ...context.args, currentPage, onChange: setCurrentPage }}
          />
          <p>Current page: {currentPage}</p>
        </div>
      );
    }
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dots = canvas.getAllByRole('button');

    // Test initial state
    await expect(dots[0]).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByText('Current page: 1')).toBeInTheDocument();

    // Test clicking on a different page
    await userEvent.click(dots[2]); // Click page 3
    await expect(dots[2]).toHaveAttribute('aria-current', 'page');
    await expect(dots[0]).not.toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByText('Current page: 3')).toBeInTheDocument();

    // Test clicking on another page
    await userEvent.click(dots[4]); // Click page 5
    await expect(dots[4]).toHaveAttribute('aria-current', 'page');
    await expect(dots[2]).not.toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByText('Current page: 5')).toBeInTheDocument();
  }
};
