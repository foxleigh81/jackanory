import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

type Props = InputComponent;

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The `Checkbox` component is a simple checkbox input with a label.
 */
export const Checkbox: React.FC<Props> = ({
  id,
  name,
  checked,
  disabled,
  className,
  status,
  value,
  error,
  helperText,
  required,
  ...props
}: Props) => {
  if (!id && !name) {
    throw new Error(
      'Inputs must have either an id or name prop to be accessible'
    );
  }

  const inputId = id || changeCase(name, 'kebab');

  return (
    <span className={styles['icon-container']}>
      <input
        id={inputId}
        data-testid={inputId}
        name={name}
        type="checkbox"
        className={[
          styles['input'],
          status && styles[`status-${status}`],
          className
        ]
          .filter(Boolean)
          .join(' ')}
        defaultChecked={checked}
        disabled={disabled}
        defaultValue={value}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-required={required ? 'true' : 'false'}
        aria-errormessage={error ? `${inputId}-error` : undefined}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
    </span>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
