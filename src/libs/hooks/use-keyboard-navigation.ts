import { useCallback, useEffect, useRef } from 'react';

export interface UseKeyboardNavigationOptions {
  /**
   * Whether keyboard navigation is enabled
   */
  isEnabled: boolean;
  /**
   * Whether to use arrow keys for navigation
   * @default true
   */
  useArrowKeys?: boolean;
  /**
   * Whether to use Home/End keys for navigation
   * @default true
   */
  useHomeEnd?: boolean;
  /**
   * Whether navigation should wrap around (first to last, last to first)
   * @default true
   */
  wrap?: boolean;
  /**
   * Orientation of the navigation (affects which arrow keys are used)
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /**
   * Callback when navigation occurs
   */
  onNavigate?: (index: number, element: HTMLElement) => void;
  /**
   * Custom selector for focusable elements
   */
  focusableSelector?: string;
}

const DEFAULT_FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex="0"]',
  '[role="button"]:not([disabled])',
  '[role="tab"]:not([disabled])',
  '[role="menuitem"]:not([disabled])'
].join(',');

/**
 * Hook for managing keyboard navigation within a container
 * Supports arrow keys, Home/End keys, and custom navigation patterns
 */
export const useKeyboardNavigation = (
  options: UseKeyboardNavigationOptions
) => {
  const {
    isEnabled,
    useArrowKeys = true,
    useHomeEnd = true,
    wrap = true,
    orientation = 'horizontal',
    onNavigate,
    focusableSelector = DEFAULT_FOCUSABLE_SELECTOR
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((element) => {
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.tabIndex >= 0
      );
    });
  }, [focusableSelector]);

  const getCurrentIndex = useCallback((): number => {
    const focusableElements = getFocusableElements();
    const activeElement = document.activeElement;
    return focusableElements.findIndex((element) => element === activeElement);
  }, [getFocusableElements]);

  const navigateToIndex = useCallback(
    (index: number) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      let targetIndex = index;

      if (wrap) {
        if (targetIndex < 0) {
          targetIndex = focusableElements.length - 1;
        } else if (targetIndex >= focusableElements.length) {
          targetIndex = 0;
        }
      } else {
        targetIndex = Math.max(
          0,
          Math.min(targetIndex, focusableElements.length - 1)
        );
      }

      const targetElement = focusableElements[targetIndex];
      if (targetElement) {
        targetElement.focus();
        onNavigate?.(targetIndex, targetElement);
      }
    },
    [getFocusableElements, wrap, onNavigate]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isEnabled) return;

      const currentIndex = getCurrentIndex();
      if (currentIndex === -1) return;

      let handled = false;

      if (useArrowKeys) {
        switch (event.key) {
          case 'ArrowLeft':
            if (orientation === 'horizontal' || orientation === 'both') {
              event.preventDefault();
              navigateToIndex(currentIndex - 1);
              handled = true;
            }
            break;
          case 'ArrowRight':
            if (orientation === 'horizontal' || orientation === 'both') {
              event.preventDefault();
              navigateToIndex(currentIndex + 1);
              handled = true;
            }
            break;
          case 'ArrowUp':
            if (orientation === 'vertical' || orientation === 'both') {
              event.preventDefault();
              navigateToIndex(currentIndex - 1);
              handled = true;
            }
            break;
          case 'ArrowDown':
            if (orientation === 'vertical' || orientation === 'both') {
              event.preventDefault();
              navigateToIndex(currentIndex + 1);
              handled = true;
            }
            break;
        }
      }

      if (useHomeEnd && !handled) {
        switch (event.key) {
          case 'Home':
            event.preventDefault();
            navigateToIndex(0);
            handled = true;
            break;
          case 'End':
            event.preventDefault();
            navigateToIndex(getFocusableElements().length - 1);
            handled = true;
            break;
        }
      }
    },
    [
      isEnabled,
      getCurrentIndex,
      navigateToIndex,
      useArrowKeys,
      useHomeEnd,
      orientation,
      getFocusableElements
    ]
  );

  useEffect(() => {
    if (isEnabled && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('keydown', handleKeyDown);

      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isEnabled, handleKeyDown]);

  return {
    containerRef,
    /**
     * Manually navigate to a specific index
     */
    navigateToIndex,
    /**
     * Get the current focused element index
     */
    getCurrentIndex,
    /**
     * Get all focusable elements
     */
    getFocusableElements,
    /**
     * Focus the first focusable element
     */
    focusFirst: () => navigateToIndex(0),
    /**
     * Focus the last focusable element
     */
    focusLast: () => navigateToIndex(getFocusableElements().length - 1)
  };
};

export default useKeyboardNavigation;
