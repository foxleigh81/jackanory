import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Loader from './index';

const meta: Meta<typeof Loader> = {
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    className: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {}
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-loader-class'
  }
};

export const InContainer: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <h3>Loading your content</h3>
      <Loader />
      <p>Please wait...</p>
    </div>
  )
};
