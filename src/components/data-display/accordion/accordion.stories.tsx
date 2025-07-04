import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import changeCase from '@/libs/helpers/change-case';
import { useArgs } from 'storybook/preview-api';
import Accordion from './index';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const accordionContent = [
  {
    header: 'Test header 1',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
        module/front-end/components/data-display/accordion/accordion.stories.tsx{' '}
      </p>
    )
  },
  {
    header: 'Test header 2',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  },
  {
    header: 'Test header 3',
    body: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi vel consectetur euismod, nisl nisl consectetur nisl, eget
        consectetur nisl nisl eget nisl.
      </p>
    )
  }
];

export const Default: Story = {
  args: {
    children: accordionContent.map(({ header, body }) => (
      <Accordion.Item key={changeCase(header, 'kebab')} header={header}>
        {body}
      </Accordion.Item>
    ))
  }
};

export const WithOpenItem: Story = {
  args: {
    children: accordionContent.map(({ header, body }, index) => (
      <Accordion.Item
        key={changeCase(header, 'kebab')}
        header={header}
        isOpen={index === 1}
      >
        {body}
      </Accordion.Item>
    ))
  }
};

export const LimitOpenItemsToOne: Story = {
  render: function Render(args) {
    const [{ openItem }, updateArgs] = useArgs();
    return (
      <Accordion {...args}>
        {accordionContent.map(({ header, body }, index) => (
          <Accordion.Item
            key={changeCase(header, 'kebab')}
            header={header}
            isOpen={openItem === index}
            onClick={() => updateArgs({ openItem: index })}
          >
            {body}
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }
};
