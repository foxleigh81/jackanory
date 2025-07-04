import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Fieldset } from './index';
import { Form } from '../form';
import { InputFactory } from '@/components/factories/input-factory';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: (args) => (
    <Form name="form">
      <Fieldset {...args}>
        <InputFactory variant="text" name="Name" label="Name" />
        <InputFactory variant="text" name="Email" label="Email" />
      </Fieldset>
    </Form>
  )
};

/**
 * A legend can be used to provide a title for the fieldset.
 */
export const WithLegend: Story = {
  ...Default,
  args: {
    legend: 'Legend'
  }
};

/**
 * A description can be used to provide additional information about the fieldset.
 * This is useful for providing context to the user. You MUST also pass an `id` prop
 * if you are providing a description. This is used for accessibility purposes.
 * It is also recommended to use a legend when using a description for the sake of
 * appearance.
 */
export const WithLegendAndDescription: Story = {
  ...Default,
  args: {
    id: 'legendary',
    legend: 'Legend...ary',
    description: 'This is a description of the fieldset.'
  }
};

/**
 * You can also change the look of the fieldset to render the same as a Card component.
 * This is useful for when you want to group a set of inputs together and have them
 * visually distinct as a group.
 */
export const AsCard: Story = {
  ...Default,
  args: {
    id: 'card',
    legend: 'Legend Card',
    description: 'I look like a card!',
    useAsCard: true
  }
};
