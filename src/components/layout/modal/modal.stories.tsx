import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { action } from 'storybook/actions';
import { useState } from 'react';

// Import component files
import Modal from './index';
import { DialogBox } from '../../feedback/dialog-box';
import { Button } from '../../data-input/button';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    size: 'md',
    modalName: 'Test modal'
  },
  argTypes: {
    size: {
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg', 'xl']
    },
    isOpen: {
      control: {
        type: 'boolean'
      }
    },
    isAlert: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [showModal, setShowModal] = useState(false);

    const confirmAction = () => {
      action('confirmAction')();
      setShowModal(false);
    };

    const cancelAction = () => {
      action('cancelAction')();
      setShowModal(false);
    };

    return (
      <>
        <Modal
          {...args}
          isOpen={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <DialogBox
            title="Test title"
            confirmAction={confirmAction}
            cancelAction={cancelAction}
            fitContainer
          />
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show modal</Button>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const button = within(canvasElement).getByRole('button');

    await step('The Modal opens when the button is clicked', async () => {
      const body = canvasElement.ownerDocument.body;
      await userEvent.click(button);
      const modal = await within(body).findByTestId('modal');
      await expect(modal).toBeInTheDocument();
    });

    await step(
      'The Modal closes when the close button is clicked',
      async () => {
        const body = canvasElement.ownerDocument.body;
        const modal = await within(body).findByTestId('modal');
        const closeButton = await within(body).findAllByRole('button', {
          name: 'Close'
        });
        await userEvent.click(closeButton[0]);
        await expect(modal).not.toBeInTheDocument();
      }
    );
  }
};

export const VideoModal: Story = {
  render: ({ ...args }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Modal
          {...args}
          isOpen={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <video controls data-testid="video-element">
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show modal</Button>
      </>
    );
  },

  play: async ({ canvasElement, step }) => {
    const body = canvasElement.ownerDocument.body;
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);

    await step('Check video element is focused by default', async () => {
      const video = await within(body).findByTestId('video-element');
      await waitFor(() => {
        expect(document.activeElement).toBe(video);
      });
    });
  }
};

export const TabFocusModal: Story = {
  render: ({ ...args }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Modal
          {...args}
          isOpen={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <input data-testid="empty-input" />
          <div tabIndex={0} data-testid="focus-div">
            A focusable div
          </div>
          <button data-testid="click-me-btn">Click Me</button>
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show modal</Button>
      </>
    );
  },

  play: async ({ canvasElement, step }) => {
    const body = canvasElement.ownerDocument.body;
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);

    await step('Check tabbing cycles through tabbable elements', async () => {
      const input = await within(body).findByTestId('empty-input');
      const div = await within(body).findByTestId('focus-div');
      const button = await within(body).findByTestId('click-me-btn');
      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
      await userEvent.tab();
      await waitFor(() => {
        expect(document.activeElement).toBe(div);
      });
      await userEvent.tab();
      await waitFor(() => {
        expect(document.activeElement).toBe(button);
      });
      await userEvent.tab();
      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  }
};

export const NoFocusModal: Story = {
  render: ({ ...args }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Modal
          {...args}
          isOpen={showModal}
          onDismiss={() => setShowModal(false)}
        >
          <p>This is a modal without any focusable element.</p>
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show modal</Button>
      </>
    );
  },

  play: async ({ canvasElement, step }) => {
    const body = canvasElement.ownerDocument.body;
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);
    await step(
      'Check focus on remains on modal when no tabbable elements exist',
      async () => {
        const modal = await within(body).findByRole('dialog');
        await waitFor(async () => {
          await userEvent.tab();
          expect(document.activeElement).toBe(modal);
        });
      }
    );
  }
};

export const AlertModal: Story = {
  render: Default.render,
  args: {
    isAlert: true
  }
};

export const SmallModal: Story = {
  render: Default.render,
  args: {
    size: 'sm'
  }
};

export const LargeModal: Story = {
  render: Default.render,
  args: {
    size: 'lg'
  }
};

export const ExtraLargeModal: Story = {
  render: Default.render,
  args: {
    size: 'xl'
  }
};
