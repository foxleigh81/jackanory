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
  ...props
}: Props) => {
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
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      type="date"
      {...props}
    />
  );
};

Datetime.displayName = 'Datetime';

export default Datetime;
