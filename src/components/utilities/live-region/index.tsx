import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export interface Props {
  /**
   * The message to announce to screen readers
   */
  message: string;
  /**
   * The politeness level of the announcement
   * @default "polite"
   */
  politeness?: 'polite' | 'assertive';
  /**
   * Whether the live region should be atomic (announce the entire content)
   * @default false
   */
  atomic?: boolean;
  /**
   * Whether the live region is relevant (announces changes)
   * @default "additions text"
   */
  relevant?: 'additions' | 'removals' | 'text' | 'all' | string;
}

/**
 * The 'LiveRegion' component provides a way to announce dynamic content changes to screen readers.
 * It uses ARIA live regions to communicate updates without interrupting the user's current task.
 */
export const LiveRegion: React.FC<Props> = ({
  message,
  politeness = 'polite',
  atomic = false,
  relevant = 'additions text'
}) => {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the live region container if it doesn't exist
    if (!liveRegionRef.current) {
      const container = document.createElement('div');
      container.setAttribute('aria-live', politeness);
      container.setAttribute('aria-atomic', atomic.toString());
      container.setAttribute('aria-relevant', relevant);
      container.className = styles['live-region'];
      document.body.appendChild(container);
      liveRegionRef.current = container;
    }

    // Update the message
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }

    // Cleanup function
    return () => {
      if (
        liveRegionRef.current &&
        document.body.contains(liveRegionRef.current)
      ) {
        document.body.removeChild(liveRegionRef.current);
        liveRegionRef.current = null;
      }
    };
  }, [message, politeness, atomic, relevant]);

  return null; // This component doesn't render anything visible
};

/**
 * Hook for managing live region announcements
 */
export const useLiveRegion = () => {
  const announce = (message: string, options: Omit<Props, 'message'> = {}) => {
    const {
      politeness = 'polite',
      atomic = false,
      relevant = 'additions text'
    } = options;

    // Create a temporary live region for the announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', atomic.toString());
    liveRegion.setAttribute('aria-relevant', relevant);
    liveRegion.className = styles['live-region'];
    liveRegion.textContent = message;

    document.body.appendChild(liveRegion);

    // Remove the live region after a short delay
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion);
      }
    }, 1000);
  };

  return { announce };
};

LiveRegion.displayName = 'LiveRegion';

export default LiveRegion;
