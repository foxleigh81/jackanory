import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from 'storybook/test';

// Import component files
import RagStatusBanner from './index';
import styles from './styles.module.scss';

const meta: Meta<typeof RagStatusBanner> = {
  component: RagStatusBanner,
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['red', 'amber', 'green', 'grey', 'blue']
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof RagStatusBanner>;

export const Default: Story = {
  args: {
    status: 'green',
    title: 'System Status: Operational',
    body: 'All systems are running normally and no issues have been detected.'
  }
};

export const RedStatus: Story = {
  args: {
    status: 'red',
    title: 'Critical Alert',
    body: 'Multiple system failures detected. Immediate attention required.'
  }
};

export const AmberStatus: Story = {
  args: {
    status: 'amber',
    title: 'Warning Notice',
    body: 'Some minor issues detected. Monitoring the situation closely.'
  }
};

export const GreenStatus: Story = {
  args: {
    status: 'green',
    title: 'All Clear',
    body: 'Everything is functioning properly. No action needed.'
  }
};

export const GreyStatus: Story = {
  args: {
    status: 'grey',
    title: 'System Offline',
    body: 'Monitoring systems are currently offline. Status unavailable.'
  }
};

export const BlueStatus: Story = {
  args: {
    status: 'blue',
    title: 'Information Notice',
    body: 'This is an informational message about system updates.'
  }
};

export const WithHtmlContent: Story = {
  args: {
    status: 'amber',
    title: 'Maintenance Scheduled',
    body: (
      <div>
        <p>Scheduled maintenance will occur on:</p>
        <ul>
          <li>Server maintenance: 2:00 AM - 4:00 AM</li>
          <li>Database updates: 4:00 AM - 5:00 AM</li>
        </ul>
        <p>
          For more information, <a href="#">click here</a>.
        </p>
      </div>
    )
  }
};

export const WithPlayFunction: Story = {
  args: {
    status: 'red',
    title: 'System Alert',
    body: 'This is a critical system alert requiring immediate attention.'
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Banner renders with correct status styling', async () => {
      const title = canvas.getByText(args.title);
      const banner = title.parentElement; // Go up to the banner container
      // Check for the SCSS module class for the status
      expect(banner).toHaveClass(styles.red);
      expect(banner).toHaveClass(styles['rag-banner']);
    });

    await step('Title is displayed with correct text and styling', async () => {
      const title = canvas.getByText(args.title);
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass(styles.title);
    });

    await step('Body content is displayed with correct styling', async () => {
      const body = canvas.getByText(args.body as string);
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass(styles.body);
    });
  }
};
