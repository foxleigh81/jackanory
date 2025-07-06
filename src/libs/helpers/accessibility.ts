/**
 * Accessibility helper functions for better screen reader support
 */

/**
 * Generate a unique ID for accessibility purposes
 */
export function generateA11yId(prefix = 'a11y'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create aria-describedby string from multiple description IDs
 */
export function combineAriaDescribedBy(
  ...ids: (string | undefined)[]
): string | undefined {
  const validIds = ids.filter(Boolean);
  return validIds.length > 0 ? validIds.join(' ') : undefined;
}

/**
 * Generate appropriate ARIA label for form fields
 */
export function generateFormFieldAriaLabel(
  label: string,
  required = false,
  helperText?: string
): string {
  let ariaLabel = label;

  if (required) {
    ariaLabel += ', required';
  }

  if (helperText) {
    ariaLabel += `, ${helperText}`;
  }

  return ariaLabel;
}

/**
 * Generate screen reader announcement for dynamic content changes
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  // Add screen reader only styles
  Object.assign(announcement.style, {
    position: 'absolute',
    left: '-10000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  });

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

/**
 * Check if an element is visible to screen readers
 */
export function isVisibleToScreenReaders(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);

  return !(
    element.hasAttribute('aria-hidden') ||
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    element.hidden
  );
}

/**
 * Get the accessible name of an element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label first
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent || '';
  }

  // Check associated label
  if (
    element.tagName === 'INPUT' ||
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'SELECT'
  ) {
    const id = element.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent || '';
    }
  }

  // Fall back to text content
  return element.textContent || '';
}

/**
 * Validate ARIA attributes for common issues
 */
export function validateAriaAttributes(element: HTMLElement): string[] {
  const issues: string[] = [];

  // Check for aria-labelledby pointing to non-existent elements
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const ids = labelledBy.split(' ');
    ids.forEach((id) => {
      if (!document.getElementById(id)) {
        issues.push(`aria-labelledby references non-existent element: ${id}`);
      }
    });
  }

  // Check for aria-describedby pointing to non-existent elements
  const describedBy = element.getAttribute('aria-describedby');
  if (describedBy) {
    const ids = describedBy.split(' ');
    ids.forEach((id) => {
      if (!document.getElementById(id)) {
        issues.push(`aria-describedby references non-existent element: ${id}`);
      }
    });
  }

  // Check for interactive elements without accessible names
  const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
  if (interactiveTags.includes(element.tagName)) {
    const accessibleName = getAccessibleName(element);
    if (!accessibleName.trim()) {
      issues.push('Interactive element lacks accessible name');
    }
  }

  return issues;
}

/**
 * Create a description element for form fields
 */
export function createFieldDescription(
  id: string,
  description: string,
  type: 'help' | 'error' | 'warning' = 'help'
): HTMLElement {
  const element = document.createElement('div');
  element.id = id;
  element.className = `field-description field-description--${type}`;
  element.textContent = description;

  // Add appropriate ARIA attributes
  if (type === 'error') {
    element.setAttribute('role', 'alert');
    element.setAttribute('aria-live', 'assertive');
  } else {
    element.setAttribute('aria-live', 'polite');
  }

  return element;
}

/**
 * Enhanced heading hierarchy checker
 */
export function validateHeadingHierarchy(): string[] {
  const headings = Array.from(
    document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );
  const issues: string[] = [];
  let previousLevel = 0;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));

    if (index === 0 && level !== 1) {
      issues.push('Page should start with an h1 heading');
    }

    if (level > previousLevel + 1) {
      issues.push(
        `Heading level jumps from h${previousLevel} to h${level} (should be sequential)`
      );
    }

    previousLevel = level;
  });

  return issues;
}
