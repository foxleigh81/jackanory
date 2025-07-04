import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from 'storybook/test';

import { List } from './index';

const listItemData = [
  {
    id: '1',
    title: 'List item 1'
  },
  {
    id: '2',
    title: 'List item 2'
  },
  {
    id: '3',
    title: 'List item 3'
  }
];

const meta: Meta<typeof List> = {
  component: List,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    children: listItemData.map((item) => (
      <List.Item key={item.id}>{item.title}</List.Item>
    ))
  },
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: ['ordered', 'unordered', 'none']
    }
  }
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
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
      expect(list.children[0]).toHaveTextContent(listItemData[0].title);
      // Expect the second list item to be the second in the list
      expect(list.children[1]).toHaveTextContent(listItemData[1].title);
      // Expect the third list item to be the third in the list
      expect(list.children[2]).toHaveTextContent(listItemData[2].title);
    });
  }
};

export const OrderedList: Story = {
  args: {
    type: 'ordered'
  },
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an ordered list
      expect(list.tagName).toBe('OL');
    });
  }
};

export const UnorderedList: Story = {
  args: {
    type: 'unordered'
  },
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an unordered list
      expect(list.tagName).toBe('UL');
    });
  }
};
