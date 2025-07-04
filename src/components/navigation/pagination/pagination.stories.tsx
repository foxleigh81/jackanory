import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { within, userEvent, waitFor, expect } from 'storybook/test';
import { useState } from 'react';
// Import component files
import Pagination from './index';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 5,
    count: 10
  },
  decorators: [
    (Story, context) => {
      const [currentPage, setCurrentPage] = useState(context.args.page);
      return (
        <Story
          args={{
            ...context.args,
            page: currentPage,
            onChange: (page: number) => {
              action('Go to page')(page);
              setCurrentPage(page);
            }
          }}
        />
      );
    }
  ],
  play: async ({ canvasElement, step }) => {
    const pagination = within(canvasElement).getByRole('navigation');

    await step(
      'Pagination is rendered with the correct pages and page 5 is selected',
      () => {
        const buttons = within(pagination).getAllByRole('button');
        console.log('Total buttons:', buttons.length);
        buttons.forEach((button, index) => {
          console.log(`Button ${index}:`, {
            text: button.textContent,
            ariaCurrent: button.getAttribute('aria-current'),
            ariaLabel: button.getAttribute('aria-label')
          });
        });

        expect(buttons.length).toEqual(9);
        // Based on itemList: ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
        // Index 0: previous, 1: page 1, 2: ellipsis, 3: page 4, 4: page 5, 5: page 6, 6: ellipsis, 7: page 10, 8: next
        const page5Button = buttons[4]; // page 5 is at index 4
        expect(page5Button).toHaveAttribute('aria-current', 'page');
        expect(page5Button).toHaveTextContent('5');
        expect(buttons[1]).toHaveTextContent('1');
        expect(buttons[2]).toHaveTextContent('…');
        expect(buttons[3]).toHaveTextContent('4');
        expect(buttons[5]).toHaveTextContent('6');
        expect(buttons[6]).toHaveTextContent('…');
        expect(buttons[7]).toHaveTextContent('10');
      }
    );

    await step(
      'Previous button is enabled on page 5 and has correct label',
      () => {
        const buttons = within(pagination).getAllByRole('button');
        const previousButton = buttons[0];
        expect(previousButton).toBeEnabled();
        expect(previousButton).toHaveAttribute(
          'aria-label',
          'Go to previous page'
        );
      }
    );

    await step('Next button is enabled on page 5 and has correct label', () => {
      const buttons = within(pagination).getAllByRole('button');
      const nextButton = buttons[buttons.length - 1];
      expect(nextButton).toBeEnabled();
      expect(nextButton).toHaveAttribute('aria-label', 'Go to next page');
    });

    await step('Clicking next button goes to next page', async () => {
      const buttons = within(pagination).getAllByRole('button');
      const nextButton = buttons[buttons.length - 1];
      await userEvent.click(nextButton);
      await waitFor(
        () => {
          const page6Button = within(pagination).getByText('6');
          expect(page6Button).toHaveAttribute('aria-current', 'page');
        },
        { timeout: 2000 }
      );
    });

    await step('Clicking page button goes to that page', async () => {
      // Click page 5 to test navigation (page 4 is not visible in current layout)
      const page5Button = within(pagination).getByText('5');
      await userEvent.click(page5Button);
      await waitFor(
        () => {
          // Find the page 5 button again after re-render
          const updatedPage5Button = within(pagination).getByText('5');
          expect(updatedPage5Button).toHaveAttribute('aria-current', 'page');
        },
        { timeout: 2000 }
      );
    });

    await step(
      'Clicking page 10 button changes the button listing',
      async () => {
        const page10Button = within(pagination).getByText('10');
        await userEvent.click(page10Button);
        await waitFor(
          () => {
            expect(page10Button).toHaveAttribute('aria-current', 'page');
            const buttons = within(pagination).getAllByRole('button');
            expect(buttons[1]).toHaveTextContent('1');
            expect(buttons[2]).toHaveTextContent('…');
          },
          { timeout: 3000 }
        );
      }
    );
  }
};
