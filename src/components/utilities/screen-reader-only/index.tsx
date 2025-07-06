import React from 'react';
import styles from './styles.module.scss';

export interface Props {
  /**
   * The content to be hidden visually but available to screen readers
   */
  children: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * The 'ScreenReaderOnly' component hides content visually while keeping it accessible to screen readers.
 * This is useful for providing additional context or instructions that are only needed for assistive technology users.
 */
export const ScreenReaderOnly: React.FC<Props> = ({ children, className }) => (
  <span className={[styles['sr-only'], className].filter(Boolean).join(' ')}>
    {children}
  </span>
);

ScreenReaderOnly.displayName = 'ScreenReaderOnly';

export default ScreenReaderOnly;
