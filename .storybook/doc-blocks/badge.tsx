import React from 'react';

import styles from './styles.module.css';

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The badge colour
   * @default #6699cc;
   */
  colour?: string;
  /**
   * The badge link
   */
  link?: string;
}

// Render component
export const Badge: React.FC<Props> = ({
  colour = '#6699cc',
  link,
  children
}: Props) => {
  return (
    <a className={styles.badge} style={{ backgroundColor: colour }} href={link}>
      {children}
    </a>
  );
};

export default Badge;
