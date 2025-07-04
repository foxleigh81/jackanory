import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, userEvent, expect } from 'storybook/test';

import styles from './story-styles.module.scss';

// Import component files
import FlipContainer from './index';
import { Button } from '@/components/data-input/button';
import { useState } from 'react';

const Front = (
  <div className={styles['front']}>
    <span>Front</span>
  </div>
);

const Back = (
  <div className={styles['back']}>
    <span>Back</span>
  </div>
);

const meta: Meta = {
  component: FlipContainer,
  args: {
    front: Front,
    back: Back,
    onFlip: action('onFlip')
  },
  argTypes: {
    flipType: {
      control: {
        type: 'select'
      },
      options: ['click', 'hover', 'controlled']
    },
    isFlipped: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    previewLayout: 'vertical'
  },
  decorators: [
    (Story) => (
      <div className={styles['story-wrapper']}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof FlipContainer>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const flipContainer =
      await within(canvasElement).findByTestId('flip-container');

    await step('Front is visible', () => {
      expect(flipContainer).toContainHTML('Front');
    });

    await step('Flip to back', async () => {
      await userEvent.click(flipContainer);
      expect(flipContainer).toContainHTML('Back');
    });

    await step('Flip to front', async () => {
      await userEvent.click(flipContainer);
      expect(flipContainer).toContainHTML('Front');
    });
  }
};

export const HoverFlip: Story = {
  args: {
    flipType: 'hover'
  },
  play: async ({ canvasElement, step }) => {
    const flipContainer =
      await within(canvasElement).findByTestId('flip-container');

    await step('Front is visible', () => {
      expect(flipContainer).toContainHTML('Front');
    });

    await step('Hover to back', async () => {
      await userEvent.hover(flipContainer);
      expect(flipContainer).toContainHTML('Back');
    });

    await step('Hover to front', async () => {
      await userEvent.unhover(flipContainer);
      expect(flipContainer).toContainHTML('Front');
    });
  }
};

export const ControlledFlip: Story = {
  args: {
    flipType: 'controlled'
  },
  decorators: [
    (Story, context) => {
      const [isFlipped, setIsFlipped] = useState(false);

      // Update the args to include the isFlipped state
      context.args.isFlipped = isFlipped;

      return (
        <>
          <div className={styles['story-wrapper']}>
            <Button
              className={styles['flip-button']}
              onClick={() => setIsFlipped(!isFlipped)}
              label="Flip!"
            />
            <Story />
          </div>
        </>
      );
    }
  ],
  play: async ({ canvasElement, step }) => {
    const flipContainer =
      await within(canvasElement).findByTestId('flip-container');
    const flipButton = await within(canvasElement).findByText('Flip!');

    await step('Front is visible', () => {
      expect(flipContainer).toContainHTML('Front');
    });

    await step('Flip to back', async () => {
      await userEvent.click(flipButton);
      expect(flipContainer).toContainHTML('Back');
    });

    await step('Flip to front', async () => {
      await userEvent.click(flipButton);
      expect(flipContainer).toContainHTML('Front');
    });
  }
};
