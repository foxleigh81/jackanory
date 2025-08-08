import {
  useState,
  useEffect,
  useCallback,
  RefObject,
  ComponentPropsWithoutRef,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';

import Button from '../../data-input/button';
import { useFocusTrap } from '@/libs/hooks/use-focus-trap';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends ComponentPropsWithoutRef<'section'> {
  /**
   * Is the modal open?
   * @default false
   */
  isOpen?: boolean;
  /**
   * Is the modal an alert?
   * @default false
   */
  isAlert?: boolean;
  /**
   * The onDismiss function to call when the modal is closed
   */
  onDismiss?: () => void;
  /**
   * Modal name for accessibility
   */
  modalName: string;
  /**
   * Optional modal description for accessibility
   */
  modalDescription?: string;
  /**
   * The optional size of the modal.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The optional element to return focus to.
   */
  returnFocusElementRef?: RefObject<HTMLElement | null>;
}

/**
 * The 'Modal' component displays content over the top of the app and blocks other actions.
 */
const Modal = ({
  isOpen,
  isAlert = false,
  onDismiss,
  className,
  modalName,
  modalDescription,
  size = 'md',
  returnFocusElementRef,
  children
}: Props) => {
  const [open, setOpen] = useState(false);

  const dialogRole = useMemo(
    () => (isAlert ? 'alertdialog' : 'dialog'),
    [isAlert]
  );
  const modalStyle = useMemo(
    () =>
      [styles['modal'], styles[`size-${size}`], className]
        .filter(Boolean)
        .join(' '),
    [size, className]
  );

  // Use focus trap hook for focus management
  const focusTrapRef = useFocusTrap({
    isActive: open,
    returnFocusElement: returnFocusElementRef?.current,
    focusFirstElement: false // We'll handle initial focus manually
  });

  const onDismissHandler = useCallback(() => {
    setOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
        case 'Esc':
          event.preventDefault();
          onDismissHandler();
          break;
        default:
          return;
      }
    },
    [onDismissHandler]
  );

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  // Handle initial focus when modal opens
  useEffect(() => {
    if (open && focusTrapRef.current) {
      const container = focusTrapRef.current;

      // Find the first focusable element that is not the close button
      const focusableElements = container.querySelectorAll<HTMLElement>(
        [
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          'video[controls]',
          'audio[controls]',
          '[contenteditable]:not([contenteditable="false"])',
          'button:not([disabled]):not([data-modal-close="true"])',
          '[href]',
          '[tabindex="0"]'
        ].join(',')
      );

      if (focusableElements.length > 0) {
        // Focus the first non-close-button element
        focusableElements[0].focus();
      } else {
        // If no other focusable elements, focus the container
        container.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll on cleanup
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Close modal if clicking on backdrop (outside content)
      if (e.target === e.currentTarget) {
        onDismissHandler();
      }
    },
    [onDismissHandler]
  );

  const ModalContent = (
    <div
      data-testid="modal"
      className={modalStyle}
      onClick={handleBackdropClick}
    >
      <div
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        className={styles['content']}
        role={dialogRole}
        aria-modal="true"
        aria-label={modalName}
        aria-describedby={modalDescription ? 'modal-description' : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {modalDescription && (
          <div id="modal-description" className={styles['sr-only']}>
            {modalDescription}
          </div>
        )}
        {children}
        <Button
          className={styles['close']}
          onClick={onDismissHandler}
          icon="close"
          circular
          small
          hideLabel
          label="Close"
          tabIndex={0}
          data-modal-close="true"
        />
      </div>
    </div>
  );

  return open ? createPortal(ModalContent, document.body) : null;
};

Modal.displayName = 'Modal';

export default Modal;
