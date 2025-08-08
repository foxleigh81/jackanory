import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

type Props = InputComponent;

/**
 * The `Datetime` component uses the native `<input type="date">` element and is a wrapper around it.
 */
export const Datetime: React.FC<Props> = ({
  name,
  id,
  status,
  className,
  error,
  helperText,
  required,
  ...props
}: Props) => {
  const inputId = id || changeCase(name, 'kebab');

  return (
    <input
      className={[
        styles['input'],
        styles[`type-date`],
        styles[`status-${status || 'default'}`],
        className
      ]
        .filter(Boolean)
        .join(' ')}
      id={inputId}
      data-testid={inputId}
      name={name}
      type="date"
      aria-invalid={error ? 'true' : 'false'}
      aria-required={required ? 'true' : 'false'}
      aria-errormessage={error ? `${inputId}-error` : undefined}
      aria-describedby={helperText ? `${inputId}-helper` : undefined}
      {...props}
    />
  );
};

Datetime.displayName = 'Datetime';

export default Datetime;
