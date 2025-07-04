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
  ...props
}: Props) => {
  return (
    <input
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
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
      {...props}
    />
  );
};
Text.displayName = 'Text';
export default Text;
