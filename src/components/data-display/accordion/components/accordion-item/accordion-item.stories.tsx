import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, userEvent, expect, fn } from 'storybook/test';

// Import component files
import { AccordionItem } from './index';

const meta: Meta<typeof AccordionItem> = {
  component: AccordionItem,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    header: 'Test header',
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  }
};

export default meta;

type Story = StoryObj<typeof AccordionItem>;

export const Default: Story = {};

export const ExternalControl: Story = {
  args: {
    isOpen: true
  }
};

export const DifferentHeaderTag: Story = {
  args: {
    headerLevel: 'h2'
  }
};

export const ClickHandler: Story = {
  args: {
    onClick: action('onClick')
  }
};

export const ClickHandlerWithEvent: Story = {
  args: {
    onClick: (e) => action('onClick')(e?.target)
  }
};

export const WithPlayFunction: Story = {
  args: {
    onClick: fn()
  },
  play: async ({ args, canvasElement, step }) => {
    const itemHeader = within(canvasElement).getByRole('button');
    const itemBody = within(canvasElement).getByRole('region');
    await step('The accordion item is rendered', async () => {
      expect(itemHeader).toBeTruthy();
      expect(itemBody).toBeTruthy();
    });
    await step('The accordion item is closed', async () => {
      expect(itemHeader.getAttribute('aria-expanded')).toBe('false');
    });
    await step('The accordion item is opened', async () => {
      await userEvent.click(itemHeader);
      expect(itemHeader.getAttribute('aria-expanded')).toBe('true');
    });
    await step('The onClick handler is called', async () => {
      expect(args.onClick).toHaveBeenCalled();
    });
    await step('The accordion item is closed again', async () => {
      await userEvent.click(itemHeader);
      expect(itemHeader.getAttribute('aria-expanded')).toBe('false');
    });
  }
};
