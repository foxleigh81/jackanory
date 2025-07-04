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
  ...props
}: Props) => {
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
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      disabled={disabled}
      {...props}
    />
  );
};

Radio.displayName = 'Radio';

export default Radio;
