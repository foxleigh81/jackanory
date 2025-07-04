import React, { useState, useEffect } from 'react';

// Import Components
import { Checkbox } from '../checkbox';
import { Label } from '../label';

// Import types
import InputOption from '@/libs/types/input-option';
import InputComponent from '@/libs/types/input-component';

/* Import Stylesheet */
import styles from './styles.module.scss';

// Prop Types
export interface Props extends InputComponent {
  /**
   * The label to display above the checkbox group as a legend.
   */
  groupLabel: string;
  /**
   * The options for each of the input checkboxs.
   */
  options: InputOption[];
  /**
   * Should the checkbox group display vertically or horizontally.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The onChange event handler for the checkbox group.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * The CheckboxGroup component groups a collection of Checkbox components and provides them all with the same name, creating a checkbox group.
 */
export const CheckboxGroup: React.FC<Props> = ({
  groupLabel,
  options,
  name,
  orientation = 'horizontal',
  onChange,
  ...props
}: Props) => {
  const [checkboxOptions, setCheckboxOptions] =
    useState<InputOption[]>(options);

  useEffect(() => {
    setCheckboxOptions(options);
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = checkboxOptions.map((option) => {
      if (option.value === event.target.value) {
        return {
          ...option,
          checked: !option.checked
        };
      }
      return option;
    });
    setCheckboxOptions(newOptions);

    if (onChange) {
      // Create a fake event object to pass to the onChange handler which uses
      // checkboxgroup as the target and the values of the checked checkboxes
      // as the value.
      const fakeEventOptions = {
        name,
        value: newOptions
          .filter((option) => option.checked)
          .map((option) => option.value),
        type: 'checkboxgroup'
      };
      const fakeEvent = {
        target: fakeEventOptions,
        currentTarget: fakeEventOptions
      };
      onChange(fakeEvent as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <fieldset
      className={[styles['checkbox-group'], styles[orientation]]
        .filter(Boolean)
        .join(' ')}
    >
      <legend className={styles['legend']}>{groupLabel}</legend>
      {checkboxOptions.map((option, index) => (
        <Label
          key={`${name}-${option.label}`}
          id={`${name}-${index}`}
          data-testid={`${name}-${index}-label`}
          text={option.label}
          position="after"
          parent
        >
          <Checkbox
            {...props}
            name={name}
            defaultValue={option.value || option.label}
            id={`${name}-${index}`}
            data-testid={`${name}-${index}-input`}
            defaultChecked={option.checked}
            disabled={option.disabled}
            onChange={handleChange}
          />
        </Label>
      ))}
    </fieldset>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
