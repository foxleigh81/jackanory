import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect, fn } from 'storybook/test';

// Import component files
import DialogBox from './index';

const meta: Meta<typeof DialogBox> = {
  component: DialogBox,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    title: 'Are you sure you want to delete this item?',
    confirmAction: action('confirmAction'),
    cancelAction: action('cancelAction')
  },
  argTypes: {
    confirmLabel: {
      control: {
        type: 'text'
      }
    },
    cancelLabel: {
      control: {
        type: 'text'
      }
    },
    fitContainer: {
      control: {
        type: 'boolean'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof DialogBox>;

export const Default: Story = {};

export const ButtonVariants: Story = {
  args: {
    confirmVariant: 'destroy',
    cancelVariant: 'primary'
  }
};

export const ConfirmOnly: Story = {
  args: {
    cancelAction: undefined,
    title: 'Press confirm to continue.'
  },
  play: async ({ canvasElement, step }) => {
    const dialgoue = within(canvasElement).getByRole('dialog');
    const confirmButton = within(dialgoue).getByText('Confirm');
    const cancelButton = within(dialgoue).queryByText('Cancel');

    await step('Confirm button is rendered', async () => {
      expect(confirmButton).toBeInTheDocument();
    });

    await step('Cancel button is not rendered', async () => {
      expect(cancelButton).not.toBeInTheDocument();
    });
  }
};

export const CustomLabels: Story = {
  args: {
    title: 'Are you still there?',
    confirmLabel: 'Yes',
    cancelLabel: 'No',
    cancelVariant: 'primary'
  },
  play: async ({ args, canvasElement, step }) => {
    const dialgoue = within(canvasElement).getByRole('dialog');
    const confirmButton = within(dialgoue).getByText('Yes');
    const cancelButton = within(dialgoue).getByText('No');

    await step('Custom labels are rendered correctly', async () => {
      await step('Confirm button renders custom label', () => {
        expect(confirmButton).toHaveTextContent(args.confirmLabel as string);
      });

      await step('Cancel button renders custom label', () => {
        expect(cancelButton).toHaveTextContent(args.cancelLabel as string);
      });
    });
  }
};

export const WithMessage: Story = {
  args: {
    ...CustomLabels.args,
    confirmVariant: 'primary',
    title: 'Are you using the Force?',
    message: "Luke, you've turned off your targeting computer."
  },
  play: async ({ args, canvasElement, step }) => {
    const dialgoue = within(canvasElement).getByRole('dialog');
    await step('Message is rendered', async () => {
      expect(dialgoue).toHaveTextContent(args.message as string);
    });
  }
};

export const FitContainer: Story = {
  args: {
    fitContainer: true
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', height: '200px' }}>
        <Story />
      </div>
    )
  ]
};

export const WithPlayFunction: Story = {
  args: {
    confirmAction: fn(),
    cancelAction: fn()
  },
  play: async ({ args, canvasElement, step }) => {
    const dialgoue = within(canvasElement).getByRole('dialog');
    const confirmButton = within(dialgoue).getByText('Confirm');
    const cancelButton = within(dialgoue).getByText('Cancel');

    await step('Component renders correctly', async () => {
      await step('Dialog is visible', () => {
        expect(dialgoue).toBeVisible();
      });

      await step('Confirm button is visible', () => {
        expect(confirmButton).toBeVisible();
      });

      await step('Cancel button is visible', () => {
        expect(cancelButton).toBeVisible();
      });

      await step('Title renders correctly', () => {
        expect(dialgoue).toHaveTextContent(args.title as string);
      });
    });

    await step('Actions are called correctly', async () => {
      await step('Confirm button triggers confirmAction', async () => {
        await userEvent.click(confirmButton);
        expect(args.confirmAction).toHaveBeenCalled();
      });

      await step('Cancel button triggers cancelAction', async () => {
        await userEvent.click(cancelButton);
        expect(args.cancelAction).toHaveBeenCalled();
      });
    });
  }
};
