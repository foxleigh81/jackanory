import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

type Props = InputComponent;

/**
 * The `File` component is used to upload files. It is a wrapper around the `<input type="file" />` element.
 */
export const File: React.FC<Props> = ({
  name,
  id,
  disabled,
  className,
  error,
  helperText,
  required,
  ...props
}: Props) => {
  const inputId = id || changeCase(name, 'kebab');

  return (
    <input
      className={[styles['input'], className || ''].filter(Boolean).join(' ')}
      id={inputId}
      data-testid={inputId}
      name={name}
      disabled={disabled}
      type="file"
      aria-invalid={error ? 'true' : 'false'}
      aria-required={required ? 'true' : 'false'}
      aria-errormessage={error ? `${inputId}-error` : undefined}
      aria-describedby={helperText ? `${inputId}-helper` : undefined}
      {...props}
    />
  );
};
File.displayName = 'File';

export default File;
