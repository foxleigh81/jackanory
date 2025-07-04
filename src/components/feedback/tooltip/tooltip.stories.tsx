import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, waitFor, expect } from 'storybook/test';
import { useState } from 'react';

import { useArgs } from 'storybook/preview-api';

import Tooltip from './index';
import Button from '@/components/data-input/button';
import Chip from '@/components/data-display/chip';

const meta: Meta = {
  component: Tooltip,
  args: {
    content: 'Tooltip content'
  },
  argTypes: {
    isVisible: {
      control: {
        type: 'boolean'
      }
    },
    placement: {
      control: {
        type: 'select'
      },
      options: ['top', 'bottom', 'left', 'right']
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          placeContent: 'center',
          width: '100%',
          padding: '5rem 3rem'
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: <Button>Hover over or Focus me!</Button>
  },
  play: async ({ canvasElement, step }) => {
    const button = await within(canvasElement).findByRole('button');
    const body = canvasElement.ownerDocument.body;

    await step('Tooltip is not visible by default', async () => {
      const tooltip = await within(body).queryByTestId('tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    await step('Hovering over button shows tooltip', async () => {
      await userEvent.hover(button);
      const tooltip = await within(body).findByTestId('tooltip');
      expect(tooltip).toBeVisible();
    });

    await step('Tooltip content is correct', async () => {
      const tooltip = await within(body).findByTestId('tooltip');
      expect(tooltip).toHaveTextContent('Tooltip content');
    });

    await step('Unhovering button hides tooltip', async () => {
      await userEvent.unhover(button);
      const tooltip = await within(body).queryByTestId('tooltip');
      await waitFor(() => expect(tooltip).not.toBeInTheDocument());
    });

    await step('Focusing the button shows the tooltip', async () => {
      await userEvent.tab();
      const tooltip = await within(body).findByTestId('tooltip');
      expect(tooltip).toBeVisible();
    });

    await step('Unfocusing the button hides the tooltip', async () => {
      await userEvent.tab({ shift: true });
      const tooltip = await within(body).queryByTestId('tooltip');
      await waitFor(() => expect(tooltip).not.toBeInTheDocument());
    });
  }
};

export const Bottom: Story = {
  args: {
    ...Default.args,
    placement: 'bottom'
  }
};

export const Top: Story = {
  args: {
    ...Default.args,
    placement: 'top'
  }
};

export const Left: Story = {
  args: {
    ...Default.args,
    placement: 'left'
  }
};

export const Right: Story = {
  args: {
    ...Default.args,
    placement: 'right'
  }
};

export const SmallTarget: Story = {
  args: {
    placement: 'bottom',
    content: 'Small target',
    children: (
      <button
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'pink',
          cursor: 'pointer'
        }}
      />
    )
  }
};

export const LongTooltip: Story = {
  args: {
    placement: 'top',
    content: "Smoke me a kipper, I'll be back before breakfast",
    children: (
      <button
        style={{
          width: '110px',
          backgroundColor: 'antiqueWhite',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        🐟
      </button>
    )
  }
};

export const Visible: Story = {
  args: {
    isVisible: true,
    children: <Button>My tooltip always displays</Button>
  }
};

export const Disabled: Story = {
  args: {
    isVisible: false,
    children: <Button>My tooltip is disabled</Button>
  }
};

export const TooltipOnSpan: Story = {
  args: {
    children: <span tabIndex={0}>Hover over or Focus me!</span>
  }
};

export const ControlledShow: Story = {
  args: {
    isVisible: false,
    placement: 'right',
    content: 'See, told you!',
    children: <Chip text="I have a tooltip!" />
  },
  decorators: [
    (Story, context) => {
      const [isVisible, setIsVisible] = useState(context.args.isVisible);

      return (
        <div>
          <Story args={{ ...context.args, isVisible }} />
          <Button
            onClick={() => setIsVisible(!isVisible)}
            style={{ marginTop: '2rem' }}
          >
            {isVisible ? 'Hide' : 'Show'} tooltip
          </Button>
        </div>
      );
    }
  ],
  play: async ({ canvasElement, step }) => {
    const body = canvasElement.ownerDocument.body;

    await step('Tooltip is not visible by default', async () => {
      const tooltip = await within(body).queryByTestId('tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    await step('Toggle button is present and functional', async () => {
      const button = await within(canvasElement).findByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Show tooltip');
    });

    await step('Button click shows tooltip', async () => {
      const button = await within(canvasElement).findByRole('button');
      await userEvent.click(button);

      // Wait for React state update
      await waitFor(() => {
        const tooltip = within(body).queryByTestId('tooltip');
        expect(tooltip).toBeInTheDocument();
      });

      const tooltip = await within(body).findByTestId('tooltip');
      expect(tooltip).toBeVisible();
      expect(tooltip).toHaveTextContent('See, told you!');
    });
  }
};
