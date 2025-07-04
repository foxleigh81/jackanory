import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent, waitFor, expect } from 'storybook/test';

import people from '@/libs/mocks/people';

// Import component files
import TableFactory from './index';

const meta: Meta<typeof TableFactory> = {
  component: TableFactory,
  parameters: {
    previewLayout: 'vertical',
    actions: {
      handles: ['click']
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ],
  args: {
    data: people
  },
  argTypes: {
    striped: {
      control: {
        type: 'boolean'
      }
    },
    solidHeader: {
      control: {
        type: 'boolean'
      }
    },
    hideHeader: {
      control: {
        type: 'boolean'
      }
    },
    titleCaseHeaders: {
      control: {
        type: 'boolean'
      }
    },
    filtering: {
      control: {
        type: 'check'
      },
      options: Array.from({ length: people.length }, (_v, i) => i + 1)
    },
    onClick: { action: true }
  }
};

export default meta;

type Story = StoryObj<typeof TableFactory>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const column1Header = await within(table).findByText('Name');
    const column2Header = await within(table).findByText('Age');
    const column3Header = await within(table).findByText('Occupation');
    const rows = await within(table).findAllByTestId('row');

    await step('Headers are rendered correctly', () => {
      expect(column1Header).toBeInTheDocument();
      expect(column2Header).toBeInTheDocument();
      expect(column3Header).toBeInTheDocument();
    });

    await step('Rows are rendered correctly', () => {
      expect(rows[0]).toBeInTheDocument();
      expect(rows[1]).toBeInTheDocument();
      expect(rows[2]).toBeInTheDocument();
    });

    await step('Row 0 is rendered correctly', () => {
      expect(rows[0]).toHaveTextContent('John');
      expect(rows[0]).toHaveTextContent('25');
      expect(rows[0]).toHaveTextContent('developer');
    });

    await step('Row 1 is rendered correctly', () => {
      expect(rows[1]).toHaveTextContent('Jane');
      expect(rows[1]).toHaveTextContent('24');
      expect(rows[1]).toHaveTextContent('designer');
    });

    await step('Row 2 is rendered correctly', () => {
      expect(rows[2]).toHaveTextContent('Joe');
      expect(rows[2]).toHaveTextContent('23');
      expect(rows[2]).toHaveTextContent('teacher');
    });
  }
};

export const WithoutSolidHeader: Story = {
  args: {
    solidHeader: false
  }
};

export const WithoutHeader: Story = {
  args: {
    hideHeader: true
  }
};

export const WithoutStripes: Story = {
  args: {
    striped: false
  }
};

export const Sortable: Story = {
  args: {
    sorting: ['*']
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const sortButtons = await within(table).findAllByRole('button');

    await step('Rows have been sorted by name initially', async () => {
      const rows = await within(table).findAllByTestId('row');
      expect(rows[0]).toHaveTextContent('Jane');
      expect(rows[1]).toHaveTextContent('Joe');
      expect(rows[2]).toHaveTextContent('John');
    });

    await step('Clicking the age sort button sorts by age', async () => {
      await userEvent.click(sortButtons[1]);
      await waitFor(async () => {
        const rows = await within(table).findAllByTestId('row');
        expect(rows[0]).toHaveTextContent('John');
        expect(rows[1]).toHaveTextContent('Jane');
        expect(rows[2]).toHaveTextContent('Joe');
      });
    });

    await step(
      'Clicking the age sort button again reverses the sort',
      async () => {
        await userEvent.click(sortButtons[1]);
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows[0]).toHaveTextContent('Joe');
          expect(rows[1]).toHaveTextContent('Jane');
          expect(rows[2]).toHaveTextContent('John');
        });
      }
    );

    await step(
      'Clicking the name sort button sorts by name again but in descending order',
      async () => {
        await userEvent.click(sortButtons[0]);
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows[0]).toHaveTextContent('John');
          expect(rows[1]).toHaveTextContent('Joe');
          expect(rows[2]).toHaveTextContent('Jane');
        });
      }
    );

    await step(
      'Clicking the name sort button again reverses the sort',
      async () => {
        await userEvent.click(sortButtons[0]);
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows[0]).toHaveTextContent('Jane');
          expect(rows[1]).toHaveTextContent('Joe');
          expect(rows[2]).toHaveTextContent('John');
        });
      }
    );
  }
};

export const Filterable: Story = {
  args: {
    filtering: ['*']
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const filterInputs = await within(table).findAllByRole('textbox');

    await step(
      'Filtering by full name results in a single row with the correct data',
      async () => {
        await userEvent.type(filterInputs[0], 'Jane');
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows.length).toBe(1);
          expect(rows[0]).toHaveTextContent('Jane');
        });
        await userEvent.clear(filterInputs[0]);
      }
    );

    await step(
      'Filtering by just the first 2 letters of a name returns all matching rows',
      async () => {
        await userEvent.type(filterInputs[0], 'Jo');
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows.length).toBe(2);
          expect(rows[0]).toHaveTextContent('John');
          expect(rows[1]).toHaveTextContent('Joe');
        });
        await userEvent.clear(filterInputs[0]);
      }
    );

    await step(
      'Filtering by occupation results in a single row with the correct data',
      async () => {
        await userEvent.type(filterInputs[2], 'teacher');
        await waitFor(async () => {
          const rows = await within(table).findAllByTestId('row');
          expect(rows.length).toBe(1);
          expect(rows[0]).toHaveTextContent('Joe');
        });
        await userEvent.clear(filterInputs[2]);
      }
    );
  }
};

export const FilterSpecificColumns: Story = {
  args: {
    filtering: [1, 3]
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const filterInputs = await within(table).findAllByRole('textbox');

    await step(
      'Only the age and occupation columns are filterable',
      async () => {
        expect(filterInputs.length).toBe(2);
        expect(filterInputs[0]).toHaveAttribute('name', 'filter-name');
        expect(filterInputs[1]).toHaveAttribute('name', 'filter-occupation');
      }
    );
  }
};

export const SortSpecificColumns: Story = {
  args: {
    sorting: [
      {
        column: 1,
        direction: 'asc',
        initial: true
      },
      {
        column: 3,
        direction: 'asc'
      }
    ]
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const sortButtons = await within(table).findAllByRole('button');

    await step(
      'Only the name and occupations columns are sortable',
      async () => {
        expect(sortButtons.length).toBe(2);
        expect(sortButtons[0]).toHaveAttribute(
          'aria-label',
          'Sort by name (asc)'
        );
        expect(sortButtons[1]).toHaveAttribute(
          'aria-label',
          'Sort by occupation (asc)'
        );
      }
    );
  }
};

export const WithHTMLData: Story = {
  args: {
    data: people.map((person) => ({
      ...person,
      email: (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            action('email-sent')(`You emailed ${person.name}!`);
          }}
        >
          Email {person.name}
        </a>
      )
    }))
  }
};

export const WithArraysAndBooleansAsData: Story = {
  args: {
    data: people.map((person) => ({
      ...person,
      friends: people.map((friend) => friend.name),
      isCool: true
    }))
  }
};
