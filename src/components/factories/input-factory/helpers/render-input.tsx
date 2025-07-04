import React from 'react';

// Import types
import InputTypes from '../types/input-types';

import InputOption from '@/libs/types/input-option';

// Import components
import { Text } from '../../../data-input/text';
import { Checkbox } from '../../../data-input/checkbox';
import { CheckboxGroup } from '../../../data-input/checkbox-group';
import { Datetime } from '../../../data-input/datetime';
import { File } from '../../../data-input/file';
import { Radio } from '../../../data-input/radio';
import { Select } from '../../../data-input/select';
import { Textarea } from '../../../data-input/textarea';
import { Autocomplete } from '../../../data-input/autocomplete';
import { RadioGroup } from '../../../data-input/radio-group';
import { Label } from '../../../data-input/label';
import { ToggleSwitch } from '../../../data-input/toggle-switch';

const renderInput = (
  name: string,
  type: InputTypes,
  props: React.ComponentProps<'input'>,
  label: string,
  options: unknown[] = []
) => {
  switch (type) {
    case 'textarea':
      return (
        <Textarea
          name={name}
          {...(props as unknown as React.ComponentProps<'textarea'>)}
        />
      );
    case 'radio':
      return (
        <Label
          id={props.id}
          text={label}
          position="after"
          required={props.required}
        >
          <Radio name={name} {...props} />
        </Label>
      );
    case 'checkbox':
      return (
        <Label
          id={props.id}
          text={label}
          position="after"
          required={props.required}
        >
          <Checkbox name={name} {...props} />
        </Label>
      );
    case 'file':
      return <File name={name} {...props} />;
    case 'datetime':
      return <Datetime name={name} {...props} />;
    // These components are all variants of `InputText` so they need to have a type prop added
    case 'password':
      return <Text name={name} {...props} type="password" />;
    case 'email':
      return <Text name={name} {...props} type="email" />;
    case 'number':
      return <Text name={name} {...props} type="number" />;
    case 'tel':
      return <Text name={name} {...props} type="tel" />;
    case 'url':
      return <Text name={name} {...props} type="url" />;
    // These components all support the options prop, so be sure to pass it down
    case 'select':
      return (
        <Select
          name={name}
          {...(props as unknown as React.ComponentProps<'select'>)}
          options={options as InputOption[]}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete name={name} {...props} options={options as string[]} />
      );
    case 'radiogroup':
      return (
        <RadioGroup
          name={name}
          groupLabel={label}
          options={options as InputOption[]}
          {...props}
        />
      );
    case 'checkboxgroup':
      return (
        <CheckboxGroup
          name={name}
          groupLabel={label}
          options={options as InputOption[]}
          {...props}
        />
      );
    case 'toggleswitch':
      return <ToggleSwitch name={name} {...props} />;
    case 'text':
    default:
      return <Text name={name} {...props} />;
  }
};

export default renderInput;
