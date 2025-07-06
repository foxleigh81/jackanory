import { useEffect, useRef } from 'react';

export interface UseFocusRestorationOptions {
  /**
   * Whether focus restoration is active
   */
  isActive: boolean;
  /**
   * Specific element to restore focus to (overrides automatic detection)
   */
  restoreElement?: HTMLElement | null;
  /**
   * Whether to restore focus when the component unmounts
   * @default true
   */
  restoreOnUnmount?: boolean;
}

/**
 * Hook for managing focus restoration when components are mounted/unmounted
 * Useful for modals, dropdowns, and other overlay components
 */
export const useFocusRestoration = (options: UseFocusRestorationOptions) => {
  const { isActive, restoreElement, restoreOnUnmount = true } = options;
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        previousActiveElement.current = activeElement;
      }
    } else if (restoreOnUnmount) {
      // Restore focus when deactivated
      const elementToFocus = restoreElement || previousActiveElement.current;
      if (elementToFocus && document.contains(elementToFocus)) {
        // Use setTimeout to ensure the element is focusable
        setTimeout(() => {
          elementToFocus.focus();
        }, 0);
      }
    }
  }, [isActive, restoreElement, restoreOnUnmount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restoreOnUnmount && previousActiveElement.current) {
        const elementToFocus = restoreElement || previousActiveElement.current;
        if (elementToFocus && document.contains(elementToFocus)) {
          setTimeout(() => {
            elementToFocus.focus();
          }, 0);
        }
      }
    };
  }, [restoreElement, restoreOnUnmount]);

  return {
    /**
     * Manually restore focus to the previously focused element
     */
    restoreFocus: () => {
      const elementToFocus = restoreElement || previousActiveElement.current;
      if (elementToFocus && document.contains(elementToFocus)) {
        elementToFocus.focus();
      }
    },
    /**
     * Get the element that focus will be restored to
     */
    getRestoreElement: () => restoreElement || previousActiveElement.current
  };
};

export default useFocusRestoration;
