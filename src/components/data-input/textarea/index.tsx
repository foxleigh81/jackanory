import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from '@/libs/types/component-statuses';

/* Prop Types */
export interface Props extends React.ComponentProps<'textarea'> {
  /**
   * The name of the input
   */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /** Error message for the input */
  error?: string;
  /** Helper text for the input */
  helperText?: string;
}

/**
 * The Textarea component is used to collect long-form user input
 */
export const Textarea: React.FC<Props> = ({
  id,
  name,
  status,
  className,
  error,
  helperText,
  required,
  ...props
}: Props) => {
  const inputId = id || changeCase(name, 'kebab');

  return (
    <textarea
      id={inputId}
      data-testid={inputId}
      name={name}
      className={[
        styles['input'],
        styles[`type-multiline`],
        styles[`status-${status || 'default'}`],
        className || ''
      ]
        .filter(Boolean)
        .join(' ')}
      aria-invalid={error ? 'true' : 'false'}
      aria-required={required ? 'true' : 'false'}
      aria-errormessage={error ? `${inputId}-error` : undefined}
      aria-describedby={helperText ? `${inputId}-helper` : undefined}
      {...props}
    />
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
