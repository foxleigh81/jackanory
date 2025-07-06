import { useEffect, useRef, useCallback } from 'react';

// Focusable elements selector
const FOCUSABLE_ELEMENTS = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex="0"]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

export interface UseFocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Element to return focus to when trap is deactivated
   */
  returnFocusElement?: HTMLElement | null;
  /**
   * Whether to focus the first element when trap is activated
   * @default true
   */
  focusFirstElement?: boolean;
}

/**
 * Hook for managing focus trapping within a container element
 */
export const useFocusTrap = (options: UseFocusTrapOptions) => {
  const { isActive, returnFocusElement, focusFirstElement = true } = options;
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    ).filter((element) => {
      // Filter out elements that are not visible or have negative tabindex
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.tabIndex >= 0
      );
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isActive, getFocusableElements]
  );

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the first focusable element if requested
      if (focusFirstElement) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else if (containerRef.current) {
          containerRef.current.focus();
        }
      }

      // Add event listener for tab key
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // Return focus to the previously focused element
      const elementToFocus =
        returnFocusElement || previousActiveElement.current;
      if (elementToFocus) {
        elementToFocus.focus();
      }

      // Remove event listener
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isActive,
    handleKeyDown,
    getFocusableElements,
    returnFocusElement,
    focusFirstElement
  ]);

  return containerRef;
};

export default useFocusTrap;
