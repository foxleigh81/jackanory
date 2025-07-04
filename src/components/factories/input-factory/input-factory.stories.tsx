import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InputFactory from './index';

const meta: Meta<typeof InputFactory> = {
  component: InputFactory,
  args: {
    name: 'Test name',
    label: 'Test label',
    variant: 'text'
  },
  argTypes: {
    onChange: { action: 'onChange' },
    statusMessage: { control: 'text' },
    helperText: { control: 'text' },
    width: { control: 'text' },
    minWidth: { control: 'text' },
    maxWidth: { control: 'text' },
    rows: { control: 'number' },
    hideLabel: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    testID: { table: { disable: true } }
  }
};

import options from '@/libs/mocks/options';

export default meta;
type Story = StoryObj<typeof InputFactory>;

// Input types

export const TextInput: Story = {
  args: {
    id: 'text-id',
    placeholder: 'Test input goes here...'
  }
};

export const TextAreaInput: Story = {
  args: {
    id: 'textarea-id',
    placeholder: 'Test input goes here...',
    rows: 5,
    variant: 'textarea'
  }
};

export const CheckboxInput: Story = {
  args: {
    id: 'checkbox-id',
    label: 'Checkbox',
    variant: 'checkbox'
  }
};

export const CheckboxGroup: Story = {
  args: {
    id: 'checkboxgroup-id',
    name: 'checkboxgroup',
    label: 'Checkbox group',
    variant: 'checkboxgroup',
    options: [
      { label: 'Check one', value: '1' },
      { label: 'Check two', value: '2' },
      { label: 'Check three', value: '3' }
    ]
  }
};

export const RadioInput: Story = {
  args: {
    id: 'radio-id',
    label: 'Radio',
    variant: 'radio'
  }
};

export const RadioGroup: Story = {
  args: {
    id: 'radiogroup-id',
    name: 'radiogroup',
    label: 'Radio group',
    variant: 'radiogroup',
    options: [
      { label: 'Radio one', value: '1' },
      { label: 'Radio two', value: '2' },
      { label: 'Radio three', value: '3' }
    ]
  }
};

export const SelectInput: Story = {
  args: {
    id: 'select-id',
    name: 'select',
    label: 'Select',
    variant: 'select',
    options
  }
};

export const FileUploadInput: Story = {
  args: {
    id: 'file-id',
    name: 'file',
    label: 'File Upload',
    variant: 'file'
  }
};

export const AutoCompleteInput: Story = {
  args: {
    id: 'autocomplete-id',
    name: 'autocomplete',
    label: 'Autocomplete',
    variant: 'autocomplete',
    options: [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten'
    ]
  }
};

export const DatePickerInput: Story = {
  args: {
    id: 'datepicker-id',
    name: 'datePicker',
    label: 'Date Picker',
    variant: 'datetime'
  }
};

export const ToggleSwitchInput: Story = {
  args: {
    id: 'toggleswitch-id',
    name: 'toggleSwitch',
    label: 'Toggle Switch',
    variant: 'toggleswitch'
  }
};

// Input states

export const DefaultState: Story = {
  args: {
    id: 'default-state-id',
    name: 'default',
    label: 'Default'
  }
};

export const ErrorState: Story = {
  args: {
    id: 'error-state-id',
    name: 'error',
    label: 'Error',
    status: 'error',
    statusMessage:
      'This is a much longer error message, this is to show how the design handles long error messages, try it out in different viewport sizes.'
  }
};

export const WarningState: Story = {
  args: {
    id: 'warning-state-id',
    name: 'warning',
    label: 'Warning',
    status: 'warning',
    statusMessage: 'Test warning message'
  }
};

export const SuccessState: Story = {
  args: {
    id: 'success-state-id',
    name: 'success',
    label: 'Success',
    status: 'success',
    statusMessage: 'Test success message'
  }
};

// Other props

export const HelperText: Story = {
  args: {
    id: 'helper-text-id',
    name: 'helperText',
    label: 'Helper Text',
    helperText: 'This is a helper text message'
  }
};

export const DisabledInput: Story = {
  args: {
    id: 'disabled-id',
    name: 'disabled',
    label: 'Disabled',
    required: true
  }
};

export const RequiredInput: Story = {
  args: {
    id: 'required-id',
    name: 'required',
    label: 'Required',
    required: true
  }
};

export const ReadOnlyInput: Story = {
  args: {
    id: 'readonly-id',
    name: 'readOnly',
    label: 'Read only',
    readOnly: true
  }
};
