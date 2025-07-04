import React from 'react';
import Tooltip from '@/components/feedback/tooltip';

import styles from './styles.module.scss';

export interface Props {
  /**
   * The total number of pages.
   */
  count: number;
  /**
   * The current page.
   */
  currentPage: number;
  /**
   * When the page is changed.
   */
  onChange?: (page: number) => void;
  /**
   * Add a custom class name.
   */
  className?: string;
  /**
   * Whether to show tooltips on the dots.
   * @default true
   */
  showTooltips?: boolean;
}

/**
 * A navigation component that displays dots representing pages.
 * Each dot can be clicked to navigate to that page.
 */
const Dots: React.FC<Props> = ({
  count,
  currentPage,
  onChange,
  className,
  showTooltips = true
}: Props) => {
  return (
    <nav
      role="navigation"
      aria-label="Page navigation"
      className={[styles.container, className || ''].filter(Boolean).join(' ')}
    >
      {Array.from({ length: count }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        const dot = (
          <button
            key={page}
            type="button"
            className={[styles.dot, isActive ? styles.active : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange?.(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          />
        );

        return showTooltips ? (
          <Tooltip key={page} content={`Go to page ${page}`} placement="top">
            {dot}
          </Tooltip>
        ) : (
          dot
        );
      })}
    </nav>
  );
};

Dots.displayName = 'Dots';

export default Dots;
