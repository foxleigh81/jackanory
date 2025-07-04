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
  ...props
}: Props) => {
  return (
    <input
      className={[styles['input'], className || ''].filter(Boolean).join(' ')}
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      disabled={disabled}
      type="file"
      {...props}
    />
  );
};
File.displayName = 'File';

export default File;
