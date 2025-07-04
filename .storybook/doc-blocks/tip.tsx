import React from 'react';

import styles from './styles.module.css';

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The tip type
   * @default 'tip';
   */
  type?: 'note' | 'tip' | 'warning' | 'danger';
}

// Render component
export const Tip: React.FC<Props> = ({ type = 'tip', children }: Props) => {
  return (
    <div className={styles[`tip-${type}`]}>
      <span className={styles['tip-bubble']}>{type.toUpperCase()}</span>
      <span className={styles['tip-text']}>{children}</span>
    </div>
  );
};

export default Tip;
