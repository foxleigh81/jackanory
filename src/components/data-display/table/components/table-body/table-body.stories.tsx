import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Import components
import { TableBody } from './index';

const meta: Meta<typeof TableBody> = {
  component: TableBody,
  args: {
    children: (
      <tr>
        <td>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        </td>
      </tr>
    )
  },
  parameters: {
    previewLayout: 'vertical'
    // worksWith: 'TableFactory'
  },
  decorators: [(Story) => <table>{Story()}</table>]
};

export default meta;

type Story = StoryObj<typeof TableBody>;

export const Default: Story = {};
