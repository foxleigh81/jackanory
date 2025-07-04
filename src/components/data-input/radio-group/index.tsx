import React, { useState, useEffect } from 'react';

// Import Components
import { Radio } from '../radio';
import { Label } from '../label';

// Import types
import InputOption from '@/libs/types/input-option';
import InputComponent from '@/libs/types/input-component';

/* Import Stylesheet */
import styles from './styles.module.scss';

// Prop Types
export interface Props extends InputComponent {
  /**
   * The label to display above the radio group as a legend.
   */
  groupLabel: string;
  /**
   * The options for each of the input radios.
   */
  options: InputOption[];
  /**
   * Should the radio group display vertically or horizontally.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The onChange event handler for the radio group.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * The RadioGroup component groups a collection of Radio components and provides them all with the same name, creating a radio group.
 */
export const RadioGroup: React.FC<Props> = ({
  groupLabel,
  options,
  name,
  orientation = 'horizontal',
  onChange,
  ...props
}: Props) => {
  const [radioOptions, setRadioOptions] = useState<InputOption[]>(options);

  useEffect(() => {
    setRadioOptions(options);
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = radioOptions.map((option) => {
      if (option.value === event.target.value) {
        return {
          ...option,
          checked: true
        };
      }
      return {
        ...option,
        checked: false
      };
    });
    setRadioOptions(newOptions);
    if (onChange) {
      return onChange(event);
    }
  };

  return (
    <fieldset
      className={[styles['radio-group'], styles[orientation]]
        .filter(Boolean)
        .join(' ')}
    >
      <legend className={styles['legend']}>{groupLabel}</legend>
      {radioOptions.map((option, index) => (
        <Label
          key={`${name}-${option.label}`}
          id={`${name}-${index}`}
          data-testid={`${name}-${index}-label`}
          text={option.label}
          position="after"
          parent
        >
          <Radio
            name={name}
            defaultValue={option.value || option.label}
            data-testid={`${name}-${index}-input`}
            defaultChecked={option.checked}
            disabled={option.disabled}
            onChange={handleChange}
            {...props}
            id={`${name}-${index}`}
          />
        </Label>
      ))}
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
