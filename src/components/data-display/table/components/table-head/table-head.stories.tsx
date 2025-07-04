import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import components
import { TableHead } from './index';

const meta: Meta<typeof TableHead> = {
  component: TableHead,
  args: {
    children: (
      <tr>
        <th>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        </th>
      </tr>
    )
  },
  // parameters: {
  //   worksWith: 'TableFactory'
  // },
  decorators: [(Story) => <table>{Story()}</table>]
};

export default meta;

type Story = StoryObj<typeof TableHead>;

export const Default: Story = {};

export const WithSolidHeader: Story = {
  args: {
    solid: true
  }
};
