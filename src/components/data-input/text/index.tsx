import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';
import InputComponent from '@/libs/types/input-component';

type Props = InputComponent;

/**
 * The Text component is used to collect user input
 */
export const Text: React.FC<Props> = ({
  id,
  name,
  type = 'text',
  status = 'default',
  className,
  error,
  helperText,
  required,
  ...props
}: Props) => {
  const inputId = id || changeCase(name, 'kebab');

  return (
    <input
      id={inputId}
      data-testid={inputId}
      name={name}
      className={[
        styles['input'],
        styles[`type-${type}`],
        styles[`status-${status}`],
        className || ''
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      required={required}
      aria-invalid={error ? 'true' : 'false'}
      aria-required={required ? 'true' : 'false'}
      aria-errormessage={error ? `${inputId}-error` : undefined}
      aria-describedby={helperText ? `${inputId}-helper` : undefined}
      {...props}
    />
  );
};
Text.displayName = 'Text';
export default Text;
