import React from 'react';
import { changeCase } from '@/libs/helpers/change-case';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

type Props = InputComponent;

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Render component */
export const Radio: React.FC<Props> = ({
  disabled,
  className,
  name,
  id,
  status,
  helperText,
  ...props
}: Props) => {
  const inputId = id || changeCase(name, 'kebab');

  return (
    <input
      type="radio"
      className={[
        styles['input'],
        status ? styles[`status-${status}`] : '',
        className || ''
      ]
        .filter(Boolean)
        .join(' ')}
      name={name}
      id={inputId}
      data-testid={inputId}
      disabled={disabled}
      aria-describedby={helperText ? `${inputId}-helper` : undefined}
      {...props}
    />
  );
};

Radio.displayName = 'Radio';

export default Radio;
