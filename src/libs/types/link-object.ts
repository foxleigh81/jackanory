import type { ReactNode } from 'react';

export interface LinkObject {
  /**
   * The URL to link to.
   */
  href: string;
  /**
   * The text to display for the link.
   */
  label: string;
  /**
   * The icon to display with the link.
   */
  icon?: ReactNode;
  /**
   * The target for the link. Defaults to `_self`.
   */
  target?: string;
  /**
   * The rel for the link if applicable.
   */
  rel?: string;
  /**
   * Is the link the current page? Defaults to `false`.
   */
  current?: boolean;
}

export default LinkObject;
