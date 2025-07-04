import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect } from 'storybook/test';

// Import component files
import ListFactory from './index';

import Avatar from '@/components/data-display/avatar';

const meta: Meta<typeof ListFactory> = {
  component: ListFactory,
  parameters: {
    previewLayout: 'vertical'
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ],
  args: {
    onItemClick: undefined
  }
};

export default meta;

type Story = StoryObj<typeof ListFactory>;

export const Default: Story = {
  args: {
    items: [
      {
        content: <p>List Item 1</p>
      },
      {
        content: <p>List Item 2</p>
      },
      {
        content: <p>List Item 3</p>
      }
    ]
  }
};

export const WithClickableItems: Story = {
  args: {
    ...Default.args,
    onItemClick: action(`Item clicked`)
  },
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an unordered list
      expect(list.tagName).toBe('UL');
    });
    await step('The list items are rendered correctly', async () => {
      // Expect the first list item to be the first in the list
      expect(list.children[0]).toHaveTextContent('List Item 1');
      // Expect the second list item to be the second in the list
      expect(list.children[1]).toHaveTextContent('List Item 2');
      // Expect the third list item to be the third in the list
      expect(list.children[2]).toHaveTextContent('List Item 3');
    });
    await step('The list items are clickable', async () => {
      const button = within(list.children[0] as HTMLElement).getByRole(
        'button'
      );
      await step(
        'The first child of the list item should be a button',
        async () => {
          expect(button).toBeInTheDocument();
        }
      );
      await step(
        'Clicking the button should apply the "active" class to the list item',
        async () => {
          await userEvent.click(button);
          expect(list.children[0].getAttribute('class')).toContain('active');
        }
      );
    });
  }
};

export const WithCustomClickHandlerOnEachItem: Story = {
  args: {
    items: [
      {
        content: <p>List Item 1</p>,
        onClick: action('custom onClick for item 1')
      },
      {
        content: <p>List Item 2</p>,
        onClick: action('custom onClick for item 2')
      },
      {
        content: <p>List Item 3</p>,
        onClick: action('custom onClick for item 3')
      }
    ]
  }
};

export const OrderedList: Story = {
  args: {
    ...Default.args,
    type: 'ordered'
  }
};

export const UnorderedList: Story = {
  args: {
    ...Default.args,
    type: 'unordered'
  }
};

export const SetActiveItem: Story = {
  args: {
    ...WithClickableItems.args,
    activeItem: 1
  }
};

export const UserListExample: Story = {
  args: {
    onItemClick: (e) => {
      action('Item clicked')(e);
    },
    items: [
      {
        content: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Avatar name="Peter Parker" colour="red" />
            <p>Peter Parker</p>
          </div>
        )
      },
      {
        content: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Avatar name="Mary Jane Watson" colour="orange" />
            <p>Mary Jane Watson</p>
          </div>
        )
      }
    ]
  }
};
