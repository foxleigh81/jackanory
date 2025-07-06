import React from 'react';
import styles from './styles.module.scss';

export interface Props {
  /**
   * The target element ID to skip to
   */
  href: string;
  /**
   * The text to display in the skip link
   * @default "Skip to main content"
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * The 'SkipLink' component provides a way for keyboard users to skip repetitive navigation.
 * It's typically placed at the beginning of the page and becomes visible when focused.
 */
export const SkipLink: React.FC<Props> = ({
  href,
  children = 'Skip to main content',
  className
}) => (
  <a
    href={href}
    className={[styles['skip-link'], className].filter(Boolean).join(' ')}
  >
    {children}
  </a>
);

SkipLink.displayName = 'SkipLink';

export default SkipLink;
