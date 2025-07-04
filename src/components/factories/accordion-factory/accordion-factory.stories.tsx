import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect } from 'storybook/test';

// Import component files
import AccordionFactory from './index';

const accordionContent = [
  {
    header: 'Test header 1',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  },
  {
    header: 'Test header 2',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  },
  {
    header: 'Test header 3',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  }
];

const meta: Meta<typeof AccordionFactory> = {
  component: AccordionFactory,
  args: {
    items: accordionContent
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof AccordionFactory>;

export const Default: Story = {};

export const WithOpenItem: Story = {
  args: {
    items: [
      ...accordionContent.map((item, index) => ({
        ...item,
        isOpen: index === 1
      }))
    ]
  }
};

export const AllowMultipleOpenItems: Story = {
  args: {
    allowMultiple: true
  }
};

export const WithDifferentHeaderLevel: Story = {
  args: {
    headerLevel: 'h2'
  }
};

export const WithClickHandler: Story = {
  args: {
    items: accordionContent.map(({ header, body }) => ({
      header,
      body,
      onClick: action(`Clicked ${header}`)
    }))
  }
};

export const WithPlayFunction: Story = {
  args: {
    ...WithClickHandler.args,
    allowMultiple: true
  },
  play: async ({ args, canvasElement, step }) => {
    const component = within(canvasElement).getByTestId('accordion-factory');
    const itemHeaders = within(component).getAllByRole('button');
    const itemBodies = within(component).getAllByRole('region');
    await step('The accordion items are rendered', async () => {
      expect(itemHeaders).toHaveLength(args.items.length);
      expect(itemBodies).toHaveLength(args.items.length);
    });
    await step('The accordion items are closed', async () => {
      itemHeaders.forEach((itemHeader) => {
        expect(itemHeader.getAttribute('aria-expanded')).toBe('false');
      });
    });
    await step('The accordion items can be opened', async () => {
      for (const itemHeader of itemHeaders) {
        await userEvent.click(itemHeader);
        expect(itemHeader.getAttribute('aria-expanded')).toBe('true');
      }
    });
  }
};
