import React, { useState, useEffect } from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from '@/libs/types/component-statuses';
import { InputOption } from '@/libs/types/input-option';
import { InputValue } from '@/libs/types/input-value';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  /**
   * The name of the input
   */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /**
   * The options to render if value is not set, the label will be the value
   */
  options: InputOption[];
  /**
   * The selected value(s) of the input when the component loads
   */
  value?: InputValue;
}

/**
 * The input select component is used to select a single option from a list of options.
 * It is a drop-in replacement for the native select element.
 */
export const Select: React.FC<Props> = ({
  id,
  name,
  status,
  className,
  options,
  placeholder,
  multiple,
  value,
  onChange,
  ...props
}: Props) => {
  const [selectOptions, setSelectOptions] = useState<InputOption[]>(options);
  const [selectedValues, setSelectedValues] = useState<
    string | number | readonly string[]
  >(value);

  useEffect(() => {
    setSelectOptions(options);
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!multiple) {
      setSelectedValues(event.target.value);
      onChange?.(event);
    } else {
      const selected = Array.from(event.target.selectedOptions).map((option) =>
        String(option.value)
      );

      setSelectedValues(selected);
      const fakeEventOptions = {
        name,
        value: selected,
        type: 'multiselect'
      };
      const fakeEvent = {
        target: fakeEventOptions,
        currentTarget: fakeEventOptions
      };
      onChange?.(fakeEvent as unknown as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div
      className={[
        multiple
          ? styles['multi-select-container']
          : styles['input-select-container'],
        styles[`status-${status || 'default'}`]
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <select
        name={name}
        id={id || changeCase(name, 'kebab')}
        data-testid={id || changeCase(name, 'kebab')}
        className={[
          styles['input-select'],
          styles[`status-${status || 'default'}`],
          className
        ]
          .filter(Boolean)
          .join(' ')}
        multiple={multiple}
        onChange={handleChange}
        defaultValue={selectedValues}
        {...props}
      >
        {placeholder && !multiple && <option value="">{placeholder}</option>}
        {selectOptions.map((option) => {
          const val = option.value || option.label;

          return (
            <option key={val} value={val}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
