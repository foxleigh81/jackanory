import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { Form } from './index';
import { Fieldset } from '../fieldset';
import { InputFactory } from '@/components/factories/input-factory';
import { Button } from '../button';

const meta: Meta<typeof Form> = {
  component: Form,
  args: {
    name: 'Form'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <Form
      name="form"
      onSubmit={(e) => {
        e.preventDefault();
        action('onSubmit')(e.target);
      }}
    >
      <Fieldset>
        <InputFactory variant="text" name="Name" label="Name" />
        <InputFactory variant="text" name="Email" label="Email" />
        <Button type="submit" label="Submit" />
      </Fieldset>
    </Form>
  )
};
